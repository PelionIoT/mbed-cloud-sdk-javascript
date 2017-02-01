/// <reference types="superagent" />
import superagent = require('superagent');
export declare class ApiBase {
    private host;
    private apiKey;
    constructor(apiKey: string, host?: string);
    protected request(options: {
        url: string;
        method: string;
        headers: {};
        query: {};
        useFormData: boolean;
        formParams: {};
        json?: boolean;
        body?: any;
    }, callback?: Function): superagent.SuperAgentRequest;
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
}
