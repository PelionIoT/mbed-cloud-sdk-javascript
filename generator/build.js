const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const tsfmt = require("typescript-formatter");

const templatesPath = "./generator/templates";
const generatedFolder = "./src/sdk/generated";
const generatedConfigPath = "/Users/alelog01/git/mbed-cloud-api-contract/out/sdk_generation_cache.yaml.json";

const generatedConfig = JSON.parse(fs.readFileSync(generatedConfigPath));
const enums = generatedConfig.enums;
const entities = generatedConfig.entities;

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
    if (typeof t === "function") {
        if (items.foreign_key) {
            // TODO resolve imports
            return t(items.foreign_key.entity.pascal);
        }

        return t(getType(items.type));
    }

    return t;
};

// clear generated folder
fs.emptyDirSync(generatedFolder);

// generate enums
ejs.renderFile(`${templatesPath}/enums.ejs`, { enums })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/enums.ts`, contents);
    });

// generate entity factory
ejs.renderFile(`${templatesPath}/factory.ejs`, { entities })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/factory.ts`, contents);
    });

// generate entities
entities.forEach(entity => {
    const entityName = entity._key.pascal;
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
                foreignKeyTypes.push(f.items.foreign_key.entity.pascal);
            }
        }
    });

    // get methods
    const methods = [];
    const modes = entity.modes;
    if (modes) {
        modes.forEach(method => {
            const methodName = method._key.lower_camel;
            const httpMethod = method.method.toUpperCase();
            const path = method.path;
            const paginated = !!method.pagination;
            // if a foreign key exists and its not the same as the enity
            const foreignKey = method.foreign_key ? (method.foreign_key.entity.pascal != entityName) : false;
            const returns = foreignKey ? method.foreign_key.entity.pascal : entityName;

            const pathParams = {};
            const queryParams = {};
            const bodyParams = {};

            method.fields.forEach(field => {
                const paramIn = field.in;
                const external = field.external_param;
                const required = field.required;
                let type;
                const fieldName = field.api_fieldname;
                const key = field._key.lower_camel;
                //const type =
                if (external) {
                    type = getType(field.type);
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
                    };
                }
            });

            // currently skipping as covered by ListOptions interface. In future, extensions to interface could be generated also
            const skip = ["after", "include", "limit", "order"];
            const methodParams = Object.values(Object.assign({}, pathParams, queryParams, bodyParams))
                .filter(f => f.external === true)
                .sort((a, b) => {
                    return (a.required === b.required) ? 0 : a.required ? -1 : 1;
                });
            console.log(methodParams);

            console.log("--------------------------------");
            console.log(entityName);
            console.log(methodName);
            console.log(httpMethod);
            console.log(path);
            console.log(paginated);
            console.log(returns);
            console.log(queryParams);
            console.log(pathParams);
            // console.log(bodyParams);
            console.log("--------------------------------");

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
            });
        });
    }

    ejs.renderFile(`${templatesPath}/entity.ejs`, { entity, types, foreignKeyTypes, methods }, { rmWhitespace: true })
        .then(contents => {
            const path = `${generatedFolder}/${entity.group_id.lower_camel}/${entity._key.lower_camel}/${entity._key.lower_camel}.ts`;
            fs.createFileSync(path);
            fs.writeFileSync(path, contents);
        })
});

// generate index
ejs.renderFile(`${templatesPath}/index.ejs`, { entities })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/index.ts`, contents);
    });

// // formatting
// tsfmt.processFiles(["./src/sdk/generated/**/**/*.ts", "./src/sdk/generated/*.ts"], {
//     replace: true,
//     tsfmt: true,
// })
// .then(res => {
//     console.log(res);
// })
// .catch(e => {
//     console.log(e);
// });

// run a build