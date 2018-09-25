const fs = require("fs-extra");
const ejs = require("ejs");

const templatesPath = "./generator/templates";
const generatedFolder = "./src/sdk/generated";
const generatedConfigPath = "/Users/alelog01/git/mbed-cloud-api-contract/out/sdk_generation_cache.yaml.json";

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
    int64: "number",
    int32: "number",
}

const getType = (type, items) => {
    const t = typeMap[type];
    // if type is array
    if (typeof t === "function") {
        if (items.foreign_key) {
            return t(items.foreign_key.entity.pascal);
        }

        return t(getType(items.type));
    }

    return t;
};

const unpackParams = (key, params) => {
    console.log(key);
    console.log(params);
    if (key && params) {
        return '"' + key + '"' + ":" + (!params.external ? "this." : "") + params.key;
    }
    return "";
};

// clear generated folder
fs.emptyDirSync(generatedFolder);

// generate enums
ejs.renderFile(`${templatesPath}/enums.ejs`, { enums })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/enums.ts`, contents);
    });

// generate entity factory
ejs.renderFile(`${templatesPath}/factory.ejs`, { entities }, { rmWhitespace: true })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/factory.ts`, contents);
    });

// generate entities
entities.forEach(entity => {
    const entityName = entity._key.pascal;
    console.log(`--------------${entityName}------------------`);
    const imports = [];
    let clientCalls = false;
    let paginators = false;
    // get types
    const types = {};
    entity.fields.forEach(f => {
        const t = getType(f.format) || getType(f.type, f.items) || "any";
        const k = f._key.lower_camel
        types[k] = t;
    });

    // get foreign keys
    const foreignKeyTypes = [];
    entity.fields.forEach(f => {
        if (f.items) {
            if (f.items.foreign_key) {
                const fk = {}
                fk["propName"] = f.items.foreign_key.entity.lower_camel;
                fk["type"] = f.items.foreign_key.entity.pascal;
                foreignKeyTypes.push(fk);
            }
        }
    });

    // get methods
    const methods = [];
    const modes = entity.modes;
    if (modes) {
        modes.forEach(method => {
            clientCalls = true;
            let deferToForeignKey = false;
            let deferedMethodCall = {};
            const methodName = method._key.lower_camel;
            const httpMethod = method.method ? method.method.toUpperCase() : deferToForeignKey = true;
            const path = method.path;
            const paginated = !!method.pagination;
            const customMethodCall = !!method.custom_method;
            const customMethodName = method.custom_method;
            if (paginated) paginators = true;
            // if a foreign key exists and its not the same as the enity
            const foreignKey = method.foreign_key ? (method.foreign_key.entity.pascal != entityName) : false;
            const returns = deferToForeignKey ? method.defer_to_foreign_key_field.foreign_key.entity.pascal : foreignKey ? method.foreign_key.entity.pascal : entityName;

            if (foreignKey) {
                const fk = {};
                fk["propName"] = method.foreign_key.entity.lower_camel;
                fk["type"] = method.foreign_key.entity.pascal;
                imports.push(fk);
            }

            if (deferToForeignKey) {
                const fk = {};
                fk["propName"] = method.defer_to_foreign_key_field.foreign_key.entity.lower_camel;
                fk["type"] = method.defer_to_foreign_key_field.foreign_key.entity.pascal;
                imports.push(fk);

                deferedMethodCall = {
                    method: method.defer_to_foreign_key_field.method,
                    field: method.defer_to_foreign_key_field.field,
                }
            }

            const pathParams = {};
            const queryParams = {};
            const bodyParams = {};
            const deferedParams = {};

            const setForeignKeyProps = [];

            method.fields.forEach(field => {
                const paramIn = field.in;
                const external = field.external_param;
                const required = field.required;
                let type;
                const fieldName = field.parameter_fieldname;
                const key = field._key.lower_camel;
                const replaceBody = !!field.__REPLACE_BODY;

                if (external) {
                    type = getType(field.type, field.items);
                }

                if (deferToForeignKey) {
                    console.log("<<<<<<<<<<<<<<<<<<<<<<<<");
                    deferedParams[field._key.pascal] = {
                        key,
                        type: field._key.pascal,
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
                    console.log("<<<<<<<<<<<<<<<<<<<<<<<<");
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
            });

            // currently skipping as covered by ListOptions interface. In future, extensions to interface could be generated also
            const skip = ["after", "include", "limit", "order"];
            const methodParams = Object.values(Object.assign({}, pathParams, queryParams, bodyParams, deferedParams))
                .filter(f => f.external === true)
                .sort((a, b) => {
                    return (a.required === b.required) ? 0 : a.required ? -1 : 1;
                });

            console.log(methodName);

            if (deferToForeignKey) {
                console.log("%%%%%%%%%%%%");
                console.log(deferToForeignKey);
                console.log(setForeignKeyProps);
                console.log(deferedMethodCall);
                console.log("%%%%%%%%%%%%");
            }

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
                methodParams,
                deferToForeignKey,
                setForeignKeyProps,
                deferedMethodCall,
                customMethodCall,
                customMethodName
            });
        });
    }

    const filteredImports = imports.concat(foreignKeyTypes).filter((fk, index, self) => index === self.findIndex((t) => (t.propName === fk.propName))).filter(fk => fk.type !== entityName);
    ejs.renderFile(`${templatesPath}/entity.ejs`, { entity, types, foreignKeyTypes, methods, filteredImports, clientCalls, paginators, unpackParams }, { rmWhitespace: true })
        .then(contents => {
            const path = `${generatedFolder}/${entity.group_id.lower_camel}/${entity._key.lower_camel}/${entity._key.lower_camel}.ts`;
            fs.createFileSync(path);
            fs.writeFileSync(path, contents);
        });
    console.log("--------------------------------");
});

// generate index
ejs.renderFile(`${templatesPath}/index.ejs`, { entities })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/index.ts`, contents);
    });
