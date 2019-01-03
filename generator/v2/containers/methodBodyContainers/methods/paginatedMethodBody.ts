import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";

export class PaginatedMethodBody extends MethodBodyContainer {

    public returns: string;
    public path: string;

    constructor(returns: string, path: string) {
        super();
        this.returns = returns;
        this.path = path;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/methods/paginatedMethod.ejs", {
            returns: this.returns,
            path: this.path
        });
    }
}
