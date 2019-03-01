import { Entity } from "common/entity";
/**
 *VerificationResponse
 */
export interface VerificationResponse extends Entity {
    /**
     *message
     */
    readonly message?: string;

    /**
     *successful
     */
    readonly successful?: boolean;
}
