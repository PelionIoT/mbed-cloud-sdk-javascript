import { Schema } from "../../../../src/sdk/schema/schema";

export const userSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "User",
        fields: [
            {
                name: "id",
                apiName: "id",
                type: "string",
            },
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
        ],
        methods: [
            {
                name: "get",
                returnType: "User",
                parameters: [
                    {
                        name: "id",
                        position: 0,
                        type: "string"
                    }
                ]
            },
            {
                name: "create",
                returnType: "User",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "email",
                                type: "string"
                            },
                            {
                                name: "groups",
                                type: "Array<string>"
                            },
                            {
                                name: "username",
                                type: "string"
                            },
                            {
                                name: "phoneNumber",
                                type: "string"
                            },
                            {
                                name: "address",
                                type: "string"
                            },
                            {
                                name: "fullName",
                                type: "string"
                            },
                            {
                                name: "termsAccepted",
                                type: "boolean"
                            },
                            {
                                name: "marketingAccepted",
                                type: "boolean"
                            },
                        ]
                    },
                    {
                        name: "action",
                        position: 1,
                        type: "string"
                    },
                ]
            },
            {
                name: "delete",
                returnType: "void",
                parameters: [
                    {
                        name: "id",
                        position: 0,
                        type: "string"
                    }
                ]
            },
            {
                name: "list",
                returnType: "Paginator<User, ListOptions>",
                parameters: [
                    {
                        name: "id",
                        position: 0,
                        type: "ListOptions"
                    }
                ]
            },
            {
                name: "update",
                returnType: "User",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "UserUpdateRequest"
                    },
                    {
                        name: "id",
                        position: 1,
                        type: "string"
                    },
                ]
            },
        ]
    });
};
