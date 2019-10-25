"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.campaignStatisticsEventsSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "CampaignStatisticsEvents",
        fields: [
            {
                name: "campaignId",
                apiName: "campaign_id",
                type: "string",
            },
            {
                name: "count",
                apiName: "count",
                type: "number",
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
                name: "eventType",
                apiName: "event_type",
                type: "string",
            },
            {
                name: "summaryStatus",
                apiName: "summary_status",
                type: "string",
            },
            {
                name: "summaryStatusId",
                apiName: "summary_status_id",
                type: "string",
            },
        ],
        methods: [
            {
                name: "read",
                returnType: "Promise<CampaignStatisticsEvents>",
                parameters: [
                    {
                        name: "campaignId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "campaignStatisticsEventsId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "summaryStatusId",
                        position: 2,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=campaignStatisticsEventsSchema.js.map