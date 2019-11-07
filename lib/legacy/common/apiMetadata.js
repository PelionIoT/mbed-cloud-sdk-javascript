"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal class used for reporting metadata of last api call
 * @ignore
 */
var ApiMetadata = /** @class */ (function () {
    function ApiMetadata(statusCode, errorMessage, headers, body, request) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        if (headers) {
            this.headers = headers;
            this.date = headers.date ? new Date(headers.date) : new Date();
            this.requestId = headers["x-request-id"];
        }
        if (body) {
            this.object = body.object;
            this.etag = body.etag;
        }
        if (request) {
            this.method = request.method;
            this.url = request.url;
        }
    }
    return ApiMetadata;
}());
exports.ApiMetadata = ApiMetadata;
//# sourceMappingURL=apiMetadata.js.map