/* tslint:disable: no-console */
import { AdapterFieldContainer } from "../containers/methodBodyContainers/adapter/adapterFieldContainer";
import { snakeToCamel, snakeToPascal, safeAddToList } from "../common/utilities";
import { MethodContainer } from "../containers/methodContainer/methodContainer";
import { ParameterListContainer } from "../containers/parameterListContainer/parameterListContainer";
import { ParameterContainer } from "../containers/parameterContainer/parameterContainer";
import { AdapterMethodBody } from "../containers/methodBodyContainers/adapter/adapterMethodBody";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { ImportContainer } from "../containers/importContainer/importContainer";
import { File as GeneratedFile } from "../common/file";
import { ExportContainer } from "../containers/exportContainer/exportContainer";
import { FileContainer } from "../containers/fileContainer/fileContainer";
import { AdapterMapperContainer } from "../containers/methodBodyContainers/adapter/adapterMapperContainer";
import { AdapterCustomFunctionCallContainer } from "../containers/methodBodyContainers/adapter/adapterCustomFunctionCallContainer";

export async function generateAdapters(entity, pascalKey: string, camelKey: string, outputFolder: string, entityIndex: FileContainer, snakeKey: string): Promise<ClassContainer> {
    const adapterMappers = new Array<AdapterMapperContainer>();
    const adapterImports = new Array<ImportContainer>();
    const adapterFields = new Array<AdapterFieldContainer>();
    const adapterCustomFunctions = new Array<AdapterCustomFunctionCallContainer>();

    for (const field of entity.fields) {
        let mapsForeignKeyArray = false;
        let mapsForeignKey = false;
        let foreignKeyAdapter = "";
        if (field.items && field.items.foreign_key) {
            // field is an array of foreign keys
            // hard code for now to cope with plurality of policy/policies
            const adapter = `${snakeToPascal(field.items.foreign_key.entity)}Adapter`;
            mapsForeignKeyArray = true;
            const mapper = new AdapterMapperContainer(
                field._key,
                snakeToCamel(field._key),
                adapter
            );
            adapterMappers.push(mapper);
            // add import for adapter
            adapterImports.push(new ImportContainer(
                `${field._key.toUpperCase()}_ADAPTER`,
                "../..",
                [
                    adapter
                ]
            ));
        }
        if (field.foreign_key) {
            // field is foreing key
            mapsForeignKey = true;
            foreignKeyAdapter = `${snakeToPascal(field.foreign_key.entity)}Adapter`;
            adapterImports.push(new ImportContainer(
                `${field._key.toUpperCase()}_ADAPTER`,
                "../..",
                [
                    foreignKeyAdapter
                ]
            ));
        }
        if (field.format === "date-time") {
            // TODO map date times here to remove data regex from client and stop doing hard copy
        }
        if (field.getter_custom_method || field.setter_custom_method) {
            const methodName = field.setter_custom_method || field.getter_custom_method;
            const customFunctionCall = new AdapterCustomFunctionCallContainer(snakeToCamel(methodName));
            adapterCustomFunctions.push(customFunctionCall);
            safeAddToList(adapterImports, new ImportContainer(
                `${methodName.toUpperCase()}_PRIVATE_FUNCTIONS`,
                "../../../common/privateFunctions",
                [
                    `${snakeToCamel(methodName)}`
                ]
            ));
        }

        const adapterField = new AdapterFieldContainer(
            snakeToCamel(field._key),
            field.api_fieldname,
            {
                mapsForeignKeyArray,
                mapsForeignKey,
                foreignKeyAdapter,
                defaultValue: getDefaultValue(field),
            }
        );
        adapterFields.push(adapterField);
    }

    const fromApiMethod = new MethodContainer("fromApi", {
        returns: pascalKey,
        isStatic: true,
        parameterList: new ParameterListContainer({
            parameters: [
                new ParameterContainer("data", "any"),
                new ParameterContainer("instance", "any", { isRequired: false })
            ]
        }),
        methodBody: new AdapterMethodBody(
            pascalKey,
            snakeKey,
            `${pascalKey}Adapter`,
            {
                fields: adapterFields,
                mapperMethods: adapterMappers,
                customFunctionCalls: adapterCustomFunctions
            }),
    });

    const adapterClass = new ClassContainer(
        `${pascalKey}Adapter`,
        {
            description: `${pascalKey} adapter`,
            extendsClass: "Adapter",
            imports: [
                new ImportContainer("ADAPTER_BASE", "../../../common/adapter", [
                    "Adapter"
                ]),
                new ImportContainer(`${pascalKey.toUpperCase()}_INTERFACE`, `./${camelKey}`, [
                    pascalKey
                ])
            ],
            methods: [
                fromApiMethod
            ]
        }
    );
    adapterClass.addImport(adapterImports);

    const adapterFile = new GeneratedFile(
        `${camelKey}Adapter`,
        `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
        await adapterClass.render()
    );
    adapterFile.writeFile();

    const typeExport = new ExportContainer(`./${camelKey}Adapter`);
    entityIndex.addContainer(typeExport);

    return adapterClass;
}

const getDefaultValue = field => {
    if (field.type === "string") {
        return field.default ? `"${field.default}"` : null;
    }

    if (field.type === "integer") {
        return field.minimum || field.default || 0;
    }

    return null;
};
