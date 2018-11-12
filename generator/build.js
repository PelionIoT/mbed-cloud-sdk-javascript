const fs = require("fs-extra");
const ejs = require("ejs");

const templatesPath = "./generator/templates";
const generatedFolder = "./src/sdk/generated";
// todo currently default to location on my disk. Remove once flow is implemented
const generatedConfigPath = process.argv[2] || "/Users/alelog01/git/mbed-cloud-api-contract/out/sdk_gen_intermediate.json";

const generatedConfig = JSON.parse(fs.readFileSync(generatedConfigPath));
const enums = generatedConfig.enums;
const entities = generatedConfig.entities;

// map swagger types to typescript types
const typeMap = {
    string: "string",
    integer: "number",
    boolean: "boolean",
    array: (items) => "Array<" + items + ">",
    "date-time": "Date",
    "date": "Date",
    int64: "number",
    int32: "number",
    object: "any",
    file: "ReadStream | Buffer | File | Blob",
}

const getType = (type, items) => {
    const t = typeMap[type];
    // if type is array
    if (typeof t === "function") {
        if (items.foreign_key) {
            return t(snakeToPascal(items.foreign_key.entity));
        }

        return t(getType(items.type));
    }

    return t;
};

// get the type of enum usinf the enum_reference
const getEnumType = (field, enums) => {
    const enumName = snakeToPascal(field.enum_reference);
    enums.push(enumName);
    return enumName;
}

// if field has a foreign_key at root, it is standalone foreign_key
const getForeignKeyType = (field) => {
    if (field.foreign_key) {
        return snakeToPascal(field.foreign_key.entity);
    }

    return undefined;
}

// type is additional_properties as defined in swagger
const getAdditionalProperties = (field) => {
    if (field.additionalProperties) {
        return "{ [key: string]: string }"
    }

    return undefined;
}

// helper method to generate list of parameters
const unpackParams = (key, params) => {
    if (key && params) {
        return '"' + key + '"' + ":" + (!params.external ? "this." : "") + params.key;
    }
    return "";
};

// convert snake to camelCase
const snakeToCamel = (snake) => {
    if (snake) {
        const out = snake.replace(/((\_|\-)\w)/g, match => {
            return match[1].toUpperCase();
        });

        return out;
    }

    return "";
}

// conver snake to PascalCase
const snakeToPascal = (snake) => {
    const camel = snakeToCamel(snake);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// clear generated folder
fs.emptyDirSync(generatedFolder);

// generate enums
ejs.renderFile(`${templatesPath}/enums.ejs`, { enums, snakeToCamel, snakeToPascal })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/enums.ts`, contents);
    });

// generate entity factory
ejs.renderFile(`${templatesPath}/factory.ejs`, { entities, snakeToCamel, snakeToPascal }, { rmWhitespace: true })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/factory.ts`, contents);
    });

// generate entities
entities.forEach(entity => {
    const entityName = snakeToPascal(entity._key);
    console.log(`--------------${entityName}------------------`);
    const imports = [];
    const enums = [];
    let clientCalls = false;
    let paginators = false;
    let customMethods = false;
    let fsNeeded = false;
    // get types
    const types = {};
    entity.fields.forEach(f => {
        const t = (f.enum && f.enum_reference) ? getEnumType(f, enums) : getForeignKeyType(f) || getAdditionalProperties(f) || getType(f.format) || getType(f.type, f.items) || "any";
        const k = snakeToCamel(f._key)
        types[k] = t;
        console.log(k + ": " + t);
    });

    // get foreign keys
    const foreignKeyTypes = [];
    entity.fields.forEach(f => {
        if (f.items) {
            if (f.items.foreign_key) {
                const fk = {}
                fk["propName"] = snakeToCamel(f.items.foreign_key.entity);
                fk["type"] = snakeToPascal(f.items.foreign_key.entity);
                fk["array"] = true;
                foreignKeyTypes.push(fk);
            }
        }

        if (f.foreign_key) {
            const fk = {}
            fk["propName"] = snakeToCamel(f.foreign_key.entity);
            fk["type"] = snakeToPascal(f.foreign_key.entity);
            fk["array"] = false;
            foreignKeyTypes.push(fk);
        }

        if (f._override) {
            customMethods = true;
        }
    });

    // get methods
    const methods = [];
    const modes = entity.methods;
    if (modes) {
        modes.forEach(method => {
            clientCalls = true;
            let deferToForeignKey = false;
            let deferedMethodCall = {};
            const methodName = snakeToCamel(method._key);
            const httpMethod = method.method ? method.method.toUpperCase() : deferToForeignKey = true;
            const path = method.path;
            const paginated = !!method.pagination;
            const privateMethod = !!method.private_method;
            const customMethodCall = !!method.custom_method;
            if (customMethodCall) {
                customMethods = true;
            }
            const customMethodName = method.custom_method;
            if (paginated) paginators = true;
            // if a foreign key exists and its not the same as the enity
            const foreignKey = method.foreign_key ? (snakeToPascal(method.foreign_key.entity) != entityName) : false;
            const returns = deferToForeignKey ? snakeToPascal(method.defer_to_foreign_key_field.foreign_key.entity) : foreignKey ? snakeToPascal(method.foreign_key.entity) : method.type ? getType(method.type) : entityName;

            if (foreignKey) {
                const fk = {};
                fk["propName"] = snakeToCamel(method.foreign_key.entity);
                fk["type"] = snakeToPascal(method.foreign_key.entity);
                imports.push(fk);
            }

            if (deferToForeignKey) {
                const fk = {};
                fk["propName"] = snakeToCamel(method.defer_to_foreign_key_field.foreign_key.entity);
                fk["type"] = snakeToPascal(method.defer_to_foreign_key_field.foreign_key.entity);
                imports.push(fk);

                deferedMethodCall = {
                    method: method.defer_to_foreign_key_field.method,
                    field: method.defer_to_foreign_key_field.field,
                }
            }

            const pathParams = {};
            const queryParams = {};
            const bodyParams = {};
            const formParams = {};
            const deferedParams = {};

            const setForeignKeyProps = [];

            method.fields.forEach(field => {
                const paramIn = field.in;
                const external = field.external_param;
                const required = field.required;
                let type;
                const fieldName = field.parameter_fieldname || field.name;
                const key = snakeToCamel(field._key);
                const replaceBody = !!field.__REPLACE_BODY;

                if (external) {
                    type = getAdditionalProperties(field) || getType(field.type, field.items);
                    if (type === typeMap.file) {
                        fsNeeded = true;
                    }
                }

                if (deferToForeignKey) {
                    deferedParams[snakeToPascal(field._key)] = {
                        key,
                        type: snakeToPascal(field._key),
                        external,
                        required,
                    }

                    Object.keys(field.set_foreign_key_properties).forEach(k => {
                        const assignments = {
                            externalKey: k,
                            selfKey: field.set_foreign_key_properties[k],
                        }
                        setForeignKeyProps.push(assignments);
                    });
                }

                if (paramIn === "path") {
                    pathParams[fieldName] = {
                        key,
                        type,
                        external,
                        required,
                    };
                }

                if (paramIn === "query") {
                    queryParams[fieldName] = {
                        key,
                        type,
                        external,
                        required,
                    };
                }

                if (paramIn === "body") {
                    bodyParams[fieldName] = {
                        key,
                        type,
                        external,
                        required,
                        replaceBody
                    };
                }

                if (paramIn === "stream") {
                    formParams[fieldName] = {
                        key,
                        type,
                        external,
                        required,
                    };
                }
            });

            // currently skipping as covered by ListOptions interface. In future, extensions to interface could be generated also
            const skip = ["after", "include", "limit", "order"];
            const methodParams = Object.values(Object.assign({}, pathParams, queryParams, bodyParams, formParams, deferedParams))
                .filter(f => f.external === true)
                .sort((a, b) => {
                    return (a.required === b.required) ? 0 : a.required ? -1 : 1;
                });

            methods.push({
                entityName,
                methodName,
                httpMethod,
                path,
                paginated,
                returns,
                pathParams,
                queryParams,
                bodyParams,
                formParams,
                methodParams,
                deferToForeignKey,
                setForeignKeyProps,
                deferedMethodCall,
                customMethodCall,
                customMethodName,
                privateMethod
            });

            console.log(methodName + ": " + returns);
        });
    }

    const filteredImports = imports.concat(foreignKeyTypes).filter((fk, index, self) => index === self.findIndex((t) => (t.propName === fk.propName))).filter(fk => fk.type !== entityName);
    ejs.renderFile(`${templatesPath}/entity.ejs`, { entity, types, foreignKeyTypes, methods, filteredImports, enums, clientCalls, paginators, customMethods, fsNeeded, unpackParams, snakeToCamel, snakeToPascal }, { rmWhitespace: false })
        .then(contents => {
            const path = `${generatedFolder}/${snakeToCamel(entity.group_id)}/${snakeToCamel(entity._key)}/${snakeToCamel(entity._key)}.ts`;
            fs.createFileSync(path);
            fs.writeFileSync(path, contents);
        });
    console.log("--------------------------------");
});

// generate index
ejs.renderFile(`${templatesPath}/index.ejs`, { entities, snakeToCamel, snakeToPascal })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/index.ts`, contents);
    });
