/* tslint:disable: no-console */
import { PropertyContainer } from "../containers/propertyContainer/propertyContainer";
import { snakeToCamel, snakeToPascal, getPropertyType } from "../common/utilities";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { ImportContainer } from "../containers/importContainer/importContainer";

export async function generateInterface(entity: any, enums: any): Promise<string> {
    const imports = new Array<ImportContainer>();
    const enumImports = new Array<string>();
    const properties = new Array<PropertyContainer>();

    for (const f of entity.fields.filter(i => i._key !== "id")) {
        const type = getPropertyType(f, enums);
        const name = snakeToCamel(f._key);

        const readOnly = !!f.readOnly;
        const required = !!f.required;
        const property = new PropertyContainer(name, type, { isInterface: true, isOptional: !required, isReadonly: readOnly });
        properties.push(property);

        if (f.enum_reference) {
            enumImports.push(snakeToPascal(f.enum_reference));
        }

        if ((f.items && f.items.foreign_key)) {
            const key = snakeToCamel(f.items.foreign_key.entity);
            const importContainer = new ImportContainer(`${key}_FOREIGN_KEY_IMPORT`, `../${key}/${key}`, [ snakeToPascal(f.items.foreign_key.entity) ]);
            imports.push(importContainer);
        }

        if (f.foreign_key) {
            const key = snakeToCamel(f.foreign_key.entity);
            const importContainer = new ImportContainer(`${key}_FOREIGN_KEY_IMPORT`, `../${key}/${key}`, [ snakeToPascal(f.foreign_key.entity) ]);
            imports.push(importContainer);
        }
    }

    if (enumImports.length > 0) {
        const enumImport = new ImportContainer("ENUM_IMPORT", "./types", enumImports);
        imports.push(enumImport);
    }

    const interfaceContainer = new ClassContainer(snakeToPascal(entity._key), {
        isInterface: true,
        extendsClass: [ "Entity" ],
        imports: [
            new ImportContainer("ENTITY_BASE", "../../../common/entity", [ "Entity" ])
        ]
    });
    interfaceContainer.addProperty(properties);
    interfaceContainer.addImport(imports);
    return await interfaceContainer.render();
}
