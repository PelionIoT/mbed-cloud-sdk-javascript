"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.serverCredentialsSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "ServerCredentials",
        fields: [
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "serverCertificate",
                apiName: "server_certificate",
                type: "string",
            },
            {
                name: "serverUri",
                apiName: "server_uri",
                type: "string",
            },
        ],
        methods: [
            {
                name: "getBootstrap",
                returnType: "Promise<ServerCredentials>",
                parameters: [],
            },
            {
                name: "getLwm2m",
                returnType: "Promise<ServerCredentials>",
                parameters: [],
            },
        ],
    });
};
//# sourceMappingURL=serverCredentialsSchema.js.map