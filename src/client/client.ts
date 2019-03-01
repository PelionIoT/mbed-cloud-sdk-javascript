import superagent = require("superagent");
import { SdkApiBase } from "./sdkApiBase";
import { Config } from "./config";

export class Client extends SdkApiBase {

    constructor(config: Config) {
        super(config);
    }

    public CallApi(options: CallApiOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this._CallApi(options, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }

    public _CallApi(options: CallApiOptions, callback?: (error: any, data?: any, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        const { url, method, pathParams, headers, query, formParams, body, contentTypes, acceptTypes } = options;

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
        }, callback);
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
}

export interface ClientParams {
    [parameter: string]: any;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";
