import * as superagent from "superagent";
import { SdkApiBase } from "./sdkApiBase";
import { Config } from "../common/config";
/**
 * Client, gives access to http client with supplied credentials
 */
export declare class Client extends SdkApiBase {
    /**
     * Initalise new instance of Client
     * @param config The configuration for the Client api calls
     */
    constructor(config: Config);
    /**
     * Call an api endpoint
     * @param options the client options
     */
    CallApi(options: CallApiOptions): Promise<any>;
    /**
     * @ignore used for internal api calls
     */
    _CallApi(options: CallApiOptions, callback?: (error: any, data?: any, response?: superagent.Response) => any): superagent.SuperAgentRequest;
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
export declare type Method = "GET" | "POST" | "PUT" | "DELETE";
