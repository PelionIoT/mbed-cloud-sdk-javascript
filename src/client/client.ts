import * as superagent from "superagent";
import { Config } from "../common/config";
import { SdkApiBase } from "./sdkApiBase";

/**
 * Client, gives access to http client with supplied credentials
 */
export class Client extends SdkApiBase {
    /**
     * Initalise new instance of Client
     * @param config The configuration for the Client api calls
     */
    constructor(config: Config) {
        super(config);
    }

    /**
     * Call an api endpoint
     * @param options the client options
     */
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

    /**
     * @ignore used for internal api calls
     */
    public _CallApi(
        options: CallApiOptions,
        callback?: (error: any, data?: any, response?: superagent.Response) => any
    ): superagent.SuperAgentRequest {
        const { url, method, pathParams, headers, query, formParams, body, contentTypes, acceptTypes } = options;

        return this.request(
            {
                url,
                method,
                headers,
                query,
                formParams,
                contentTypes: contentTypes || ["application/json"],
                acceptTypes: acceptTypes || ["application/json"],
                body,
                pathParams,
            },
            callback
        );
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
