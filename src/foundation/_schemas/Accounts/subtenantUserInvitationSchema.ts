import { Schema } from "../../../schema/schema";

export const subtenantUserInvitationSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "SubtenantUserInvitation",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "email",
                apiName: "email",
                type: "string",
            },
            {
                name: "expiration",
                apiName: "expiration",
                type: "Date",
            },
            {
                name: "groups",
                apiName: "groups",
                type: "Array<string>",
            },
            {
                name: "loginProfiles",
                apiName: "login_profiles",
                type: "Array<LoginProfile>",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
            {
                name: "userId",
                apiName: "user_id",
                type: "string",
            },
        ],

        methods: [
            {
                name: "create",
                returnType: "Promise<SubtenantUserInvitation>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "email",
                                type: "string",
                            },
                            {
                                name: "groups",
                                type: "Array<string>",
                            },
                            {
                                name: "loginProfiles",
                                type: "Array<LoginProfile>",
                            },
                            {
                                name: "validForDays",
                                type: "number",
                            },
                        ],
                    },
                    {
                        name: "accountId",
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
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantUserInvitationId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<SubtenantUserInvitation>",
                parameters: [
                    {
                        name: "accountId",
                        position: 0,
                        type: "string",
                    },
                    {
                        name: "subtenantUserInvitationId",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
