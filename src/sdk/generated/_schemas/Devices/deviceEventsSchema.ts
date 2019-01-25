import { Schema } from "../../../schema/schema";

export const deviceEventsSchema = (): Schema => {
    return Object.assign(new Schema(), {
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
                name: "get",
                returnType: "Promise<DeviceEvents>",
                parameters: [
                    {
                        name: "device_events_id",
                        position: 0,
                        type: "string",
                    },
                ],
            },
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
                        ],
                    },
                ],
            },
        ],
    });
};
