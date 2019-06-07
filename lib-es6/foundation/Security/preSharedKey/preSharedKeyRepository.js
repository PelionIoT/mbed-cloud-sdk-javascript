import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { PreSharedKeyAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *PreSharedKey repository
 */
export class PreSharedKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v2/device-shared-keys",
                method: "POST",
                body: {
                    endpoint_name: request.endpointName,
                    secret_hex: request.secretHex,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, PreSharedKeyAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v2/device-shared-keys/{endpoint_name}",
                method: "DELETE",
                pathParams: {
                    endpoint_name: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * list
     * @param options - options
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v2/device-shared-keys",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, PreSharedKeyAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v2/device-shared-keys/{endpoint_name}",
                method: "GET",
                pathParams: {
                    endpoint_name: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, PreSharedKeyAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=preSharedKeyRepository.js.map