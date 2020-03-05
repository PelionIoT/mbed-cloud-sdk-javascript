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
var observer_1 = require("./observer");
var MasterObserver = /** @class */ (function (_super) {
    __extends(MasterObserver, _super);
    function MasterObserver() {
        return _super.call(this) || this;
    }
    /**
     * Stop this observer from receiving notifications
     */
    MasterObserver.prototype.unsubscribe = function () {
        _super.prototype.clearListeners.call(this);
    };
    return MasterObserver;
}(observer_1.Observer));
exports.MasterObserver = MasterObserver;
//# sourceMappingURL=masterObserver.js.map