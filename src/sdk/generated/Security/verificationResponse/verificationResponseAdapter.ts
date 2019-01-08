import { Adapter } from "../../../common/adapter";
import { VerificationResponse } from "./verificationResponse";
/**
 *VerificationResponse adapter
 */
export class VerificationResponseAdapter extends Adapter {
    public static fromApi(data: any, instance?: VerificationResponse): VerificationResponse {
        if (!data) {
            return null;
        }
        const mappedEntity = VerificationResponseAdapter.assignDefined<VerificationResponse>(instance || {}, {
            _discriminator: "VERIFICATION_RESPONSE",
            message: data.message,
            successful: data.successful,
        });
        return mappedEntity;
    }
}
