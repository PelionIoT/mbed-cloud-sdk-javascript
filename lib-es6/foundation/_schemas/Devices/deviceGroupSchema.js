import { Schema } from "../../../schema/schema";
export const deviceGroupSchema = () => {
    return Object.assign(new Schema(), {
        name: "DeviceGroup",
        fields: [
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "customAttributes",
                apiName: "custom_attributes",
                type: "{ [key: string]: string }",
            },
            {
                name: "description",
                apiName: "description",
                type: "string",
            },
            {
                name: "devicesCount",
                apiName: "devices_count",
                type: "number",
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
                name: "addDevice",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "deviceId",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "deviceGroupId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "create",
                returnType: "Promise<DeviceGroup>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "customAttributes",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "name",
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
                        name: "deviceGroupId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "devices",
                returnType: "Paginator<Device, ListOptions>",
                parameters: [
                    {
                        name: "deviceGroupId",
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
                            {
                                name: "filter",
                                type: "DeviceGroupFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<DeviceGroup, ListOptions>",
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
                                type: "DeviceGroupFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeviceGroup>",
                parameters: [
                    {
                        name: "deviceGroupId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "removeDevice",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "deviceId",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "deviceGroupId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<DeviceGroup>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "customAttributes",
                                type: "{ [key: string]: string }",
                            },
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "deviceGroupId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=deviceGroupSchema.js.map