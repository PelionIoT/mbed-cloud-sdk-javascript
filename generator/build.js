const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");

const templatesPath = "./generator/templates";
const generatedFolder = "./src/sdk/generated";
const generatedConfigPath = "/Users/alelog01/git/mbed-cloud-api-contract/out/sdk_generation_cache.yaml.json";

const generatedConfig = JSON.parse(fs.readFileSync(generatedConfigPath));
const enums = generatedConfig.enums;
const entities = generatedConfig.entities;

// clear generated folder
fs.emptyDirSync(generatedFolder);

// generate enums
ejs.renderFile(`${templatesPath}/enums.ejs`, { enums }, { rmWhitespace: true })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/enums.ts`, contents);
    });

// generate entity factory
ejs.renderFile(`${templatesPath}/factory.ejs`, { entities }, { rmWhitespace: false })
    .then(contents => {
        fs.writeFileSync(`${generatedFolder}/factory.ts`, contents);
    });

// generate entities
entities.forEach(entity => {
    console.log(entity._key);
    ejs.renderFile(`${templatesPath}/entity.ejs`, { entity })
        .then(contents => {
            const path = `${generatedFolder}/${entity.group_id.lower_camel}/${entity._key.lower_camel}/${entity._key.lower_camel}.ts`;
            fs.createFileSync(path);
            fs.writeFileSync(path, contents);
        })
});

// generate index

// run a build