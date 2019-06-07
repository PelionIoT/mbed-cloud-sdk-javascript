import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DarkThemeColorAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *DarkThemeColor repository
 */
export class DarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - Color name.
     */
    delete(reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-colors/dark/{reference}",
                method: "DELETE",
                pathParams: {
                    reference: reference,
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
                    url: "/v3/branding-colors/dark",
                    method: "GET",
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, DarkThemeColorAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param reference - Color name.
     */
    read(reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-colors/dark/{reference}",
                method: "GET",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DarkThemeColorAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    update(request, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-colors/dark/{reference}",
                method: "PUT",
                pathParams: {
                    reference: reference,
                },
                body: {
                    color: request.color,
                    updated_at: request.updatedAt,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DarkThemeColorAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=darkThemeColorRepository.js.map