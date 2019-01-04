/* tslint:disable: no-console */
import { AdapterFieldContainer } from "../containers/methodBodyContainers/adapter/adapterFieldContainer";
import { snakeToCamel } from "../common/utilities";
import { MethodContainer } from "../containers/methodContainer/methodContainer";
import { ParameterListContainer } from "../containers/parameterListContainer/parameterListContainer";
import { ParameterContainer } from "../containers/parameterContainer/parameterContainer";
import { AdapterMethodBody } from "../containers/methodBodyContainers/adapter/adapterMethodBody";
import { ClassContainer } from "../containers/classContainer/classContainer";
import { ImportContainer } from "../containers/importContainer/importContainer";
import { File as GeneratedFile } from "../common/file";
import { ExportContainer } from "../containers/exportContainer/exportContainer";
import { FileContainer } from "../containers/fileContainer/fileContainer";

export async function generateAdapters(entity, pascalKey: string, camelKey: string, outputFolder: string, entityIndex: FileContainer) {
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

    const adapterFile = new GeneratedFile(
        `${camelKey}Adapter`,
        `${outputFolder}/${snakeToCamel(entity.group_id)}/${camelKey}`,
        await adapterClass.render()
    );
    adapterFile.writeFile();

    const typeExport = new ExportContainer(`./${camelKey}Adapter`);
    entityIndex.addContainer(typeExport);
}
