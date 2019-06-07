import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantApiKeyAdapter } from "../../index";
/**
 *SubtenantApiKey repository
 */
export class SubtenantApiKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    create(request, accountId) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantApiKeyAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the API key to delete.
     */
    delete(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    apikey_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    read(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    apikey_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantApiKeyAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    update(request, accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    apikey_id: id,
                },
                body: {
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantApiKeyAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=subtenantApiKeyRepository.js.map