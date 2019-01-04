import { Container } from "../container";
import { MethodBodyParameterContainer } from "./methods/parameters/methodBodyParameterContainer";

export class MethodBodyContainer extends Container {

    public method: string;
    public path: string;
    public returns: string;
    public queryParams: Array<MethodBodyParameterContainer>;
    public pathParams: Array<MethodBodyParameterContainer>;
    public fileParams: Array<MethodBodyParameterContainer>;
    public bodyParams: Array<MethodBodyParameterContainer>;
    public async render(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public getQueryParams(): Promise<Array<string>> {
        return Promise.all(this.queryParams.map(async q => q.render()));
    }

    public getPathParams(): Promise<Array<string>> {
        return Promise.all(this.pathParams.map(async p => p.render()));
    }

    public getFileParams(): Promise<Array<string>> {
        return Promise.all(this.fileParams.map(async f => f.render()));
    }

    public getBodyParams(): Promise<Array<string>> {
        return Promise.all(this.bodyParams.map(async b => b.render()));
    }
}
