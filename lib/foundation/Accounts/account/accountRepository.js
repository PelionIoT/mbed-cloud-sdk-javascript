"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = require("../../../common/repository");
var functions_1 = require("../../../legacy/common/functions");
var index_1 = require("../../index");
var filters_1 = require("../../../common/filters");
var index_2 = require("../../index");
var index_3 = require("../../index");
var index_4 = require("../../index");
var index_5 = require("../../index");
var index_6 = require("../../index");
var index_7 = require("../../index");
var index_8 = require("../../index");
var index_9 = require("../../index");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *Account repository
 */
var AccountRepository = /** @class */ (function (_super) {
    __extends(AccountRepository, _super);
    function AccountRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * apiKeys
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    AccountRepository.prototype.apiKeys = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/api-keys",
                    method: "GET",
                    query: {
                        key__eq: filters_1.extractFilter(pageOptions.filter, "key", "eq"),
                        owner__eq: filters_1.extractFilter(pageOptions.filter, "owner", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.SubtenantApiKeyAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
* create
* @param request - The entity to perform action on.
* @param action - Action, either `create` or `enroll`.
<ul>
<li>`create` creates the account where its admin user has ACTIVE status if `admin_password` was defined in the request, or RESET status if no `admin_password` was defined. If the user already exists, its status is not modified. </li>
<li>`enroll` creates the account where its admin user has ENROLLING status. If the user already exists, its status is not modified. Email to finish enrollment or notify the existing user about the new account is sent to the `admin_email` defined in the request. </li></ul>
*/
    AccountRepository.prototype.create = function (request, action) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
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
        }, function (data, done) {
            done(null, index_2.AccountAdapter.fromApi(data, request));
        });
    };
    /**
     * darkThemeBrandingColors
     * @param id - Account ID.
     * @param options - options
     */
    AccountRepository.prototype.darkThemeBrandingColors = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-colors/dark",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_3.SubtenantDarkThemeColorAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * darkThemeBrandingImages
     * @param id - Account ID.
     * @param options - options
     */
    AccountRepository.prototype.darkThemeBrandingImages = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-images/dark",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_4.SubtenantDarkThemeImageAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * lightThemeBrandingColors
     * @param id - Account ID.
     * @param options - options
     */
    AccountRepository.prototype.lightThemeBrandingColors = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-colors/light",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_5.SubtenantLightThemeColorAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * lightThemeBrandingImages
     * @param id - Account ID.
     * @param options - options
     */
    AccountRepository.prototype.lightThemeBrandingImages = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/branding-images/light",
                    method: "GET",
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_6.SubtenantLightThemeImageAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * list
     * @param options - Options to use for the List
     */
    AccountRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts",
                    method: "GET",
                    query: {
                        status__eq: filters_1.extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: filters_1.extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: filters_1.extractFilter(pageOptions.filter, "status", "nin"),
                        tier__eq: filters_1.extractFilter(pageOptions.filter, "tier", "eq"),
                        parent__eq: filters_1.extractFilter(pageOptions.filter, "parent", "eq"),
                        end_market__eq: filters_1.extractFilter(pageOptions.filter, "endMarket", "eq"),
                        country__like: filters_1.extractFilter(pageOptions.filter, "country", "like"),
                        after: pageOptions.after,
                        format: pageOptions.format,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                        properties: pageOptions.properties,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_2.AccountAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * me
     */
    AccountRepository.prototype.me = function (options) {
        var _this = this;
        options = options || {};
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/me",
                method: "GET",
                query: {
                    include: options.include,
                    properties: options.properties,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.AccountAdapter.fromApi(data));
        });
    };
    /**
     * read
     * @param id - Account ID.
     */
    AccountRepository.prototype.read = function (id, options) {
        var _this = this;
        options = options || {};
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
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
        }, function (data, done) {
            done(null, index_2.AccountAdapter.fromApi(data));
        });
    };
    /**
     * trustedCertificates
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    AccountRepository.prototype.trustedCertificates = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/trusted-certificates",
                    method: "GET",
                    query: {
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        service__eq: filters_1.extractFilter(pageOptions.filter, "service", "eq"),
                        expire__eq: filters_1.extractFilter(pageOptions.filter, "expire", "eq"),
                        device_execution_mode__eq: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "eq"),
                        device_execution_mode__neq: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "neq"),
                        owner__eq: filters_1.extractFilter(pageOptions.filter, "owner", "eq"),
                        enrollment_mode__eq: filters_1.extractFilter(pageOptions.filter, "enrollmentMode", "eq"),
                        status__eq: filters_1.extractFilter(pageOptions.filter, "status", "eq"),
                        issuer__like: filters_1.extractFilter(pageOptions.filter, "issuer", "like"),
                        subject__like: filters_1.extractFilter(pageOptions.filter, "subject", "like"),
                        valid__eq: filters_1.extractFilter(pageOptions.filter, "valid", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_7.SubtenantTrustedCertificateAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Account ID.
     */
    AccountRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
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
        }, function (data, done) {
            done(null, index_2.AccountAdapter.fromApi(data, request));
        });
    };
    /**
     * userInvitations
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    AccountRepository.prototype.userInvitations = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/user-invitations",
                    method: "GET",
                    query: {
                        login_profiles__eq: filters_1.extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_8.SubtenantUserInvitationAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * users
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    AccountRepository.prototype.users = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/users",
                    method: "GET",
                    query: {
                        email__eq: filters_1.extractFilter(pageOptions.filter, "email", "eq"),
                        status__eq: filters_1.extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: filters_1.extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: filters_1.extractFilter(pageOptions.filter, "status", "nin"),
                        login_profiles__eq: filters_1.extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_9.SubtenantUserAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    return AccountRepository;
}(repository_1.Repository));
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=accountRepository.js.map