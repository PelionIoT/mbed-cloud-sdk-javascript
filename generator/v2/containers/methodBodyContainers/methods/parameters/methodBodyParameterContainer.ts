import * as ejs from "ejs";
import { Container } from "../../../container";

export class MethodBodyParameterContainer extends Container {

    public to: string;
    public from: string;
    public caller: string;

    constructor(from: string, to: string, caller?: string) {
        super();
        this.to = to;
        this.from = from;
        this.caller = caller;
    }
    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/methods/parameters/methodBodyParameter.ejs", {
            to: this.to,
            from: this.from,
            caller: this.caller
        });
    }

}
