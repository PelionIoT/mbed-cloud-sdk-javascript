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
var repository_1 = require("../../../common/repository");
var functions_1 = require("../../../legacy/common/functions");
var index_1 = require("../../index");
/**
 *SubtenantLightThemeImage repository
 */
var SubtenantLightThemeImageRepository = /** @class */ (function (_super) {
    __extends(SubtenantLightThemeImageRepository, _super);
    function SubtenantLightThemeImageRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Name of the branding images (icon or picture).
     */
    SubtenantLightThemeImageRepository.prototype.delete = function (accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/light/{reference}/clear",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantLightThemeImageAdapter.fromApi(data));
        });
    };
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Name of the image.
     */
    SubtenantLightThemeImageRepository.prototype.read = function (accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/light/{reference}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantLightThemeImageAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param accountId - Account ID.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    SubtenantLightThemeImageRepository.prototype.update = function (accountId, image, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/light/{reference}/upload-multipart",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
                formParams: {
                    image: image,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantLightThemeImageAdapter.fromApi(data));
        });
    };
    return SubtenantLightThemeImageRepository;
}(repository_1.Repository));
exports.SubtenantLightThemeImageRepository = SubtenantLightThemeImageRepository;
//# sourceMappingURL=subtenantLightThemeImageRepository.js.map