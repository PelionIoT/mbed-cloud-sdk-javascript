import { Schema } from "../../../schema/schema";
export const identityProviderPublicKeySchema = () => {
    return Object.assign(new Schema(), {
        name: "IdentityProviderPublicKey",
        fields: [
            {
                name: "key",
                apiName: "key",
                type: "string",
            },
            {
                name: "kid",
                apiName: "kid",
                type: "string",
            },
        ],
    });
};
//# sourceMappingURL=identityProviderPublicKeySchema.js.map