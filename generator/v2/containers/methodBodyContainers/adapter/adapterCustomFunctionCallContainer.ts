import * as ejs from "ejs";
import { Container } from "../../container";

export class AdapterCustomFunctionCallContainer extends Container {

    public property: string;

    constructor(property: string) {
        super();
        this.property = property;
    }
    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/adapter/adapterCustomFunctionCall.ejs", {
            property: this.property
        });
    }

}
