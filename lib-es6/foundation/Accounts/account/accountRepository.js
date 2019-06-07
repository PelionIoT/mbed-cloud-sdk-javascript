import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantApiKeyAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { AccountAdapter } from "../../index";
import { SubtenantDarkThemeColorAdapter } from "../../index";
import { SubtenantDarkThemeImageAdapter } from "../../index";
import { SubtenantLightThemeColorAdapter } from "../../index";
import { SubtenantLightThemeImageAdapter } from "../../index";
import { SubtenantTrustedCertificateAdapter } from "../../index";
import { SubtenantUserInvitationAdapter } from "../../index";
import { SubtenantUserAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *Account repository
 */
export class AccountRepository extends Repository {
    /**
     * apiKeys
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    apiKeys(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/api-keys",
                    method: "GET",
                    query: {
                        key__eq: extractFilter(pageOptions.filter, "key", "eq"),
                        owner__eq: extractFilter(pageOptions.filter, "owner", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantApiKeyAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
* create
* @param request - The entity to perform action on.
* @param action - Action, either `create` or `enroll`.
<ul>
<li>`create` creates the account where its admin user has ACTIVE status if `admin_password` was defined in the request, or RESET status if no `admin_password` was defined. If the user already exists, its status is not modified. </li>
<li>`enroll` creates the account where its admin user has ENROLLING status. If the user already exists, its status is not modified. Email to finish enrollment or notify the existing user about the new account is sent to the `admin_email` defined in the request. </li></ul>
*/
    create(request, action) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts",
                method: "POST",
                query: {
                    action: action,
                },
                body: {
                    address_line1: request.addressLine1,
                    address_line2: request.addressLine2,
                    admin_email: request.adminEmail,
                    admin_full_name: request.adminFullName,
                    admin_name: request.adminName,
                    admin_password: request.adminPassword,
                    aliases: request.aliases,
                    city: request.city,
                    company: request.company,
                    contact: request.contact,
                    contract_number: request.contractNumber,
                    country: request.country,
                    customer_number: request.customerNumber,
                    display_name: request.displayName,
                    email: request.email,
                    end_market: request.endMarket,
                    phone_number: request.phoneNumber,
                    postal_code: request.postalCode,
                    state: request.state,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, AccountAdapter.fromApi(data, request));
        });
    }
    /**
     * darkThemeBrandingColors
     * @param id - Account ID.
     * @param options - options
     */
    darkThemeBrandingColors(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-colors/dark",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantDarkThemeColorAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * darkThemeBrandingImages
     * @param id - Account ID.
     * @param options - options
     */
    darkThemeBrandingImages(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-images/dark",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantDarkThemeImageAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * lightThemeBrandingColors
     * @param id - Account ID.
     * @param options - options
     */
    lightThemeBrandingColors(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-colors/light",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantLightThemeColorAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * lightThemeBrandingImages
     * @param id - Account ID.
     * @param options - options
     */
    lightThemeBrandingImages(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-images/light",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantLightThemeImageAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
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
                    url: "/v3/accounts",
                    method: "GET",
                    query: {
                        status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: extractFilter(pageOptions.filter, "status", "nin"),
                        tier__eq: extractFilter(pageOptions.filter, "tier", "eq"),
                        parent__eq: extractFilter(pageOptions.filter, "parent", "eq"),
                        end_market__eq: extractFilter(pageOptions.filter, "endMarket", "eq"),
                        country__like: extractFilter(pageOptions.filter, "country", "like"),
                        after: pageOptions.after,
                        format: pageOptions.format,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                        properties: pageOptions.properties,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, AccountAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * me
     */
    me(options) {
        options = options || {};
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/me",
                method: "GET",
                query: {
                    include: options.include,
                    properties: options.properties,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, AccountAdapter.fromApi(data));
        });
    }
    /**
     * read
     * @param id - Account ID.
     */
    read(id, options) {
        options = options || {};
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}",
                method: "GET",
                query: {
                    include: options.include,
                    properties: options.properties,
                },
                pathParams: {
                    account_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, AccountAdapter.fromApi(data));
        });
    }
    /**
     * trustedCertificates
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    trustedCertificates(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/trusted-certificates",
                    method: "GET",
                    query: {
                        name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                        service__eq: extractFilter(pageOptions.filter, "service", "eq"),
                        expire__eq: extractFilter(pageOptions.filter, "expire", "eq"),
                        device_execution_mode__eq: extractFilter(pageOptions.filter, "deviceExecutionMode", "eq"),
                        device_execution_mode__neq: extractFilter(pageOptions.filter, "deviceExecutionMode", "neq"),
                        owner__eq: extractFilter(pageOptions.filter, "owner", "eq"),
                        enrollment_mode__eq: extractFilter(pageOptions.filter, "enrollmentMode", "eq"),
                        status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                        issuer__like: extractFilter(pageOptions.filter, "issuer", "like"),
                        subject__like: extractFilter(pageOptions.filter, "subject", "like"),
                        valid__eq: extractFilter(pageOptions.filter, "valid", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantTrustedCertificateAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Account ID.
     */
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}",
                method: "PUT",
                pathParams: {
                    account_id: id,
                },
                body: {
                    address_line1: request.addressLine1,
                    address_line2: request.addressLine2,
                    aliases: request.aliases,
                    city: request.city,
                    company: request.company,
                    contact: request.contact,
                    contract_number: request.contractNumber,
                    country: request.country,
                    custom_fields: request.customFields,
                    customer_number: request.customerNumber,
                    display_name: request.displayName,
                    email: request.email,
                    end_market: request.endMarket,
                    expiration_warning_threshold: request.expirationWarningThreshold,
                    idle_timeout: request.idleTimeout,
                    mfa_status: request.mfaStatus,
                    notification_emails: request.notificationEmails,
                    password_policy: request.passwordPolicy,
                    password_recovery_expiration: request.passwordRecoveryExpiration,
                    phone_number: request.phoneNumber,
                    postal_code: request.postalCode,
                    sales_contact: request.salesContact,
                    state: request.state,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, AccountAdapter.fromApi(data, request));
        });
    }
    /**
     * userInvitations
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    userInvitations(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/user-invitations",
                    method: "GET",
                    query: {
                        login_profiles__eq: extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantUserInvitationAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * users
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    users(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/accounts/{account_id}/users",
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
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, SubtenantUserAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
}
//# sourceMappingURL=accountRepository.js.map