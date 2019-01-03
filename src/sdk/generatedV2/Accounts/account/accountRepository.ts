import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Account } from "./account";
import { AccountCreateRequest } from "./types";
import { AccountAdapter } from "./accountAdapter";
import { SubtenantTrustedCertificate } from "../../Accounts/subtenantTrustedCertificate";
import { SubtenantTrustedCertificateAdapter } from "../../Accounts/subtenantTrustedCertificate/subtenantTrustedCertificateAdapter";
import { AccountUpdateRequest } from "./types";
import { SubtenantUserInvitation } from "../../Accounts/subtenantUserInvitation";
import { SubtenantUserInvitationAdapter } from "../../Accounts/subtenantUserInvitation/subtenantUserInvitationAdapter";
import { SubtenantUser } from "../../Accounts/subtenantUser";
import { SubtenantUserAdapter } from "../../Accounts/subtenantUser/subtenantUserAdapter";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions, OrderEnum } from "../../../../common/interfaces";
/**
 *Account repository
 */
export class AccountRepository extends Repository {
    public create(request: AccountCreateRequest, action?: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts",
                        method: "POST",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string, options?: { include?: string; properties?: string }): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public list(options?: {
        after?: string;
        format?: string;
        include?: string;
        limit?: number;
        order?: OrderEnum;
        properties?: string;
    }): Paginator<Account, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Account>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/accounts",
                            method: "GET",
                            query: { after, include, order, limit },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<Account>, done) => {
                    done(null, new ListResponse(data, data.data, AccountAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public me(options?: { include?: string; properties?: string }): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/me",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public trustedCertificates(
        id: string,
        options?: { after?: string; include?: string; limit?: number; order?: OrderEnum }
    ): Paginator<Account, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantTrustedCertificate>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/trusted-certificates",
                            method: "GET",
                            query: { after, include, order, limit },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantTrustedCertificate>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantTrustedCertificateAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public update(request: AccountUpdateRequest, id: string): Promise<Account> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}",
                        method: "PUT",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public userInvitations(
        id: string,
        options?: { after?: string; limit?: number; order?: OrderEnum }
    ): Paginator<Account, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantUserInvitation>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/user-invitations",
                            method: "GET",
                            query: { after, include, order, limit },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantUserInvitation>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantUserInvitationAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public users(
        id: string,
        options?: { after?: string; include?: string; limit?: number; order?: OrderEnum }
    ): Paginator<Account, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantUser>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/users",
                            method: "GET",
                            query: { after, include, order, limit },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantUser>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantUserAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}
