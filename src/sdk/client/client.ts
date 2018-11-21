import superagent = require("superagent");
import { SdkApiBase } from "./sdkApiBase";
import { Config } from "./config";
import { EntityBase } from "../common/entityBase";

export class Client extends SdkApiBase {

    constructor(config: Config) {
        super(config);
    }

    public CallApi(options: CallApiOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this._CallApi(options, null, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }

    public _CallApi<T extends EntityBase>(options: CallApiOptions, instance?: T | { new(): T; }, callback?: (error: any, data?: any, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        const { url, method, pathParams, headers, query, formParams, body, paginated, contentTypes, acceptTypes } = options;

        return this.request({
            url: url,
            method: method,
            headers: headers,
            query: query,
            formParams: formParams,
            contentTypes: contentTypes || [ "application/json" ],
            acceptTypes: acceptTypes || [ "application/json" ],
            body: body,
            pathParams: pathParams,
            paginated: paginated || false,
        }, instance, callback);
    }
}

export interface CallApiOptions {
    url?: string;
    method?: Method;
    pathParams?: ClientParams;
    headers?: ClientParams;
    query?: ClientParams;
    formParams?: ClientParams;
    body?: any;
    contentTypes?: Array<string>;
    acceptTypes?: Array<string>;
    paginated?: boolean;
}

export interface ClientParams {
    [parameter: string]: any;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";
