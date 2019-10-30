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
 *SubtenantDarkThemeImage adapter
 */
var SubtenantDarkThemeImageAdapter = /** @class */ (function (_super) {
    __extends(SubtenantDarkThemeImageAdapter, _super);
    function SubtenantDarkThemeImageAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    SubtenantDarkThemeImageAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = SubtenantDarkThemeImageAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_DARK_THEME_IMAGE",
            reference: data.reference,
            staticUri: data.static_uri,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return SubtenantDarkThemeImageAdapter;
}(adapter_1.Adapter));
exports.SubtenantDarkThemeImageAdapter = SubtenantDarkThemeImageAdapter;
//# sourceMappingURL=subtenantDarkThemeImageAdapter.js.map