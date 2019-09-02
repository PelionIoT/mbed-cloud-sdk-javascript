import { FileContainer } from "../containers/fileContainer/fileContainer";
import { snakeToPascal, getPropertyType, snakeToCamel, safeAddToList, isEmptyFilter, getTypeReferencePrefix } from "../common/utilities";
import { EnumContainer } from "../containers/enumContainer/enumContainer";
import { PropertyContainer } from "../containers/propertyContainer/propertyContainer";
import { ImportContainer } from "../containers/importContainer/importContainer";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { ExportContainer } from "../containers/exportContainer/exportContainer";
import { File as GeneratedFile } from "../common/file";
import { getDescription } from "./generateInterface";

export async function generateTypes(entity, enums, pascalKey: string, outputFolder: string, camelKey: string, entityIndex: FileContainer): Promise<FileContainer> {
    const typeContainer = new FileContainer();

    // get any enums nested inside a method
    const methodEnums = [];
    entity.methods.forEach(method => {
        const enumFields = method.fields.filter(f => f.enum);
        if (enumFields && enumFields.length) {
            enumFields.forEach(e => methodEnums.push(e));
        }
    });

    // any enums for this entity
    const entityEnums: Array<any> = entity.fields.filter(f => f.enum);
    // merge two lists of enums and remove duplicates
    methodEnums.forEach(e => {
        if (!entityEnums.some(f => e.enum_reference === f.enum_reference) && e._key !== "order" && e._key !== "include") {
            entityEnums.push(e);
        }
    });

    for (const _enum of entityEnums) {
        const key = (snakeToPascal(_enum.enum_reference) || snakeToPascal(_enum.api_fieldname)).replace("Enum", "");
        const enumContainer = new EnumContainer(key, _enum.enum);
        typeContainer.addContainer(enumContainer);
    }

    const imports = [];

    // add and update interfaces
    const methodsWithBodyParams = entity.methods.filter(m => m.fields.filter(f => f.in === "body"));
    for (const method of methodsWithBodyParams) {
        const methodName = snakeToPascal(method._key);
        const bodyParams = [];
        for (const field of method.fields) {
            if (field.in === "body") {
                const propType = getPropertyType(field, enums);
                const key = snakeToCamel(field.name || field._key);
                const isRequired = field.required || false;
                const description = getDescription(field, key);
                const propertyContainer = new PropertyContainer(key, propType, { isInterface: true, isReadonly: true, isOptional: !isRequired, description });
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
    const paginatedMethods = entity.methods.filter(p => !!p.pagination);
    for (const method of paginatedMethods) {
        const filters = method.x_filter;
        const returns = snakeToPascal(method.return_info.type);
        const extraQueryParams = method.fields.filter(m => m.in === "query" && m._key !== "after" && m._key !== "include" && m._key !== "limit" && m._key !== "order");
        if (extraQueryParams.length > 0 || !isEmptyFilter(filters)) {
            const listOptions = new ClassContainer(
                snakeToCamel(`${getTypeReferencePrefix(pascalKey, returns)}_list_options`),
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
                            description: getDescription(q, snakeToCamel(q._key)),
                        }
                    )
                );
            });
            if (!isEmptyFilter(filters)) {
                // creat top level filter interface
                const filterType = snakeToCamel(`${getTypeReferencePrefix(pascalKey, returns)}_filter`);
                const filterObj = new ClassContainer(
                    filterType,
                    {
                        isInterface: true,
                    }
                );
                Object.keys(filters).forEach(filterName => {
                    // get the corresponding field
                    const field = entity.fields.filter(p => p._key === filterName).pop();
                    let filterObjType = field ? getPropertyType(field, enums) : "string";
                    let hasEqualsFilter = false;
                    let equalsFilterType = "string";
                    const filterComparisonType = snakeToCamel(`${getTypeReferencePrefix(pascalKey, returns)}_${filterName}_filter`);
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
                        if (filterOperator === "eq") {
                            hasEqualsFilter = true;
                            equalsFilterType = filterObjType;
                        }
                        filterComparisonObject.addProperty(
                            new PropertyContainer(
                                filterOperator,
                                filterObjType,
                                {
                                    isInterface: true,
                                    isOptional: true,
                                    description: `${snakeToCamel(filterName)} ${getReadableFilterOperator(filterOperator)}`,
                                }
                            )
                        );
                    });
                    typeContainer.addContainer(filterComparisonObject);
                    filterObj.addProperty(
                        new PropertyContainer(
                            snakeToCamel(filterName),
                            hasEqualsFilter ? `${equalsFilterType} | ${filterComparisonType}` : filterComparisonType,
                            {
                                isInterface: true,
                                isOptional: true,
                                description: `Filter by ${snakeToCamel(filterName)} on ${returns}`
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
                            description: `Filter for ${returns}`
                        },
                    )
                );
            }
            typeContainer.addContainer(listOptions);
            safeAddToList(imports,
                new ImportContainer(
                    "LIST_OPTIONS",
                    "../../../common",
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

const getReadableFilterOperator = (filterOperator: string) => {
    switch (filterOperator) {
        case "eq":
            return "equal to";
        case "neq":
            return "not equal to";
        case "gte":
            return "greater than";
        case "lte":
            return "less than";
        case "in":
            return "in";
        case "nin":
            return "not in";
        case "like":
            return "like";
        default:
            return "equal to";
    }
};
