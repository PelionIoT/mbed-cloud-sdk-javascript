import { SdkApiBase } from "./sdkApiBase";
/**
 * Client, gives access to http client with supplied credentials
 */
export class Client extends SdkApiBase {
    /**
     * Initalise new instance of Client
     * @param config The configuration for the Client api calls
     */
    constructor(config) {
        super(config);
    }
    /**
     * Call an api endpoint
     * @param options the client options
     */
    CallApi(options) {
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
    _CallApi(options, callback) {
        const { url, method, pathParams, headers, query, formParams, body, contentTypes, acceptTypes } = options;
        return this.request({
            url: url,
            method: method,
            headers: headers,
            query: query,
            formParams: formParams,
            contentTypes: contentTypes || ["application/json"],
            acceptTypes: acceptTypes || ["application/json"],
            body: body,
            pathParams: pathParams,
        }, callback);
    }
}
//# sourceMappingURL=client.js.map