import { Adapter } from "../../../common/adapter";
import { VerificationResponse } from "./verificationResponse";
/**
 *VerificationResponse adapter
 */
export class VerificationResponseAdapter extends Adapter {
    public static fromApi(data: any, instance?: VerificationResponse): VerificationResponse {
        return VerificationResponseAdapter.assignDefined<VerificationResponse>(instance || {}, {
            message: data.message,
            successful: data.successful,
        });
    }
}
