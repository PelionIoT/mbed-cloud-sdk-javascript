/**
 * Provisioning endpoints - provisioning certificates.
 * A provisioning certificate is used to associate an mbed Cloud account with a specific installation of a Factory Tool. The certificate needs to be downloaded using this API and placed into the appropriate directory of the Factory Tool. 
 *
 * OpenAPI spec version: 0.8
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import superagent = require('superagent');

let defaultBasePath = 'https://api.mbedcloud.com';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

/* tslint:disable:no-unused-variable */

export interface RequestOptions {
    auth?:{username?:string, password?:string};
    form?:any;
    formData?:any;
    method?:string;
    qs?:any;
    headers?:any;
    uri?:string;
    useQuerystring?: boolean;
    json?: boolean;
    encoding?: string | null;
    body?:any;
}

export function request(options:any, callback?:Function): superagent.SuperAgentRequest {
    var url = options.uri;

    // Normalize slashes in url
    url = url.replace(/([:])?\/+/g, function($0, $1) {
        return $1 ? $0: "/";
    });

    var request = superagent(options.method, url);

    if (options.auth && (options.auth.username || options.auth.password)) {
        request.auth(options.auth.username || '', options.auth.password || '');
    }

    // set query parameters
    request.query(normalizeParams(options.qs));

    // set header parameters
    request.set(normalizeParams(options.headers));

    // set request timeout
    request.timeout(60000);

    if (options.json) {
        request.type("application/json");
        request.accept("application/json");
    }

    if (options.form) {
        request.type("application/x-www-form-urlencoded");
        request.send(normalizeParams(options.form));
    } else if (options.formData) {
        request.type("multipart/form-data");
        var formParams = normalizeParams(options.formData);
        for (var key in formParams) {
            if (formParams.hasOwnProperty(key)) {
                if (isFileParam(formParams[key])) {
                    // file field
                    request.attach(key, formParams[key]);
                } else {
                    request.field(key, formParams[key]);
                }
            }
        }
    } else if (options.body) {
        request.send(options.body);
    }

    request.end(function(error, response) {
        if (callback) {
            var data = null;

            if (response && !error) {
                data = response.body || response.text;
            }

            callback(error, data, response);
        }
    });

    return request;
}

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
export function normalizeParams(params:any) {
    var newParams = {};

    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
            var value = params[key];
            if (isFileParam(value) || Array.isArray(value)) {
                newParams[key] = value;
            } else {
                newParams[key] = paramToString(value);
            }
        }
    }

    return newParams;
}

/**
* Checks whether the given parameter value represents file-like content.
* @param param The parameter to check.
* @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
*/
export function isFileParam(param:any) {
    // fs.ReadStream in Node.js (but not in runtime like browserify)
    if (typeof window === 'undefined' &&
        typeof require === 'function' &&
        require('fs') &&
        param instanceof require('fs').ReadStream) {
        return true;
    }

    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
        return true;
    }

    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
        return true;
    }

    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
        return true;
    }

    return false;
}

/**
* Returns a string representation for an actual parameter.
* @param param The actual parameter.
* @returns {String} The string representation of <code>param</code>.
*/
export function paramToString(param:any) {
    if (param == undefined || param == null) {
        return '';
    }

    if (param instanceof Date) {
        return param.toJSON();
    }

    return param.toString();
}

export class ProvisioningCertificate {
    /**
    * UTC time of the entity creation.
    */
    'createdAt': string;
    /**
    * The provisioning certificate.
    */
    'provisioning-context-certificate': string;
    /**
    * Entity ID.
    */
    'id': string;
    /**
    * Currently not used.
    */
    'etag': string;
    /**
    * Currently not used.
    */
    'object': string;
}


export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: RequestOptions): void;
}

export class HttpBasicAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: RequestOptions): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string;

    applyToRequest(requestOptions: RequestOptions): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string;

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: RequestOptions): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(_: RequestOptions): void {
        // Do nothing
    }
}

export enum DefaultApiApiKeys {
    Bearer,
}

export class DefaultApi {
    protected basePath = defaultBasePath;
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'Bearer': new ApiKeyAuth('header', 'Authorization'),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    public setApiKey(key: DefaultApiApiKeys, value: string) {
        this.authentications[DefaultApiApiKeys[key]].apiKey = value;
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * 
     * Gets the account&#39;s provisioning certificate.
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     */
    public v3ProvisioningCertificateGet (authorization: string, callback?: Function): superagent.SuperAgentRequest {
        const localVarPath = this.basePath + '/v3/provisioning-certificate';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'authorization' is not null or undefined
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling v3ProvisioningCertificateGet.');
        }

        headerParams['Authorization'] = authorization;

        let useFormData = false;

        let requestOptions: RequestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.Bearer.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        return request(requestOptions, (error, data, response) => {
            if (callback) {
                callback(error, data, response);
            }
        });
    }
}
