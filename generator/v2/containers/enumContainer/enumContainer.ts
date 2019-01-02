import * as ejs from "ejs";
import { Container } from "../container";

export class EnumContainer extends Container {

    public name: string;
    public values: Array<string>;

    constructor(name: string, values: Array<string>) {
        super();
        this.name = name;
        this.values = values;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/enumContainer/enum.ejs", { _enum: this });
    }

}
