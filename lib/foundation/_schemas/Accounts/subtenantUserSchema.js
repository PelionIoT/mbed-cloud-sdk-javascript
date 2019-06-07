"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../../../schema/schema");
exports.subtenantUserSchema = function () {
    return Object.assign(new schema_1.Schema(), {
        name: "SubtenantUser",
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
                type: "SubtenantUserStatus",
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
                returnType: "Promise<SubtenantUser>",
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
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "action",
                        position: 2,
                        type: "string",
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantUserId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<SubtenantUser>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantUserId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "update",
                returnType: "Promise<SubtenantUser>",
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
                        name: "accountId",
                        position: 1,
                        type: "string",
                    },
                    {
                        name: "subtenantUserId",
                        position: 2,
                        type: "string",
                    },
                ],
            },
            {
                name: "validateEmail",
                returnType: "Promise<SubtenantUser>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantUserId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=subtenantUserSchema.js.map