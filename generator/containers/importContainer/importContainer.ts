import * as ejs from "ejs";
import { Container } from "../container";

export class ImportContainer extends Container {

    public importFrom: string;
    public imports: string | Array<string>;

    constructor(key: string, importFrom: string, imports?: Array<string>) {
        super();
        this.key = key;
        this.importFrom = importFrom;
        this.imports = imports || "*";
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/importContainer/import.ejs", { importFrom: this.importFrom, imports: this.imports });
    }
}
