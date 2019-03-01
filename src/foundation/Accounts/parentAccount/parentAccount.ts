import { Entity } from "common/entity";
/**
 *ParentAccount
 */
export interface ParentAccount extends Entity {
    /**
     *adminEmail
     */
    readonly adminEmail?: string;

    /**
     *adminName
     */
    readonly adminName?: string;
}
