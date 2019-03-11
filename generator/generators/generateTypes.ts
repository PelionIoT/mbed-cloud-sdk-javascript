import { FileContainer } from "../containers/fileContainer/fileContainer";
import { snakeToPascal, getPropertyType, snakeToCamel, safeAddToList, ensureArray, isEmpty } from "../common/utilities";
import { EnumContainer } from "../containers/enumContainer/enumContainer";
import { PropertyContainer } from "../containers/propertyContainer/propertyContainer";
import { ImportContainer } from "../containers/importContainer/importContainer";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { ExportContainer } from "../containers/exportContainer/exportContainer";
import { File as GeneratedFile } from "../common/file";

export async function generateTypes(entity, enums, pascalKey: string, outputFolder: string, camelKey: string, entityIndex: FileContainer): Promise<FileContainer> {
    const typeContainer = new FileContainer();

    // any enums for this entity
    const entityEnums = ensureArray(entity.fields).filter(f => f.enum);
    for (const _enum of entityEnums) {
        const key = snakeToPascal(_enum.enum_reference) || snakeToPascal(_enum.api_fieldname);
        const enumContainer = new EnumContainer(key, _enum.enum);
        typeContainer.addContainer(enumContainer);
    }

    const imports = [];

    // add and update interfaces
    const methodsWithBodyParams = ensureArray(entity.methods).filter(m => ensureArray(m.fields).filter(f => f.in === "body"));
    for (const method of methodsWithBodyParams) {
        const methodName = snakeToPascal(method._key);
        const bodyParams = [];
        for (const field of method.fields) {
            if (field.in === "body") {
                const propType = getPropertyType(field, enums);
                const key = snakeToCamel(field._key);
                const isRequired = field.required || false;
                const propertyContainer = new PropertyContainer(key, propType, { isInterface: true, isReadonly: true, isOptional: !isRequired });
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

    // list options
    const paginatedMethods = ensureArray(entity.methods).filter(p => !!p.pagination);
    for (const method of paginatedMethods) {
        const filters = method.x_filter;
        const returns = snakeToPascal(method.return_info.type);
        const extraQueryParams = method.fields.filter(m => m.in === "query" && m._key !== "after" && m._key !== "include" && m._key !== "limit" && m._key !== "order");
        if (extraQueryParams.length > 0 || !isEmpty(filters)) {
            const listOptions = new ClassContainer(
                `${returns}ListOptions`,
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
            if (!isEmpty(filters)) {
                // creat top level filter interface
                const filterType = `${returns}Filter`;
                const filterObj = new ClassContainer(
                    filterType,
                    {
                        isInterface: true,
                    }
                );
                Object.keys(filters).forEach(filterName => {
                    // get the corresponding field
                    const field = ensureArray(entity.fields).filter(p => p._key === filterName).pop();
                    let filterObjType = field ? getPropertyType(field, enums) : "string";
                    const filterComparisonType = snakeToCamel(`${returns}_${filterName}_filter`);
                    const filterComparisonObject = new ClassContainer(
                        filterComparisonType,
                        {
                            isInterface: true,
                        }
                    );
                    filters[filterName].forEach(filterOperator => {
                        if (filterOperator === "in") {
                            filterObjType = `Array<${filterObjType}>`;
                        }
                        filterComparisonObject.addProperty(
                            new PropertyContainer(
                                filterOperator,
                                filterObjType,
                                {
                                    isInterface: true,
                                    isOptional: true,
                                }
                            )
                        );
                    });
                    typeContainer.addContainer(filterComparisonObject);
                    filterObj.addProperty(
                        new PropertyContainer(
                            filterName,
                            filterComparisonType,
                            {
                                isInterface: true,
                                isOptional: true,
                            }
                        )
                    );
                });
                typeContainer.addContainer(filterObj);
                listOptions.addProperty(
                    new PropertyContainer(
                        "filter",
                        filterType,
                        {
                            isInterface: true,
                            isOptional: true,
                        }
                    )
                );
            }
            typeContainer.addContainer(listOptions);
            safeAddToList(imports,
                new ImportContainer(
                    "LIST_OPTIONS",
                    "../../../legacy/common/interfaces",
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

        return typeContainer;
    }
}
