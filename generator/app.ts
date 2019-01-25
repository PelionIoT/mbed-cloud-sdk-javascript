/* tslint:disable: no-console */
import * as fs from "fs-extra";
import { File as GeneratedFile } from "./common/file";
import { generateInterface } from "./generators/generateInterface";
import { snakeToCamel, snakeToPascal } from "./common/utilities";
import { FileContainer } from "./containers/fileContainer/fileContainer";
import { ExportContainer } from "./containers/exportContainer/exportContainer";
import { generateTypes } from "./generators/generateTypes";
import { generateAdapters } from "./generators/generateAdapters";
import { generateRepository } from "./generators/generateRepository";
import { ImportContainer } from "./containers/importContainer/importContainer";
import { FactoryMethodContainer } from "./containers/factoryContainer/factoryMethodContainer";
import { FactoryContainer } from "./containers/factoryContainer/factoryContainer";
import { factory as loggerFactory } from "./logger";
import { generateSchemas } from "./generators/generateSchemas";

async function main() {
    const log = loggerFactory.getLogger("default");
    const outputFolder = "./src/sdk/generated";
    const configPath = "api_specifications/public/sdk_foundation_definition.json";

    const generatedConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const enums = generatedConfig.enums;
    const entities = generatedConfig.entities;

    // clear generated folder
    fs.emptyDirSync(outputFolder);
    log.info(`Clearing directory ${outputFolder}`);

    const entityExports: Array<ExportContainer> = [];

    const schemaExports: Array<ExportContainer> = [];

    for (const entity of entities) {
        const currentGroup = snakeToPascal(entity.group_id);
        const camelKey = snakeToCamel(entity._key);
        const pascalKey = snakeToPascal(entity._key);
        log.info(`Starting generation for ${pascalKey} in ${currentGroup}`);

        // generate interface
        const entityInterface = generateInterface(entity, enums);
        const entityInterfaceFile = await entityInterface.render();
        const interfaceFilePath = `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`;
        const interfaceFile = new GeneratedFile(
            camelKey,
            interfaceFilePath,
            entityInterfaceFile
        );
        interfaceFile.writeFile();
        log.info(`Wrote interface file ${camelKey} to ${interfaceFilePath}`);

        // generate index file
        const entityIndex = new FileContainer(
            [
                new ExportContainer(`./${camelKey}`)
            ]
        );

        entityExports.push(new ExportContainer(`./${snakeToCamel(entity.group_id)}/${camelKey}`));

        // generate types
        const typesFile = await generateTypes(entity, enums, pascalKey, outputFolder, camelKey, entityIndex);

        // generate adapters
        const adaptersFile = await generateAdapters(entity, pascalKey, camelKey, outputFolder, entityIndex, entity._key);

        // generate repository
        const repositoryFile = await generateRepository(entity, pascalKey, currentGroup, camelKey, outputFolder, entityIndex);

        const indexFile = new GeneratedFile(
            "index",
            `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
            await entityIndex.render()
        );
        indexFile.writeFile();
        log.info(`Wrote index file for ${pascalKey} in ${currentGroup}`);

        // generate schema files
        generateSchemas(entity, pascalKey, currentGroup, camelKey, outputFolder, typesFile, adaptersFile, repositoryFile, entityInterface);
        schemaExports.push(new ExportContainer(`./${currentGroup}/${camelKey}Schema`, [
            `${camelKey}Schema`
        ]));
    }

    const schemaIndex = new FileContainer(schemaExports);
    const schemaIndexFile = new GeneratedFile(
        "index",
        `${outputFolder}/_schemas`,
        await schemaIndex.render()
    );
    schemaIndexFile.writeFile();

    // generateFactory
    const factoryImports = new Array<ImportContainer>();
    const factoryMethods = new Array<FactoryMethodContainer>();
    for (const entity of entities) {
        if (entity.methods.length > 0) {
            const factoryMethod = new FactoryMethodContainer(
                snakeToCamel(entity._key),
                snakeToPascal(entity._key)
            );
            factoryMethods.push(factoryMethod);
            factoryImports.push(new ImportContainer(
                `${snakeToPascal(entity._key).toUpperCase()}_REPOSITORY`,
                ".",
                [
                    `${snakeToPascal(entity._key)}Repository`
                ]
            ));
        }
    }
    const factory = new FactoryContainer(factoryMethods, factoryImports);
    entityExports.push(new ExportContainer(
        "./factory",
        [
            "Factory"
        ]
    ));
    const factoryFile = new GeneratedFile(
        "factory",
        outputFolder,
        await factory.render()
    );
    factoryFile.writeFile();
    log.info(`Wrote factory class file`);

    // main export file
    const generatedIndex = new FileContainer(entityExports);
    const generatedIndexFile = new GeneratedFile(
        "index",
        outputFolder,
        await generatedIndex.render()
    );
    generatedIndexFile.writeFile();
    log.info(`Wrote index file for SDK`);
}

main();
