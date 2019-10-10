"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.campaignDeviceMetadataSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "CampaignDeviceMetadata",
        fields: [
            {
                name: "campaignId",
                apiName: "campaign",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "deploymentState",
                apiName: "deployment_state",
                type: "CampaignDeviceMetadataDeploymentState",
            },
            {
                name: "description",
                apiName: "description",
                type: "string",
            },
            {
                name: "deviceId",
                apiName: "device_id",
                type: "string",
            },
            {
                name: "mechanism",
                apiName: "mechanism",
                type: "string",
            },
            {
                name: "mechanismUrl",
                apiName: "mechanism_url",
                type: "string",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "read",
                returnType: "Promise<CampaignDeviceMetadata>",
                parameters: [
                    {
                        name: "campaignId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "campaignDeviceMetadataId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=campaignDeviceMetadataSchema.js.map