import { Schema } from "../../../schema/schema";
export const serverCredentialsSchema = () => {
    return Object.assign(new Schema(), {
        name: "ServerCredentials",
        fields: [
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "serverCertificate",
                apiName: "server_certificate",
                type: "string",
            },
            {
                name: "serverUri",
                apiName: "server_uri",
                type: "string",
            },
        ],
        methods: [
            {
                name: "getBootstrap",
                returnType: "Promise<ServerCredentials>",
                parameters: [],
            },
            {
                name: "getLwm2m",
                returnType: "Promise<ServerCredentials>",
                parameters: [],
            },
        ],
    });
};
//# sourceMappingURL=serverCredentialsSchema.js.map