import { EntityBase } from "../../../common/entityBase";

/**
 * VerificationResponse
 */
export class VerificationResponse extends EntityBase {
    /**
     * Provides details in case of failure.
     */
    public message?: string;

    /**
     * Indicates whether the certificate issuer was verified successfully.
     */
    public successful?: boolean;
}
