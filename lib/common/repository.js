"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var client_1 = require("../client/client");
/**
 * Abstract base class for a repository
 */
var Repository = /** @class */ (function () {
    /**
     * Initalise a new instance of the repository
     * @param config The configuration to use, if null then repository will initalise its own using dotenv
     * @param client The client instance to use
     */
    function Repository(config, client) {
        if (config && config instanceof config_1.Config) {
            this.config = config;
        }
        else {
            this.config = new config_1.Config(config);
        }
        this.client = client || new client_1.Client(this.config);
    }
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map