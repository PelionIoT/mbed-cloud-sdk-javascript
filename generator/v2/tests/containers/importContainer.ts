import { ImportContainer } from "../../containers/importContainer/importContainer";

const defaultImportExpected = `import * from "from/somewhere";`;

const singleImportExpected = `import {Something} from "from/somewhere";`;

const multipleImportExpected = `import {Something,AnotherThing} from "from/somewhere";`;

describe("render Import statements", () => {

    it("should render default import statement", async () => {
        const defaultImport = new ImportContainer("from/somewhere");
        const r = await defaultImport.render();

        expect(r).toBe(defaultImportExpected);
    });

    it("should render single import", async () => {
        const singleImport = new ImportContainer("from/somewhere", [ "Something" ]);
        const r = await singleImport.render();

        expect(r).toBe(singleImportExpected);
    });

    it("should render multiple import", async () => {
        const multipleImport = new ImportContainer("from/somewhere", [ "Something", "AnotherThing" ]);
        const r = await multipleImport.render();

        expect(r).toBe(multipleImportExpected);
    });

});
