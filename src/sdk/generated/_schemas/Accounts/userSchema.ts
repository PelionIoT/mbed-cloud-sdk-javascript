import { Schema } from "../../../schema/schema";

export const userSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "User",

        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
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
                name: "marketingAccepted",
                apiName: "is_marketing_accepted",
                type: "boolean",
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
                type: "UserStatusEnum",
            },

            {
                name: "termsAccepted",
                apiName: "is_gtc_accepted",
                type: "boolean",
            },

            {
                name: "twoFactorAuthentication",
                apiName: "is_totp_enabled",
                type: "boolean",
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
                                name: "loginProfiles",
                                type: "Array<LoginProfile>",
                            },

                            {
                                name: "marketingAccepted",
                                type: "boolean",
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
                                name: "termsAccepted",
                                type: "boolean",
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
                        name: "id",
                        position: 0,
                        type: "string",
                    },
                ],
            },

            {
                name: "get",
                returnType: "Promise<User>",
                parameters: [
                    {
                        name: "id",
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
                        type: "ListOptions",
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
                                name: "loginProfiles",
                                type: "Array<LoginProfile>",
                            },

                            {
                                name: "marketingAccepted",
                                type: "boolean",
                            },

                            {
                                name: "phoneNumber",
                                type: "string",
                            },

                            {
                                name: "termsAccepted",
                                type: "boolean",
                            },

                            {
                                name: "twoFactorAuthentication",
                                type: "boolean",
                            },

                            {
                                name: "username",
                                type: "string",
                            },
                        ],
                    },

                    {
                        name: "id",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};