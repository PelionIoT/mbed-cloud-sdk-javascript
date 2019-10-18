import * as superagent from "superagent";
import { SDKError } from "../legacy/common/sdkError";
import { Config } from "../common/config";
/**
 * @ignore internal base class for the Client
 */
export declare class SdkApiBase {
    private config;
    constructor(config: Config);
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
    private static buildUrl;
    protected request(options: {
        url: string;
        method: string;
        headers: {
            [key: string]: string;
        };
        pathParams: {};
        query: {};
        formParams: {};
        contentTypes: Array<string>;
        acceptTypes: Array<string>;
        body?: any;
        file?: boolean;
    }, callback?: (sdkError: SDKError, data: any) => any): superagent.SuperAgentRequest;
    protected complete(error: any, response: any, acceptHeader: string, callback?: (sdkError: SDKError, data: any) => any): void;
}
