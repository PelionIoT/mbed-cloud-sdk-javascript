import { Schema } from "../../../schema/schema";

export const updateCampaignSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "UpdateCampaign",
        fields: [
            {
                name: "activeAt",
                apiName: "active_at",
                type: "Date",
            },
            {
                name: "approvalRequired",
                apiName: "approval_required",
                type: "boolean",
            },
            {
                name: "archivedAt",
                apiName: "archived_at",
                type: "Date",
            },
            {
                name: "autostop",
                apiName: "autostop",
                type: "boolean",
            },
            {
                name: "autostopReason",
                apiName: "autostop_reason",
                type: "string",
            },
            {
                name: "autostopSuccessPercent",
                apiName: "autostop_success_percent",
                type: "number",
            },
            {
                name: "campaignStrategy",
                apiName: "campaign_strategy",
                type: "UpdateCampaignStrategy",
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
                type: "UpdateCampaignPhase",
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
                name: "startingAt",
                apiName: "starting_at",
                type: "Date",
            },
            {
                name: "stoppedAt",
                apiName: "stopped_at",
                type: "Date",
            },
            {
                name: "stoppingAt",
                apiName: "stopping_at",
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
                                name: "approvalRequired",
                                type: "boolean",
                            },
                            {
                                name: "autostop",
                                type: "boolean",
                            },
                            {
                                name: "autostopSuccessPercent",
                                type: "number",
                            },
                            {
                                name: "campaignStrategy",
                                type: "UpdateCampaignStrategy",
                            },
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
                                name: "approvalRequired",
                                type: "boolean",
                            },
                            {
                                name: "autostop",
                                type: "boolean",
                            },
                            {
                                name: "autostopSuccessPercent",
                                type: "number",
                            },
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
