import { Entity } from "../../../common/entity";
/**
 *ActiveSession
 */
export interface ActiveSession extends Entity {
    /**
     *The UUID of the account.
     *@example 01619571e2e90242ac12000600000000
     */
    readonly accountId?: string;
    /**
     *IP address of the client.
     *@example 127.0.0.1
     */
    readonly ipAddress?: string;
    /**
     *The login time of the user.
     *@example 2018-02-14T17:52:07Z
     */
    readonly loginTime?: Date;
    /**
     *The reference token.
     *@example rt_CI6+5hS8p9DrCmkRyS6u4doUdiXr71dX7MqD+g0327hYQthEkYTxMMnCwHyf1rDdk
     */
    readonly referenceToken?: string;
    /**
     *User Agent header from the login request.
     *@example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36
     */
    readonly userAgent?: string;
}
