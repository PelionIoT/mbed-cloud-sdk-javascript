import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * SubtenantUserInvitation
 */
export class SubtenantUserInvitation extends EntityBase {
    /**
     * The UUID of the account the user is invited to.
     */
    public accountId?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * Email address of the invited user.
     */
    public email?: string;

    /**
     * Invitation expiration as UTC time RFC3339.
     */
    public expiration?: Date;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    /**
     * The UUID of the invited user.
     */
    public userId?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a SubtenantUserInvitation.
     * @returns Promise containing SubtenantUserInvitation.
     */
    public create(): Promise<SubtenantUserInvitation> {
        const body = {
            email: this.email,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUserInvitation>(
                    {
                        url: "/v3/accounts/{account-id}/user-invitations",
                        method: "POST",
                        pathParams: {
                            "account-id": this.accountId,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * deletes a SubtenantUserInvitation.
     * @returns Promise containing SubtenantUserInvitation.
     */
    public delete(): Promise<SubtenantUserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUserInvitation>(
                    {
                        url: "/v3/accounts/{account-id}/user-invitations/{invitation-id}",
                        method: "DELETE",
                        pathParams: {
                            "account-id": this.accountId,
                            "invitation-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a SubtenantUserInvitation.
     * @returns Promise containing SubtenantUserInvitation.
     */
    public get(): Promise<SubtenantUserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUserInvitation>(
                    {
                        url: "/v3/accounts/{account-id}/user-invitations/{invitation-id}",
                        method: "GET",
                        pathParams: {
                            "account-id": this.accountId,
                            "invitation-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
