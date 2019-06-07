import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { UserAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *User repository
 */
export class UserRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param action - Action, either `create` or `invite`.
     */
    create(request, action) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/users",
                method: "POST",
                query: {
                    action: action,
                },
                body: {
                    address: request.address,
                    email: request.email,
                    full_name: request.fullName,
                    is_gtc_accepted: request.isGtcAccepted,
                    is_marketing_accepted: request.isMarketingAccepted,
                    login_profiles: request.loginProfiles,
                    password: request.password,
                    phone_number: request.phoneNumber,
                    username: request.username,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, UserAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The ID of the user to delete.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/users/{user_id}",
                method: "DELETE",
                pathParams: {
                    user_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/users",
                    method: "GET",
                    query: {
                        email__eq: extractFilter(pageOptions.filter, "email", "eq"),
                        status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: extractFilter(pageOptions.filter, "status", "nin"),
                        login_profiles__eq: extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, UserAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the user.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/users/{user_id}",
                method: "GET",
                pathParams: {
                    user_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, UserAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the user.
     */
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/users/{user_id}",
                method: "PUT",
                pathParams: {
                    user_id: id,
                },
                body: {
                    address: request.address,
                    full_name: request.fullName,
                    is_gtc_accepted: request.isGtcAccepted,
                    is_marketing_accepted: request.isMarketingAccepted,
                    is_totp_enabled: request.isTotpEnabled,
                    login_profiles: request.loginProfiles,
                    phone_number: request.phoneNumber,
                    username: request.username,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, UserAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=userRepository.js.map