import { Schema } from "../../../schema/schema";
export const deviceEnrollmentSchema = () => {
    return Object.assign(new Schema(), {
        name: "DeviceEnrollment",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "claimedAt",
                apiName: "claimed_at",
                type: "Date",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "enrolledDeviceId",
                apiName: "enrolled_device_id",
                type: "string",
            },
            {
                name: "enrollmentIdentity",
                apiName: "enrollment_identity",
                type: "string",
            },
            {
                name: "expiresAt",
                apiName: "expires_at",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<DeviceEnrollment>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "enrollmentIdentity",
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
                        name: "deviceEnrollmentId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<DeviceEnrollment, ListOptions>",
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
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeviceEnrollment>",
                parameters: [
                    {
                        name: "deviceEnrollmentId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=deviceEnrollmentSchema.js.map