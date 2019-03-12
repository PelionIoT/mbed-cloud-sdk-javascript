import { Adapter } from "../../../common/adapter";
import { VerificationResponse } from "./verificationResponse";
/**
 *VerificationResponse adapter
 */
export class VerificationResponseAdapter extends Adapter {
    /**
     * fromApi
     * @returns VerificationResponse
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): VerificationResponse {
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
