import * as ejs from "ejs";
import { Container } from "../container";
import { FactoryMethodContainer } from "./factoryMethodContainer";
import { ImportContainer } from "../importContainer/importContainer";

export class FactoryContainer extends Container {

    public imports: Array<ImportContainer>;
    public methods: Array<FactoryMethodContainer>;

    constructor(methods: Array<FactoryMethodContainer>, imports: Array<ImportContainer>) {
        super();
        this.methods = methods;
        this.imports = imports;
    }

    public getMethods(): Promise<Array<string>> {
        return Promise.all(this.methods.map(async c => c.render()));
    }

    public getImports(): Promise<Array<string>> {
        return Promise.all(this.imports.map(async i => i.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/factoryContainer/factory.ejs", {
            methods: await this.getMethods(),
            imports: await this.getImports(),
        });
    }
}
