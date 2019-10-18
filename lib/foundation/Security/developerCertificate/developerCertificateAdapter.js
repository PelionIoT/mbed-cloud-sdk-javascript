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
 *DeveloperCertificate adapter
 */
var DeveloperCertificateAdapter = /** @class */ (function (_super) {
    __extends(DeveloperCertificateAdapter, _super);
    function DeveloperCertificateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeveloperCertificateAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeveloperCertificateAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVELOPER_CERTIFICATE",
            accountId: data.account_id,
            certificate: data.developer_certificate,
            createdAt: data.created_at,
            description: data.description,
            developerPrivateKey: data.developer_private_key,
            id: data.id,
            name: data.name,
            securityFileContent: data.security_file_content,
        });
        return mappedEntity;
    };
    return DeveloperCertificateAdapter;
}(adapter_1.Adapter));
exports.DeveloperCertificateAdapter = DeveloperCertificateAdapter;
//# sourceMappingURL=developerCertificateAdapter.js.map