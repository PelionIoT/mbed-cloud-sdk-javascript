import { Schema } from "../../../schema/schema";
export const verificationResponseSchema = () => {
    return Object.assign(new Schema(), {
        name: "VerificationResponse",
        fields: [
            {
                name: "message",
                apiName: "message",
                type: "string",
            },
            {
                name: "successful",
                apiName: "successful",
                type: "boolean",
            },
        ],
    });
};
//# sourceMappingURL=verificationResponseSchema.js.map