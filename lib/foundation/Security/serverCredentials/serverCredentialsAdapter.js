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
var adapter_1 = require("../../../common/adapter");
/**
 *ServerCredentials adapter
 */
var ServerCredentialsAdapter = /** @class */ (function (_super) {
    __extends(ServerCredentialsAdapter, _super);
    function ServerCredentialsAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    ServerCredentialsAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = ServerCredentialsAdapter.assignDefined(instance || {}, {
            _discriminator: "SERVER_CREDENTIALS",
            createdAt: data.created_at,
            id: data.id,
            serverCertificate: data.server_certificate,
            serverUri: data.server_uri,
        });
        return mappedEntity;
    };
    return ServerCredentialsAdapter;
}(adapter_1.Adapter));
exports.ServerCredentialsAdapter = ServerCredentialsAdapter;
//# sourceMappingURL=serverCredentialsAdapter.js.map