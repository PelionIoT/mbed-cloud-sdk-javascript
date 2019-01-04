import { ImportContainer } from "../containers/importContainer/importContainer";
import { MethodContainer } from "../containers/methodContainer/methodContainer";
import { snakeToCamel, snakeToPascal, getType, getAdditionalProperties, typeMap } from "../common/utilities";
import { ParameterListContainer } from "../containers/parameterListContainer/parameterListContainer";
import { ParameterContainer } from "../containers/parameterContainer/parameterContainer";
import { ParameterBucketContainer } from "../containers/parameterBucketContainer/parameterBucketContainer";
import { MethodBodyContainer } from "../containers/methodBodyContainers/methodBodyContainer";
import { PaginatedMethodBody } from "../containers/methodBodyContainers/methods/paginatedMethodBody";
import { DefaultMethodBody } from "../containers/methodBodyContainers/methods/defaultMethodBody";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { File as GeneratedFile } from "../common/file";
import { MethodBodyParameterContainer } from "../containers/methodBodyContainers/methods/parameters/methodBodyParameterContainer";

export async function generateRepository(entity, pascalKey, currentGroup, camelKey, outputFolder) {
    if (entity.methods.length > 0) {
        // entity has methods
        let fsNeeded = false;
        // let hasPaginator = false;
        const repositoryImports = new Array<ImportContainer>();
        const repositoryMethods = new Array<MethodContainer>();
        for (const method of entity.methods) {
            let hasBucket = false;
            const methodName = snakeToCamel(method._key);
            const httpMethod = method.method ? method.method.toUpperCase() : "GET";
            const path = method.path;
            const paginated = !!method.pagination;
            const privateMethod = !!method.private_method;
            // const customMethodCall = !!method.custom_method;
            // const customMethodName = method.custom_method;
            // if a foreign key exists and its not the same as the enity
            const foreignKey = method.foreign_key ? (snakeToPascal(method.foreign_key.entity) !== pascalKey) : false;
            if (foreignKey) {
                // add import for foreign key
                repositoryImports.push(new ImportContainer(`../../${snakeToCamel(method.foreign_key.group) || currentGroup}/${snakeToCamel(method.foreign_key.entity)}`,
                    [
                        snakeToPascal(method.foreign_key.entity)
                    ]
                ));
                // if (paginated) {
                //     repositoryImports.push(new ImportContainer(`../../${snakeToCamel(method.foreign_key.group) || currentGroup}/${snakeToCamel(method.foreign_key.entity)}/${snakeToCamel(method.foreign_key.entity)}Adapter`,
                //         [
                //             `${snakeToPascal(method.foreign_key.entity)}Adapter`
                //         ]
                //     ));
                // }
            } else {
                // if (paginated) {
                //     repositoryImports.push(new ImportContainer(`./${camelKey}Adapter`,
                //         [
                //             `${pascalKey}Adapter`
                //         ]
                //     ));
                // }
            }
            const returnType = foreignKey ? snakeToPascal(method.foreign_key.entity) : method.return_type;
            const returns = httpMethod === "DELETE" ? "void" : getType(returnType) || pascalKey;

            const parameterList = new ParameterListContainer();

            // request param
            if (method.fields.filter(m => m.in === "body").length >= 1) {
                parameterList.addParameters(new ParameterContainer(
                    "request",
                    `${pascalKey}${snakeToPascal(method._key)}Request`
                ));
                repositoryImports.push(new ImportContainer(
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
                // if (paginated && (field._key === "after" || field._key === "limit" || field._key === "include" || field._key === "order")) {
                //     console.log("skip default pagination params");
                //     continue;
                // }
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
                        hasBucket && !!!field.required ? "options" : ""
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
                // hasPaginator = true;
                methodBody = new PaginatedMethodBody(returns, path);
            } else {
                methodBody = new DefaultMethodBody(httpMethod, path, returns, {
                    parameters: {
                        queryParams,
                        pathParams,
                        fileParams,
                        bodyParams
                    },
                    hasBucket
                });
            }

            if (!paginated) {
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
        }

        // generate repositories
        const repositoryClass = new ClassContainer(
            `${pascalKey}Repository`,
            {
                description: `${pascalKey} repository`,
                extendsClass: "Repository",
                imports: [
                    new ImportContainer("../../../common/repository", [
                        "Repository"
                    ]),
                    new ImportContainer("../../../../common/functions", [
                        "apiWrapper"
                    ]),
                    new ImportContainer(`./${camelKey}`, [
                        pascalKey
                    ])
                ],
                methods: repositoryMethods
            }
        );
        repositoryClass.addImport(repositoryImports);
        if (fsNeeded) {
            repositoryClass.addImport(new ImportContainer("fs", [
                "ReadStream"
            ]));
        }
        // if (hasPaginator) {
        //     repositoryClass.addImport(new ImportContainer("../../../../common/pagination", [
        //         "Paginator"
        //     ]));
        //     repositoryClass.addImport(new ImportContainer("../../../../common/listResponse", [
        //         "ListResponse"
        //     ]));
        //     repositoryClass.addImport(new ImportContainer("../../../../common/interfaces", [
        //         "ListOptions",
        //         "OrderEnum"
        //     ]));
        // }

        const repositoryFile = new GeneratedFile(
            `${camelKey}Repository`,
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            await repositoryClass.render()
        );
        repositoryFile.writeFile();
    }
}
