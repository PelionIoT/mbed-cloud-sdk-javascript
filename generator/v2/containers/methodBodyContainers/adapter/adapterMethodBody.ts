import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";
import { AdapterFieldContainer } from "./adapterFieldContainer";

export class AdapterMethodBody extends MethodBodyContainer {

    public returns: string;
    public enclosingClass: string;
    public fields: Array<AdapterFieldContainer>;

    constructor(returns: string, enclosingClass: string, fields?: AdapterFieldContainer | Array<AdapterFieldContainer>) {
        super();
        this.returns = returns;
        this.enclosingClass = enclosingClass;
        this.fields = [];
        if (fields) {
            if (fields instanceof Array) {
                this.fields = fields;
            } else {
                this.fields.push(fields);
            }
        }
    }

    public addField(fields: AdapterFieldContainer | Array<AdapterFieldContainer>): void {
        if (fields instanceof Array) {
            this.fields = this.fields.concat(fields);
        } else {
            this.fields.push(fields);
        }
    }

    public getFields(): Promise<Array<string>> {
        return Promise.all(this.fields.map(async f => f.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/adapter/adapter.ejs", {
            returns: this.returns,
            enclosingClass: this.enclosingClass,
            fields: this.fields ? await this.getFields() : ""
        });
    }

}
