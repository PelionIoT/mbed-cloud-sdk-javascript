import { Container } from "../containers/container";

// map swagger types to typescript types
const typeMap = {
    "string": "string",
    "integer": "number",
    "boolean": "boolean",
    "array": items => "Array<" + items + ">",
    "date-time": "Date",
    "date": "Date",
    "double": "number",
    "int64": "number",
    "int32": "number",
    "filter": "{ [key: string]: string }",
    "object": "any",
    "file": "ReadStream | Buffer | File | Blob",
};

const getType = (type: string, items?: any) => {
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

// get the type of enum using the enum_reference
const getEnumType = (field, enums) => {
    const enumName = snakeToPascal(field.enum_reference).replace("Enum", "");
    enums.push(enumName);
    return enumName;
};

// if field has a foreign_key at root, it is standalone foreign_key
const getForeignKeyType = field => {
    if (field.foreign_key) {
        return snakeToPascal(field.foreign_key.entity);
    }

    return undefined;
};

// type is additional_properties as defined in swagger
const getAdditionalProperties = field => {
    if (field.additionalProperties) {
        return "{ [key: string]: string }";
    }

    return undefined;
};

const getPropertyType = (f, enums) => {
    return (f.enum && f.enum_reference) ? getEnumType(f, enums) : getForeignKeyType(f) || getAdditionalProperties(f) || getType(f.format) || getType(f.type, f.items) || "any";
};

// helper method to generate list of parameters
const unpackParams = (key, params) => {
    if (key && params) {
        return '"' + key + '"' + ":" + (!params.external ? "this." : "") + params.key;
    }
    return "";
};

// convert snake to camelCase
const snakeToCamel = snake => {
    if (snake) {
        const out = snake.replace(/((\_|\-)\w)/g, match => {
            return match[1].toUpperCase();
        });

        return out;
    }

    return "";
};

// const camelToSnake = camel => {
//     return camel.replace(/([A-Z])/g, match => "_" + match.toLowerCase());
// };

// conver snake to PascalCase
const snakeToPascal = (snake: string): string => {
    const camel = snakeToCamel(snake);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};

const safeAddToList = (list: Array<Container>, item: Container): void => {
    if (list.filter(c => c.key === item.key).length === 0) {
        list.push(item);
    }
};

const isEmptyFilter = obj => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

const getTypeReferencePrefix = (entityKey: string, returnsKey: string) => {
    if (returnsKey.toUpperCase() === entityKey.toUpperCase()) {
        return entityKey;
    } else {
        return `${entityKey}_${returnsKey}`
    }
}

export {
    typeMap,
    getType,
    getEnumType,
    getForeignKeyType,
    getAdditionalProperties,
    getPropertyType,
    unpackParams,
    snakeToCamel,
    snakeToPascal,
    safeAddToList,
    isEmptyFilter,
    getTypeReferencePrefix,
};
