import { FileContainer } from "../containers/fileContainer/fileContainer";
import { snakeToPascal, getPropertyType, snakeToCamel, safeAddToList } from "../common/utilities";
import { EnumContainer } from "../containers/enumContainer/enumContainer";
import { PropertyContainer } from "../containers/propertyContainer/propertyContainer";
import { ImportContainer } from "../containers/importContainer/importContainer";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { ExportContainer } from "../containers/exportContainer/exportContainer";
import { File as GeneratedFile } from "../common/file";

export async function generateTypes(entity, enums, pascalKey: string, outputFolder: string, camelKey: string, entityIndex: FileContainer) {
    const typeContainer = new FileContainer();

    const entityEnums = entity.fields.filter(f => f.enum);
    for (const _enum of entityEnums) {
        const key = snakeToPascal(_enum.enum_reference) || snakeToPascal(_enum.api_fieldname);
        const enumContainer = new EnumContainer(key, _enum.enum);
        typeContainer.addContainer(enumContainer);
    }

    const imports = [];
    const methodsWithBodyParams = entity.methods.filter(m => m.fields.filter(f => f.in === "body"));
    for (const method of methodsWithBodyParams) {
        const methodName = snakeToPascal(method._key);
        const bodyParams = [];
        for (const field of method.fields) {
            if (field.in === "body") {
                const propType = getPropertyType(field, enums);
                const key = snakeToCamel(field._key);
                // const isRequired = field.required || false;
                const propertyContainer = new PropertyContainer(key, propType, { isInterface: true, isReadonly: true, isOptional: true });
                bodyParams.push(propertyContainer);

                if ((field.items && field.items.foreign_key)) {
                    const k = snakeToCamel(field.items.foreign_key.entity);
                    const importContainer = new ImportContainer(
                        `${k.toUpperCase()}_FOREIGN_KEY_IMPORT`,
                        `../${k}/${k}`,
                        [
                            snakeToPascal(field.items.foreign_key.entity)
                        ]
                    );
                    safeAddToList(imports, importContainer);
                }

                if (field.foreign_key) {
                    const k = snakeToCamel(field.foreign_key.entity);
                    const importContainer = new ImportContainer(
                        `${k.toUpperCase()}_FOREIGN_KEY_IMPORT`,
                        `../${k}/${k}`,
                        [
                            snakeToPascal(field.foreign_key.entity)
                        ]);
                    safeAddToList(imports, importContainer);
                }
            }
        }

        if (bodyParams.length > 0) {
            const methodInterface = new ClassContainer(`${pascalKey}${methodName}Request`, { isInterface: true });
            methodInterface.addProperty(bodyParams);
            typeContainer.addContainer(methodInterface);
        }
    }

    const paginatedMethods = entity.methods.filter(p => !!p.pagination);
    for (const method of paginatedMethods) {
        const extraQueryParams = method.fields.filter(m => m.in === "query" && m._key !== "after" && m._key !== "include" && m._key !== "limit" && m._key !== "order");
        if (extraQueryParams.length > 0) {
            const listOptions = new ClassContainer(
                `${pascalKey}ListOptions`,
                {
                    isInterface: true,
                    extendsClass: [
                        "ListOptions"
                    ]
                });
            extraQueryParams.forEach(q => {
                listOptions.addProperty(
                    new PropertyContainer(
                        snakeToCamel(q._key),
                        getPropertyType(q, enums),
                        {
                            isInterface: true,
                            isOptional: true,
                        }
                    )
                );
            });
            typeContainer.addContainer(listOptions);
            imports.push(
                new ImportContainer(
                    "LIST_OPTIONS",
                    "../../../../common/interfaces",
                    [
                        "ListOptions"
                    ]
                )
            );
        }
    }

    if (typeContainer.containers.length > 0) {
        imports.forEach(i => typeContainer.containers.unshift(i));
        const typeFile = new GeneratedFile(
            "types",
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            await typeContainer.render()
        );
        typeFile.writeFile();
        const typeExport = new ExportContainer("./types");
        entityIndex.addContainer(typeExport);
    }
}
