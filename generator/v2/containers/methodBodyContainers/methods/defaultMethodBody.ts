import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";

export class DefaultMethodBody extends MethodBodyContainer {

    public method: string;
    public path: string;

    constructor(method: string, path: string) {
        super();
        this.method = method;
        this.path = path;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/methods/defaultMethod.ejs", {
            method: this.method,
            path: this.path
        });
    }
}
