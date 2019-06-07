import { Schema } from "../../../schema/schema";
export const userSchema = () => {
    return Object.assign(new Schema(), {
        name: "User",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "activeSessions",
                apiName: "active_sessions",
                type: "Array<ActiveSession>",
            },
            {
                name: "address",
                apiName: "address",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "creationTime",
                apiName: "creation_time",
                type: "number",
            },
            {
                name: "customFields",
                apiName: "custom_fields",
                type: "{ [key: string]: string }",
            },
            {
                name: "email",
                apiName: "email",
                type: "string",
            },
            {
                name: "emailVerified",
                apiName: "email_verified",
                type: "boolean",
            },
            {
                name: "fullName",
                apiName: "full_name",
                type: "string",
            },
            {
                name: "isGtcAccepted",
                apiName: "is_gtc_accepted",
                type: "boolean",
            },
            {
                name: "isMarketingAccepted",
                apiName: "is_marketing_accepted",
                type: "boolean",
            },
            {
                name: "isTotpEnabled",
                apiName: "is_totp_enabled",
                type: "boolean",
            },
            {
                name: "lastLoginTime",
                apiName: "last_login_time",
                type: "number",
            },
            {
                name: "loginHistory",
                apiName: "login_history",
                type: "Array<LoginHistory>",
            },
            {
                name: "loginProfiles",
                apiName: "login_profiles",
                type: "Array<LoginProfile>",
            },
            {
                name: "password",
                apiName: "password",
                type: "string",
            },
            {
                name: "passwordChangedTime",
                apiName: "password_changed_time",
                type: "number",
            },
            {
                name: "phoneNumber",
                apiName: "phone_number",
                type: "string",
            },
            {
                name: "status",
                apiName: "status",
                type: "UserStatus",
            },
            {
                name: "totpScratchCodes",
                apiName: "totp_scratch_codes",
                type: "Array<string>",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
            {
                name: "username",
                apiName: "username",
                type: "string",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<User>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "address",
                                type: "string",
                            },
                            {
                                name: "email",
                                type: "string",
                            },
                            {
                                name: "fullName",
                                type: "string",
                            },
                            {
                                name: "isGtcAccepted",
                                type: "boolean",
                            },
                            {
                                name: "isMarketingAccepted",
                                type: "boolean",
                            },
                            {
                                name: "loginProfiles",
                                type: "Array<LoginProfile>",
                            },
                            {
                                name: "password",
                                type: "string",
                            },
                            {
                                name: "phoneNumber",
                                type: "string",
                            },
                            {
                                name: "username",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "action",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "userId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<User, ListOptions>",
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
                                type: "UserFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<User>",
                parameters: [
                    {
                        name: "userId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<User>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "address",
                                type: "string",
                            },
                            {
                                name: "fullName",
                                type: "string",
                            },
                            {
                                name: "isGtcAccepted",
                                type: "boolean",
                            },
                            {
                                name: "isMarketingAccepted",
                                type: "boolean",
                            },
                            {
                                name: "isTotpEnabled",
                                type: "boolean",
                            },
                            {
                                name: "loginProfiles",
                                type: "Array<LoginProfile>",
                            },
                            {
                                name: "phoneNumber",
                                type: "string",
                            },
                            {
                                name: "username",
                                type: "string",
                            },
                        ],
                    },
                    {
                        name: "userId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=userSchema.js.map