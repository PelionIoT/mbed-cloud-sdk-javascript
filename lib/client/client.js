"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sdkApiBase_1 = require("./sdkApiBase");
/**
 * Client, gives access to http client with supplied credentials
 */
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    /**
     * Initalise new instance of Client
     * @param config The configuration for the Client api calls
     */
    function Client(config) {
        return _super.call(this, config) || this;
    }
    /**
     * Call an api endpoint
     * @param options the client options
     */
    Client.prototype.CallApi = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._CallApi(options, function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    };
    /**
     * @ignore used for internal api calls
     */
    Client.prototype._CallApi = function (options, callback) {
        var url = options.url, method = options.method, pathParams = options.pathParams, headers = options.headers, query = options.query, formParams = options.formParams, body = options.body, contentTypes = options.contentTypes, acceptTypes = options.acceptTypes;
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
    };
    return Client;
}(sdkApiBase_1.SdkApiBase));
exports.Client = Client;
//# sourceMappingURL=client.js.map