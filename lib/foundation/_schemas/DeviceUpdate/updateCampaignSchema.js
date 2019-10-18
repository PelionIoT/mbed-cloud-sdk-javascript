"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.updateCampaignSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "UpdateCampaign",
        fields: [
            {
                name: "autostopReason",
                apiName: "autostop_reason",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "description",
                apiName: "description",
                type: "string",
            },
            {
                name: "deviceFilter",
                apiName: "device_filter",
                type: "string",
            },
            {
                name: "deviceFilterHelper",
                apiName: "device_filter_helper",
                type: "{ [key: string]: string }",
            },
            {
                name: "finished",
                apiName: "finished",
                type: "Date",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "phase",
                apiName: "phase",
                type: "string",
            },
            {
                name: "rootManifestId",
                apiName: "root_manifest_id",
                type: "string",
            },
            {
                name: "rootManifestUrl",
                apiName: "root_manifest_url",
                type: "string",
            },
            {
                name: "startedAt",
                apiName: "started_at",
                type: "Date",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
            {
                name: "when",
                apiName: "when",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "archive",
                returnType: "Promise<UpdateCampaign>",
                parameters: [
                    {
                        name: "updateCampaignId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "create",
                returnType: "Promise<UpdateCampaign>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "deviceFilter",
                                type: "string",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "rootManifestId",
                                type: "string",
                            },
                            {
                                name: "when",
                                type: "Date",
                            },
                        ],
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "updateCampaignId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "deviceMetadata",
                returnType: "Paginator<CampaignDeviceMetadata, ListOptions>",
                parameters: [
                    {
                        name: "updateCampaignId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<UpdateCampaign, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "UpdateCampaignFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<UpdateCampaign>",
                parameters: [
                    {
                        name: "updateCampaignId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "start",
                returnType: "Promise<UpdateCampaign>",
                parameters: [
                    {
                        name: "updateCampaignId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "stop",
                returnType: "Promise<UpdateCampaign>",
                parameters: [
                    {
                        name: "updateCampaignId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<UpdateCampaign>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "deviceFilter",
                                type: "string",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                            {
                                name: "rootManifestId",
                                type: "string",
                            },
                            {
                                name: "when",
                                type: "Date",
                            },
                        ],
                    },
                    {
                        name: "updateCampaignId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=updateCampaignSchema.js.map