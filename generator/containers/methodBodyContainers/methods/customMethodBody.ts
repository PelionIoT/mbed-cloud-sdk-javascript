import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";

export class CustomMethodBody extends MethodBodyContainer {

    public methodName: string;
    public parameters: Array<string>;

    constructor(methodName: string, parameters?: Array<string>) {
        super();
        this.methodName = methodName;
        this.parameters = parameters || [];
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/methodBodyContainers/methods/customMethodBody.ejs", {
            methodName: this.methodName,
            parameters: this.parameters
        });
    }
}
