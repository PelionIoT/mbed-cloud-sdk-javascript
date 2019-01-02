import * as ejs from "ejs";
import { Container } from "../container";

export class ExportContainer extends Container {

    public exportFrom: string;
    public exports: string | Array<string>;

    constructor(exportFrom: string, exports?: Array<string>) {
        super();
        this.exportFrom = exportFrom;
        this.exports = exports || "*";
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/exportContainer/export.ejs", { exportFrom: this.exportFrom, theExports: this.exports });
    }
}
