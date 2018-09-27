import superagent = require("superagent");
import { SdkApiBase } from "./sdkApiBase";
import { Config } from "./config";
import { EntityBase } from "../common/entityBase";

export class Client extends SdkApiBase {

    constructor(config?: Config) {
        super(config);
    }

    public CallApi(options: { url?: string, method?: Method, pathParams?: ClientParams, headers?: ClientParams, query?: ClientParams, formParams?: ClientParams, body?: any, paginated?: boolean }): Promise<any> {
        options = options || {};
        return new Promise((resolve, reject) => {
            this._CallApi(options, null, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }

    public _CallApi<T extends EntityBase>(options: { url?: string, method?: Method, pathParams?: ClientParams, headers?: ClientParams, query?: ClientParams, formParams?: ClientParams, body?: any, paginated?: boolean }, instance?: T, callback?: (error: any, data?: any, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        const contentTypes: Array<string> = [
            "application/json"
        ];
        const acceptTypes: Array<string> = [
            "application/json"
        ];

        const { url, method, pathParams, headers, query, formParams, body, paginated } = options;

        const useFormData = !!formParams;

        return this.request({
            url: url,
            method: method,
            headers: headers,
            query: query,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
            pathParams: pathParams,
            paginated: paginated || false,
        }, instance, callback);
    }
}

export interface ClientParams {
    [parameter: string]: any;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";
