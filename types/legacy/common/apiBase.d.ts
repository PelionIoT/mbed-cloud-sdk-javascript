import * as superagent from "superagent";
import { SDKError } from "./sdkError";
import { ConnectionOptions } from "./interfaces";
/**
 * Base class for a legacy api module
 * @ignore
 */
export declare class ApiBase {
    private responseHandler;
    private readonly ENV_API_KEY;
    private readonly ENV_HOST;
    private readonly apiKey;
    private readonly host;
    constructor(options?: ConnectionOptions, responseHandler?: (sdkError: SDKError, response: superagent.Response) => any);
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
    private static normalizeParams;
    /**
     * Checks whether the given parameter value represents file-like content.
     * @param param The parameter to check.
     * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
     */
    private static isFileParam;
    /**
     * Returns a string representation for an actual parameter.
     * @param param The actual parameter.
     * @returns {String} The string representation of <code>param</code>.
     */
    private static paramToString;
    private static chooseType;
    private static debugLog;
    /**
     * Returns the current configuration of this API module
     */
    currentConfig(): {
        apiKey: any;
        host: any;
    };
    protected request<T>(options: {
        url: string;
        method: string;
        headers: {
            [key: string]: string;
        };
        query: {};
        formParams: {};
        useFormData: boolean;
        contentTypes: Array<string>;
        acceptTypes: Array<string>;
        requestOptions?: {
            [key: string]: any;
        };
        body?: any;
        file?: boolean;
    }, callback?: (sdkError: SDKError, data: T) => any): superagent.SuperAgentRequest;
    protected complete(error: any, response: any, acceptHeader: string, callback?: (sdkError: SDKError, data: any) => any): void;
}
