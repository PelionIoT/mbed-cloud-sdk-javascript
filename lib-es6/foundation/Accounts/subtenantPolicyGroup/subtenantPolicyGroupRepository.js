import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantApiKeyAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { SubtenantPolicyGroupAdapter } from "../../index";
import { SubtenantUserAdapter } from "../../index";
import { Paginator, Page } from "../../../index";
/**
 *SubtenantPolicyGroup repository
 */
export class SubtenantPolicyGroupRepository extends Repository {
    /**
     * apiKeys
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve API keys for.
     * @param options - options
     */
    apiKeys(accountId, id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/policy-groups/{group_id}/api-keys",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: accountId,
                        group_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, SubtenantApiKeyAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * list
     * @param accountId - Account ID.
     * @param options - Options to use for the List
     */
    list(accountId, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/policy-groups",
                    method: "GET",
                    query: {
                        name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: accountId,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, SubtenantPolicyGroupAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param accountId - The ID of the account this group belongs to.
     * @param id - The ID of the group.
     */
    read(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/policy-groups/{group_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    group_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantPolicyGroupAdapter.fromApi(data));
        });
    }
    /**
     * users
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve users for.
     * @param options - Options to use for the List
     */
    users(accountId, id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/policy-groups/{group_id}/users",
                    method: "GET",
                    query: {
                        status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: extractFilter(pageOptions.filter, "status", "nin"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: accountId,
                        group_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, SubtenantUserAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
}
//# sourceMappingURL=subtenantPolicyGroupRepository.js.map