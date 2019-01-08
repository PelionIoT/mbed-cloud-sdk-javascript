import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";
import { MethodBodyParameterContainer } from "./parameters/methodBodyParameterContainer";

export class DefaultMethodBody extends MethodBodyContainer {

    public hasBucket: boolean;
    public hasRequest: boolean;

    constructor(
        method: string,
        path: string,
        returns: string,
        options?: {
            parameters?: {
                queryParams?: Array<MethodBodyParameterContainer>,
                pathParams?: Array<MethodBodyParameterContainer>,
                fileParams?: Array<MethodBodyParameterContainer>,
                bodyParams?: Array<MethodBodyParameterContainer>
            },
            hasBucket?: boolean,
            hasRequest?: boolean,
            adapter?: string
        }
    ) {
        super();
        this.method = method;
        this.path = path;
        this.returns = returns;
        options = options || {};
        const { parameters, hasRequest, hasBucket, adapter } = options;
        this.hasBucket = hasBucket;
        this.hasRequest = hasRequest || false;
        this.adapter = adapter;

        const params = parameters || {};
        const { queryParams, pathParams, fileParams, bodyParams } = params;
        this.queryParams = queryParams;
        this.pathParams = pathParams;
        this.fileParams = fileParams;
        this.bodyParams = bodyParams;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/methodBodyContainers/methods/defaultMethod.ejs", {
            method: this.method,
            path: this.path,
            queryParams: await this.getQueryParams(),
            pathParams: await this.getPathParams(),
            fileParams: await this.getFileParams(),
            bodyParams: await this.getBodyParams(),
            hasBucket: this.hasBucket,
            adapter: this.adapter,
            hasRequest: this.hasRequest,
        });
    }
}
