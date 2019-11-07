import { Schema } from "../../../schema/schema";
export const developerCertificateSchema = () => {
    return Object.assign(new Schema(), {
        name: "DeveloperCertificate",
        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },
            {
                name: "certificate",
                apiName: "developer_certificate",
                type: "string",
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
                name: "developerPrivateKey",
                apiName: "developer_private_key",
                type: "string",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "securityFileContent",
                apiName: "security_file_content",
                type: "string",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<DeveloperCertificate>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",
                        subParams: [
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
                        name: "developerCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "getTrustedCertificateInfo",
                returnType: "Promise<TrustedCertificate>",
                parameters: [
                    {
                        name: "developerCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<DeveloperCertificate>",
                parameters: [
                    {
                        name: "developerCertificateId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=developerCertificateSchema.js.map