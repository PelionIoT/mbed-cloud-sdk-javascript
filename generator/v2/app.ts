/* tslint:disable: no-console */
import * as fs from "fs-extra";
import { File as GeneratedFile } from "./common/file";
import { generateInterface } from "./generators/generateInterface";
import { snakeToCamel, snakeToPascal, getPropertyType } from "./common/utilities";
import { FileContainer } from "./containers/fileContainer/fileContainer";
import { ExportContainer } from "./containers/exportContainer/exportContainer";
import { EnumContainer } from "./containers/enumContainer/enumContainer";
import { PropertyContainer } from "./containers/propertyContainer/propertyContainer";
import { ClassContainer } from "./containers/classContainer/classContainer";
import { ImportContainer } from "./containers/importContainer/importContainer";

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
