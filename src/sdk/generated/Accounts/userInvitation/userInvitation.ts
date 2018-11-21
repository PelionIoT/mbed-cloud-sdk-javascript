import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * UserInvitation
 */
export class UserInvitation extends EntityBase {
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
     * creates a UserInvitation.
     * @returns Promise containing UserInvitation.
     */
    public create(): Promise<UserInvitation> {
        const body = {
            email: this.email,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<UserInvitation>(
                    {
                        url: "/v3/user-invitations",
                        method: "POST",
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
     * deletes a UserInvitation.
     * @returns Promise containing UserInvitation.
     */
    public delete(): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<UserInvitation>(
                    {
                        url: "/v3/user-invitations/{invitation-id}",
                        method: "DELETE",
                        pathParams: {
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
     * gets a UserInvitation.
     * @returns Promise containing UserInvitation.
     */
    public get(): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<UserInvitation>(
                    {
                        url: "/v3/user-invitations/{invitation-id}",
                        method: "GET",
                        pathParams: {
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
     * List UserInvitations
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<UserInvitation, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<UserInvitation>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<UserInvitation>(
                        {
                            url: "/v3/user-invitations",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        UserInvitation,
                        resultsFn
                    );
                },
                (data: ListResponse<UserInvitation>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}
