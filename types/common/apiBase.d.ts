import superagent = require("superagent");
import { SDKError } from "./sdkError";
export declare class ApiBase {
    private host;
    private responseHandler;
    private apiKey;
    constructor(apiKey?: string, host?: string, responseHandler?: (sdkError: SDKError, response: superagent.Response) => any);
    /**
     * Normalizes parameter values:
     * <ul>
     * <li>remove nils</li>
     * <li>keep files and arrays</li>
     * <li>format to string with `paramToString` for other cases</li>
     * </ul>
     * @param {Object.<String, Object>} params The parameters as object properties.
     * @returns {Object.<String, Object>} normalized parameters.
     */
    private static normalizeParams(params);
    /**
     * Checks whether the given parameter value represents file-like content.
     * @param param The parameter to check.
     * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
     */
    private static isFileParam(param);
    /**
     * Returns a string representation for an actual parameter.
     * @param param The actual parameter.
     * @returns {String} The string representation of <code>param</code>.
     */
    private static paramToString(param);
    protected request<T>(options: {
        url: string;
        method: string;
        headers: {
            [key: string]: string;
        };
        query: {};
        useFormData: boolean;
        formParams: {};
        json?: boolean;
        body?: any;
    }, callback?: (sdkError: SDKError, data: T) => any): superagent.SuperAgentRequest;
    protected complete(error: any, response: any, json: boolean, callback?: (sdkError: SDKError, data) => any): void;
}
