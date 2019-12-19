import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantApiKey } from "./subtenantApiKey";
import { SubtenantApiKeyAdapter } from "../../index";
import { SubtenantApiKeyCreateRequest } from "./types";
import { SubtenantPolicyGroup } from "../../index";
import { SubtenantPolicyGroupAdapter } from "../../index";
import { SubtenantApiKeyUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *SubtenantApiKey repository
 */
export class SubtenantApiKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    public create(request: SubtenantApiKeyCreateRequest, accountId: string): Promise<SubtenantApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/api-keys",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
                        },
                        body: {
                            groups: request.groups,
                            name: request.name,
                            owner: request.owner,
                            status: request.status,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantApiKeyAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the API key to delete.
     */
    public delete(accountId: string, id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
                            apikey_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    /**
     * policyGroups
     * @param accountId - Account ID.
     * @param id - The ID of the API key.
     * @param options - options
     */
    public policyGroups(
        accountId: string,
        id: string,
        options?: ListOptions
    ): Paginator<SubtenantPolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<SubtenantPolicyGroup>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/api-keys/{apikey_id}/groups",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                account_id: accountId,
                                apikey_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<SubtenantPolicyGroup>, done) => {
                    done(null, new Page(data, data.data, SubtenantPolicyGroupAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    public read(accountId: string, id: string): Promise<SubtenantApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            apikey_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantApiKeyAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    public update(request: SubtenantApiKeyUpdateRequest, accountId: string, id: string): Promise<SubtenantApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                        method: "PUT",
                        pathParams: {
                            account_id: accountId,
                            apikey_id: id,
                        },
                        body: {
                            groups: request.groups,
                            name: request.name,
                            owner: request.owner,
                            status: request.status,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantApiKeyAdapter.fromApi(data, request));
            }
        );
    }
}
