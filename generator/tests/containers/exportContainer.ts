import { ExportContainer } from "../../containers/exportContainer/exportContainer";

const defaultExportExpected = `export * from "from/somewhere";`;

const singleExportExpected = `export {Something} from "from/somewhere";`;

const multipleExportExpected = `export {Something,AnotherThing} from "from/somewhere";`;

describe("render export statements", () => {

    it("should render default export statement", async () => {
        const defaultExport = new ExportContainer("from/somewhere");
        const r = await defaultExport.render();

        expect(r).toBe(defaultExportExpected);
    });

    it("should render single export", async () => {
        const singleExport = new ExportContainer("from/somewhere", [ "Something" ]);
        const r = await singleExport.render();

        expect(r).toBe(singleExportExpected);
    });

    it("should render multiple export", async () => {
        const multipleExport = new ExportContainer("from/somewhere", [ "Something", "AnotherThing" ]);
        const r = await multipleExport.render();

        expect(r).toBe(multipleExportExpected);
    });

});
