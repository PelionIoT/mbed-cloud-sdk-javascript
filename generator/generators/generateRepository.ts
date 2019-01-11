import { ImportContainer } from "../containers/importContainer/importContainer";
import { MethodContainer } from "../containers/methodContainer/methodContainer";
import { snakeToCamel, snakeToPascal, getType, getAdditionalProperties, typeMap, safeAddToList } from "../common/utilities";
import { ParameterListContainer } from "../containers/parameterListContainer/parameterListContainer";
import { ParameterContainer } from "../containers/parameterContainer/parameterContainer";
import { ParameterBucketContainer } from "../containers/parameterBucketContainer/parameterBucketContainer";
import { MethodBodyContainer } from "../containers/methodBodyContainers/methodBodyContainer";
import { PaginatedMethodBody } from "../containers/methodBodyContainers/methods/paginatedMethodBody";
import { DefaultMethodBody } from "../containers/methodBodyContainers/methods/defaultMethodBody";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { File as GeneratedFile } from "../common/file";
import { MethodBodyParameterContainer } from "../containers/methodBodyContainers/methods/parameters/methodBodyParameterContainer";
import { ExportContainer } from "../containers/exportContainer/exportContainer";
import { FileContainer } from "../containers/fileContainer/fileContainer";
import { CustomMethodBody } from "../containers/methodBodyContainers/methods/customMethodBody";

export async function generateRepository(entity, pascalKey, _currentGroup, camelKey, outputFolder, entityIndex: FileContainer) {
    if (entity.methods.length > 0) {
        // entity has methods
        let fsNeeded = false;
        let hasPaginator = false;
        const repositoryImports = new Array<ImportContainer>();
        const repositoryMethods = new Array<MethodContainer>();
        for (const method of entity.methods) {
            let hasBucket = false;
            const methodName = snakeToCamel(method._key);
            const httpMethod = method.method ? method.method.toUpperCase() : "GET";
            const path = method.path;
            const paginated = !!method.pagination;
            const privateMethod = !!method.private_method;
            const customMethodCall = !!method.custom_method;
            // if method doesn't return self or a primitive type
            const foreignKey = method.return_info.self === false && getType(method.return_info.type) === undefined;
            if (foreignKey) {
                // add import for foreign key
                safeAddToList(repositoryImports, new ImportContainer(
                    `${method.return_info.type} _FOREIGN_KEY_IMPORT`,
                    `../../index`,
                    [
                        snakeToPascal(method.return_info.type)
                    ]
                ));
                if (paginated) {
                    safeAddToList(repositoryImports, new ImportContainer(
                        `${method.return_info.type}_ADAPTER`,
                        `../../index`,
                        [
                            `${snakeToPascal(method.return_info.type)}Adapter`
                        ]
                    ));
                }
            }
            const returnType = method.return_info.type;
            const returns: string = httpMethod === "DELETE" ? "void" : getType(returnType) || snakeToPascal(returnType);

            if (returns.indexOf("ReadStream") === -1 && returns !== "void" && !paginated) {
                safeAddToList(repositoryImports, new ImportContainer(
                    `${method.return_info.type}_ADAPTER`,
                    `../../index`,
                    [
                        `${snakeToPascal(returns)}Adapter`
                    ]
                ));
            }

            // default list options is ListOptions. Different if paginated and has more query params
            let listOptionsType = "ListOptions";
            const parameterList = new ParameterListContainer();

            let hasRequest = false;
            // request param
            if (method.fields.filter(m => m.in === "body").length >= 1) {
                hasRequest = true;
                parameterList.addParameters(new ParameterContainer(
                    "request",
                    `${pascalKey}${snakeToPascal(method._key)}Request`
                ));
                repositoryImports.push(new ImportContainer(
                    `${pascalKey.toUpperCase()}_${method._key.toUpperCase()}_REQUEST`,
                    "./types",
                    [
                        `${pascalKey}${snakeToPascal(method._key)}Request`
                    ]
                ));
            }

            // external params
            let externalParams = new Array<ParameterContainer>();
            const ep = method.fields.filter(m => m.in && m.in !== "body");
            for (const field of ep) {
                if (paginated && field.in === "query") {
                    continue;
                }
                const fieldType = field._key === "order" ? "OrderEnum" : getAdditionalProperties(field) || getType(field.type, field.items);
                if (fieldType === typeMap.file) {
                    // import fs
                    fsNeeded = true;
                }
                const parameter = new ParameterContainer(
                    snakeToCamel(field._key),
                    fieldType,
                    {
                        isRequired: field.required,
                        defaultValue: field.default
                    }
                );
                externalParams.push(parameter);
            }

            if (externalParams.filter(e => e.isRequired === false).length > 1) {
                const bucket = new ParameterBucketContainer("options", externalParams.filter(e => e.isRequired === false));
                parameterList.bucket = bucket;
                externalParams = externalParams.filter(e => e.isRequired !== false);
                hasBucket = true;
            }

            parameterList.addParameters(externalParams);

            if (paginated) {
                const extraQueryParams = ep.filter(m => m.in === "query" && m._key !== "after" && m._key !== "include" && m._key !== "limit" && m._key !== "order");
                if (extraQueryParams.length > 0) {
                    listOptionsType = `${returns}ListOptions`;
                    parameterList.addParameters(
                        new ParameterContainer(
                            "options",
                            `${returns}ListOptions`,
                            {
                                isRequired: false
                            }
                        )
                    );
                    repositoryImports.push(
                        new ImportContainer(
                            `${returns.toUpperCase()}_LIST_OPTIONS`,
                            "./types",
                            [
                                `${returns}ListOptions`
                            ]
                        )
                    );
                } else {
                    parameterList.addParameters(
                        new ParameterContainer(
                            "options",
                            "ListOptions",
                            {
                                isRequired: false
                            }
                        )
                    );
                }
            }

            const queryParams = [];
            const pathParams = [];
            const fileParams = [];
            const bodyParams = [];
            // internal params
            const ip = method.fields.filter(m => m.in !== undefined);
            for (const field of ip) {
                if (field.in === "query") {
                    const queryParam = new MethodBodyParameterContainer(
                        snakeToCamel(field.entity_fieldname),
                        field.api_fieldname,
                        paginated ? "pageOptions" : hasBucket && !!!field.required ? "options" : ""
                    );
                    queryParams.push(queryParam);
                }

                if (field.in === "path") {
                    const pathParam = new MethodBodyParameterContainer(
                        snakeToCamel(field.entity_fieldname),
                        field.parameter_fieldname || field.api_fieldname,
                        hasBucket && !!!field.required ? "options" : ""
                    );
                    pathParams.push(pathParam);
                }

                if (field.in === "stream") {
                    const fileParam = new MethodBodyParameterContainer(
                        snakeToCamel(field.entity_fieldname),
                        field.api_fieldname,
                        hasBucket && !!!field.required ? "options" : ""
                    );
                    fileParams.push(fileParam);
                }

                if (field.in === "body") {
                    const bodyParam = new MethodBodyParameterContainer(
                        snakeToCamel(field.entity_fieldname),
                        field.api_fieldname,
                        "request"
                    );
                    bodyParams.push(bodyParam);
                }
            }

            let methodBody: MethodBodyContainer;
            if (paginated) {
                hasPaginator = true;
                methodBody = new PaginatedMethodBody(returns, path, {
                    parameters: {
                        queryParams,
                        pathParams,
                        fileParams,
                        bodyParams
                    },
                    adapter: returns,
                    listOptionsType
                });
            } else if (customMethodCall) {
                if (parameterList.parameters.length === 0 && !parameterList.bucket) {
                    parameterList.addParameters(
                        new ParameterContainer("model", pascalKey)
                    );
                }
                const allParams = [
                    new ParameterContainer("model", pascalKey)
                ].concat(queryParams)
                    .concat(pathParams)
                    .concat(fileParams)
                    .concat(bodyParams)
                    .map(m => m.name);
                methodBody = new CustomMethodBody(
                    snakeToCamel(method.custom_method),
                    allParams
                );
                repositoryImports.push(new ImportContainer(
                    `${method.custom_method.toUpperCase()}_CUSTOM_METHOD_IMPORT`,
                    "../../../common/privateFunctions",
                    [
                        snakeToCamel(method.custom_method)
                    ]
                ));
            } else {
                methodBody = new DefaultMethodBody(httpMethod, path, returns, {
                    parameters: {
                        queryParams,
                        pathParams,
                        fileParams,
                        bodyParams
                    },
                    hasRequest,
                    hasBucket,
                    adapter: returns !== "void" && returns.indexOf("File") === -1 ? `${returns}Adapter` : ""
                });
            }

            const methodContainer = new MethodContainer(
                methodName,
                {
                    returns: paginated ? `Paginator<${returns}, ListOptions>` : returns,
                    promise: !paginated,
                    parameterList: parameterList,
                    modifier: privateMethod ? "private" : "public",
                    methodBody: methodBody
                }
            );
            repositoryMethods.push(methodContainer);
        }

        // generate repositories
        const repositoryClass = new ClassContainer(
            `${pascalKey}Repository`,
            {
                description: `${pascalKey} repository`,
                extendsClass: "Repository",
                imports: [
                    new ImportContainer(
                        `REPOSITORY`,
                        "../../../common/repository",
                        [
                            "Repository"
                        ]
                    ),
                    new ImportContainer(
                        "API_WRAPPER",
                        "../../../../common/functions",
                        [
                            "apiWrapper"
                        ]
                    ),
                    new ImportContainer(
                        `${camelKey.toUpperCase()}_CLASS`,
                        `./${camelKey}`,
                        [
                            pascalKey
                        ]
                    )
                ],
                methods: repositoryMethods
            }
        );
        repositoryClass.addImport(repositoryImports);
        if (fsNeeded) {
            repositoryClass.addImport(new ImportContainer(
                "FS",
                "fs",
                [
                    "ReadStream"
                ]
            ));
        }
        if (hasPaginator) {
            repositoryClass.addImport(new ImportContainer(
                `PAGINATOR`,
                "../../../../common/pagination",
                [
                    "Paginator"
                ]
            ));
            repositoryClass.addImport(new ImportContainer(
                `LIST_RESPONSE`,
                "../../../../common/listResponse",
                [
                    "ListResponse"
                ]
            ));
            repositoryClass.addImport(new ImportContainer(
                `LIST_OPTIONS`,
                "../../../../common/interfaces",
                [
                    "ListOptions"
                ]
            ));
        }

        const repositoryFile = new GeneratedFile(
            `${camelKey}Repository`,
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            await repositoryClass.render()
        );
        repositoryFile.writeFile();

        const typeExport = new ExportContainer(`./${camelKey}Repository`);
        entityIndex.addContainer(typeExport);
    }
}
