import { Adapter } from "../../../common/adapter";
/**
 *VerificationResponse adapter
 */
export class VerificationResponseAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = VerificationResponseAdapter.assignDefined(instance || {}, {
            _discriminator: "VERIFICATION_RESPONSE",
            message: data.message,
            successful: data.successful,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=verificationResponseAdapter.js.map