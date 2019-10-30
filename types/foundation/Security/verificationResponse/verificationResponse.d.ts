import { Entity } from "../../../common/entity";
/**
 *VerificationResponse
 */
export interface VerificationResponse extends Entity {
    /**
*Provides details in case of failure.

*@example message describing the verification failure
*/
    readonly message?: string;
    /**
*Indicates whether the certificate issuer was verified successfully.

*/
    readonly successful?: boolean;
}
