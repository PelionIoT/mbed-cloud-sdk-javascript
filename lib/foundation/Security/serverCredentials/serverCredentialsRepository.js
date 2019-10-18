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
 *ServerCredentials repository
 */
var ServerCredentialsRepository = /** @class */ (function (_super) {
    __extends(ServerCredentialsRepository, _super);
    function ServerCredentialsRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * getBootstrap
     */
    ServerCredentialsRepository.prototype.getBootstrap = function () {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/server-credentials/bootstrap",
                method: "GET",
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.ServerCredentialsAdapter.fromApi(data));
        });
    };
    /**
     * getLwm2m
     */
    ServerCredentialsRepository.prototype.getLwm2m = function () {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/server-credentials/lwm2m",
                method: "GET",
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.ServerCredentialsAdapter.fromApi(data));
        });
    };
    return ServerCredentialsRepository;
}(repository_1.Repository));
exports.ServerCredentialsRepository = ServerCredentialsRepository;
//# sourceMappingURL=serverCredentialsRepository.js.map