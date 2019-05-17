import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";
import { MethodBodyParameterContainer } from "./parameters/methodBodyParameterContainer";

export class PaginatedMethodBody extends MethodBodyContainer {

    public listOptionsType: string;

    constructor(
        returns: string,
        path: string,
        options?: {
            parameters?: {
                queryParams?: Array<MethodBodyParameterContainer>,
                pathParams?: Array<MethodBodyParameterContainer>,
                fileParams?: Array<MethodBodyParameterContainer>,
                bodyParams?: Array<MethodBodyParameterContainer>
            },
            adapter?: string,
            listOptionsType?: string
        }
    ) {
        super();
        this.returns = returns;
        this.path = path;
        this.method = "GET";

        options = options || {};
        const { parameters, adapter, listOptionsType } = options;
        this.adapter = adapter;
        this.listOptionsType = listOptionsType || "ListOptions";

        const params = parameters || {};
        const { queryParams, pathParams, fileParams, bodyParams } = params;
        this.queryParams = queryParams;
        this.pathParams = pathParams;
        this.fileParams = fileParams;
        this.bodyParams = bodyParams;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/methodBodyContainers/methods/paginatedMethod.ejs", {
            returns: this.returns,
            path: this.path,
            queryParams: await this.getQueryParams(),
            pathParams: await this.getPathParams(),
            fileParams: await this.getFileParams(),
            bodyParams: await this.getBodyParams(),
            adapter: this.adapter,
            listOptionsType: this.listOptionsType,
        });
    }
}
