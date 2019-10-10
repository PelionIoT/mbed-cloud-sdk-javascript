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
 *LightThemeColor adapter
 */
var LightThemeColorAdapter = /** @class */ (function (_super) {
    __extends(LightThemeColorAdapter, _super);
    function LightThemeColorAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    LightThemeColorAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = LightThemeColorAdapter.assignDefined(instance || {}, {
            _discriminator: "LIGHT_THEME_COLOR",
            color: data.color,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return LightThemeColorAdapter;
}(adapter_1.Adapter));
exports.LightThemeColorAdapter = LightThemeColorAdapter;
//# sourceMappingURL=lightThemeColorAdapter.js.map