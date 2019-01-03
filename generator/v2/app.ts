/* tslint:disable: no-console */
import * as fs from "fs-extra";
import { File as GeneratedFile } from "./common/file";
import { generateInterface } from "./generators/generateInterface";
import { snakeToCamel, snakeToPascal, getPropertyType, getType, getAdditionalProperties, typeMap } from "./common/utilities";
import { FileContainer } from "./containers/fileContainer/fileContainer";
import { ExportContainer } from "./containers/exportContainer/exportContainer";
import { EnumContainer } from "./containers/enumContainer/enumContainer";
import { PropertyContainer } from "./containers/propertyContainer/propertyContainer";
import { ClassContainer } from "./containers/classContainer/classContainer";
import { ImportContainer } from "./containers/importContainer/importContainer";
import { MethodContainer } from "./containers/methodContainer/methodContainer";
import { ParameterListContainer } from "./containers/parameterListContainer/parameterListContainer";
import { ParameterContainer } from "./containers/parameterContainer/parameterContainer";
import { AdapterMethodBody } from "./containers/methodBodyContainers/adapter/adapterMethodBody";
import { AdapterFieldContainer } from "./containers/methodBodyContainers/adapter/adapterFieldContainer";
import { ParameterBucketContainer } from "./containers/parameterBucketContainer/parameterBucketContainer";
import { DefaultMethodBody } from "./containers/methodBodyContainers/methods/defaultMethodBody";
import { MethodBodyContainer } from "./containers/methodBodyContainers/methodBodyContainer";
import { PaginatedMethodBody } from "./containers/methodBodyContainers/methods/paginatedMethodBody";

async function main() {
    const outputFolder = "./src/sdk/generatedV2";
    const configPath = "/Users/alelog01/git/mbed-cloud-api-contract/scripts/sdk_generators/generated_files/sdk_gen_intermediate.json";

    const generatedConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const enums = generatedConfig.enums;
    const entities = generatedConfig.entities;

    // clear generated folder
    fs.emptyDirSync(outputFolder);

    const entityExports: Array<ExportContainer> = [];

    for (const entity of entities) {
        const currentGroup = snakeToPascal(entity.group_id);
        const camelKey = snakeToCamel(entity._key);
        const pascalKey = snakeToPascal(entity._key);

        // generate interface
        const entityInterface = await generateInterface(entity, enums);
        const interfaceFile = new GeneratedFile(
            camelKey,
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            entityInterface
        );
        interfaceFile.writeFile();

        // generate index file
        const entityIndex = new FileContainer(
            [
                new ExportContainer(`./${camelKey}`)
            ]
        );

        entityExports.push(new ExportContainer(`./${snakeToCamel(entity.group_id)}/${camelKey}`));

        // generate types
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
                    const isRequired = field.required || false;
                    const propertyContainer = new PropertyContainer(key, propType, { isInterface: true, isOptional: !isRequired, isReadonly: true });
                    bodyParams.push(propertyContainer);

                    if ((field.items && field.items.foreign_key)) {
                        const k = snakeToCamel(field.items.foreign_key.entity);
                        const importContainer = new ImportContainer(`../${k}/${k}`, [ snakeToPascal(field.items.foreign_key.entity) ]);
                        imports.push(importContainer);
                    }

                    if (field.foreign_key) {
                        const k = snakeToCamel(field.foreign_key.entity);
                        const importContainer = new ImportContainer(`../${k}/${k}`, [ snakeToPascal(field.foreign_key.entity) ]);
                        imports.push(importContainer);
                    }
                }
            }

            if (bodyParams.length > 0) {
                const methodInterface = new ClassContainer(`${pascalKey}${methodName}Request`, { isInterface: true });
                methodInterface.addProperty(bodyParams);
                typeContainer.addContainer(methodInterface);
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

        const indexFile = new GeneratedFile(
            "index",
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            await entityIndex.render()
        );
        indexFile.writeFile();

        // generate adapters
        const adapterFields = new Array<AdapterFieldContainer>();

        for (const field of entity.fields) {
            if (field.items && field.items.foreign_key) {
                console.log(`${field._key} should map foreign key array`);
            }
            if (field.foreign_key) {
                console.log(`${field._key} should map foreign key`);
            }
            if (field.format === "date-time") {
                // console.log(`${field._key} should map date`);
            }
            const adapterField = new AdapterFieldContainer(
                snakeToCamel(field._key),
                field.api_fieldname
            );
            adapterFields.push(adapterField);
        }

        const fromApiMethod = new MethodContainer("fromApi", {
            returns: pascalKey,
            isStatic: true,
            parameterList: new ParameterListContainer({
                parameters: [
                    new ParameterContainer("data", "any"),
                    new ParameterContainer("instance", pascalKey, { isRequired: false })
                ]
            }),
            methodBody: new AdapterMethodBody(pascalKey, `${pascalKey}Adapter`, adapterFields)
        });

        const adapterClass = new ClassContainer(
            `${pascalKey}Adapter`,
            {
                description: `${pascalKey} adapter`,
                extendsClass: "Adapter",
                imports: [
                    new ImportContainer("../../../common/adapter", [
                        "Adapter"
                    ]),
                    new ImportContainer(`./${camelKey}`, [
                        pascalKey
                    ])
                ],
                methods: [
                    fromApiMethod
                ]
            }
        );

        const adapterFile = new GeneratedFile(
            `${camelKey}Adapter`,
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            await adapterClass.render()
        );
        adapterFile.writeFile();

        if (entity.methods.length > 0) {
            // entity has methods
            let fsNeeded = false;
            let hasPaginator = false;
            const repositoryImports = new Array<ImportContainer>();
            const repositoryMethods = new Array<MethodContainer>();
            for (const method of entity.methods) {

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
                    if (paginated) {
                        repositoryImports.push(new ImportContainer(`../../${snakeToCamel(method.foreign_key.group) || currentGroup}/${snakeToCamel(method.foreign_key.entity)}/${snakeToCamel(method.foreign_key.entity)}Adapter`,
                            [
                                `${snakeToPascal(method.foreign_key.entity)}Adapter`
                            ]
                        ));
                    }
                } else {
                    if (paginated) {
                        repositoryImports.push(new ImportContainer(`./${camelKey}Adapter`,
                            [
                                `${pascalKey}Adapter`
                            ]
                        ));
                    }
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
                const ep = method.fields.filter(m => m.in !== "body");
                for (const field of ep) {
                    // if (paginated && (field._key === "after" || field._key === "limit" || field._key === "include" || field._key === "order")) {
                    //     console.log("skip default pagination params");
                    //     continue;
                    // }
                    const fieldType  = field._key === "order" ? "OrderEnum" : getAdditionalProperties(field) || getType(field.type, field.items);
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
                }

                parameterList.addParameters(externalParams);

                let methodBody: MethodBodyContainer;
                if (paginated) {
                    hasPaginator = true;
                    methodBody = new PaginatedMethodBody(returns, path);
                } else {
                    methodBody = new DefaultMethodBody(httpMethod, path);
                }

                const methodContainer = new MethodContainer(
                    methodName,
                    {
                        returns: paginated ? `Paginator<${pascalKey}, ListOptions>` : returns,
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
                        new ImportContainer("../../../common/repository", [ "Repository" ]),
                        new ImportContainer("../../../../common/functions", [ "apiWrapper" ]),
                        new ImportContainer(`./${camelKey}`, [ pascalKey ])
                    ],
                    methods: repositoryMethods
                }
            );
            repositoryClass.addImport(repositoryImports);
            if (fsNeeded) {
                repositoryClass.addImport(new ImportContainer("fs", [ "ReadStream" ]));
            }
            if (hasPaginator) {
                repositoryClass.addImport(new ImportContainer("../../../../common/pagination", [ "Paginator" ]));
                repositoryClass.addImport(new ImportContainer("../../../../common/listResponse", [ "ListResponse" ]));
                repositoryClass.addImport(new ImportContainer("../../../../common/interfaces", [ "ListOptions", "OrderEnum" ]));
            }

            const repositoryFile = new GeneratedFile(
                `${camelKey}Repository`,
                `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
                await repositoryClass.render()
            );
            repositoryFile.writeFile();
        }
    }

    // main export file
    const generatedIndex = new FileContainer(entityExports);
    const generatedIndexFile = new GeneratedFile(
        "index",
        `${outputFolder}`,
        await generatedIndex.render()
    );
    generatedIndexFile.writeFile();
}

main();
