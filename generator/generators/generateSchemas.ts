import { SchemaContainer } from "../containers/schemaContainer/schemaContainer";
import { File as GeneratedFile } from "../common/file";
import { snakeToCamel, snakeToPascal } from "../common/utilities";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { Field, Method, Parameter } from "../../src/sdk/schema/types";
import { FileContainer } from "../containers/fileContainer/fileContainer";

export async function generateSchemas(entity, pascalKey, _currentGroup, camelKey, outputFolder, types: FileContainer, _adapters, repos: ClassContainer, entityInterface: ClassContainer) {
    const schemaContainer = new SchemaContainer();
    schemaContainer.key = camelKey;
    schemaContainer.pascalKey = pascalKey;

    const fields = new Array<Field>();
    // get fields
    for (const prop of entityInterface.properties) {
        fields.push({
            name: prop.name,
            apiName: prop.apiFieldname,
            type: prop.type
        });
    }
    schemaContainer.fields = fields;

    const methods = new Array<Method>();
    if (repos && repos.methods) {
        // get methods and parameters
        for (const method of repos.methods) {
            const parameters: Array<Parameter> = [];
            for (const param of method.parameterList.parameters) {
                let type = param.type;
                let subParams: Array<Parameter> = [];
                if (param.type.indexOf("Request") > -1) {
                    type = "Object";
                    // has a request
                    const request = types.containers.filter(c => c instanceof ClassContainer && c.name === param.type).pop() as ClassContainer;
                    for (const subParam of request.properties) {
                        subParams.push({
                            name: subParam.name,
                            type: subParam.type,
                        });
                    }
                } else if (param.type === "ListOptions") {
                    type = "Object";
                    subParams = subParams.concat(getDefaultListOptions());
                } else if (param.type.endsWith("ListOptions")) {
                    type = "Object";
                    subParams = subParams.concat(getDefaultListOptions());
                    const customListOptions = types.containers.filter(c => c instanceof ClassContainer && c.name.endsWith("ListOptions")).pop() as ClassContainer;
                    for (const subParam of customListOptions.properties) {
                        subParams.push({
                            name: subParam.name,
                            type: subParam.type,
                        });
                    }
                }

                parameters.push({
                    name: appendId(param.name, camelKey),
                    type: type,
                    position: param.position,
                    subParams
                });
            }

            // if we have a bucket, add it to end of parameters
            if (method.parameterList.bucket) {
                const subParams: Array<Parameter> = [];
                for (const subParam of method.parameterList.bucket.parameters) {
                    subParams.push({
                        name: subParam.name,
                        type: subParam.type
                    });
                }
                parameters.push({
                    name: "options",
                    type: "Object",
                    position: parameters.length,
                    subParams,
                });
            }

            methods.push({
                name: method.name,
                returnType: method.returns,
                parameters: parameters,
            });
        }
    }
    schemaContainer.methods = methods;

    const schemaFile = new GeneratedFile(
        `${camelKey}Schema`,
        `${outputFolder}/_schemas/${snakeToCamel(entity.group_id)}`,
        await schemaContainer.render()
    );
    schemaFile.writeFile();
}

const appendId = (id: string, entity: string) => {
    if (id === "id") {
        const cat = entity.concat(snakeToPascal(id));
        return cat;
    }
    return id;
};

const getDefaultListOptions = (): Array<Parameter> => {
    return [
        {
            name: "after",
            type: "string",
        },
        {
            name: "limit",
            type: "number",
        },
        {
            name: "order",
            type: "string",
        },
        {
            name: "include",
            type: "string",
        },
        {
            name: "maxResults",
            type: "string",
        },
    ];
};
