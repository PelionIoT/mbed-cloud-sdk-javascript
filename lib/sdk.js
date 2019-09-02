"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./common/config");
var foundation_1 = require("./foundation");
var client_1 = require("./client/client");
/**
 * Top level Sdk instance
 */
var SDK = /** @class */ (function () {
    /**
     * Initalise a new instance of the Sdk class
     * @param config The configuration
     * @param client The client instance
     */
    function SDK(config, client) {
        var _this = this;
        if (config && config instanceof config_1.Config) {
            this.config = config;
        }
        else {
            this.config = new config_1.Config(config);
        }
        this.foundation = function () { return new foundation_1.Factory(_this.config); };
        this.client = client || new client_1.Client(this.config);
    }
    return SDK;
}());
exports.SDK = SDK;
//# sourceMappingURL=sdk.js.map