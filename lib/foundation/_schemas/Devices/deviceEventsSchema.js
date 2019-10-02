"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.deviceEventsSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "DeviceEvents",
        fields: [
            {
                name: "changes",
                apiName: "changes",
                type: "{ [key: string]: string }",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "data",
                apiName: "data",
                type: "{ [key: string]: string }",
            },
            {
                name: "dateTime",
                apiName: "date_time",
                type: "Date",
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
                name: "eventType",
                apiName: "event_type",
                type: "string",
            },
            {
                name: "eventTypeCategory",
                apiName: "event_type_category",
                type: "string",
            },
            {
                name: "eventTypeDescription",
                apiName: "event_type_description",
                type: "string",
            },
            {
                name: "stateChange",
                apiName: "state_change",
                type: "boolean",
            },
        ],
        methods: [
            {
                name: "list",
                returnType: "Paginator<DeviceEvents, ListOptions>",
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
                                type: "DeviceEventsFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeviceEvents>",
                parameters: [
                    {
                        name: "deviceEventsId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=deviceEventsSchema.js.map