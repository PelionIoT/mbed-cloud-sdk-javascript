"use strict";
/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apiBase_1 = require("../common/apiBase");
var sdkError_1 = require("../common/sdkError");
/**
 * AccountAdminApi
 */
var AccountAdminApi = /** @class */ (function (_super) {
    __extends(AccountAdminApi, _super);
    function AccountAdminApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Upload a new trusted certificate.
     * An endpoint for uploading new trusted certificates.
     * @param body A trusted certificate object with attributes.
     */
    AccountAdminApi.prototype.addCertificate = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/trusted-certificates",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Add members to a group.
     * An endpoint for adding users and API keys to groups.
     * @param groupID The ID of the group to be updated.
     * @param body A list of users and API keys to be added to the group.
     */
    AccountAdminApi.prototype.addSubjectsToGroup = function (groupID, body, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups/{groupID}".replace("{" + "groupID" + "}", String(groupID)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Create a new user.
     * An endpoint for creating or inviting a new user to the account. In case of invitation email address is used only, other attributes are set in the 2nd step.
     * @param body A user object with attributes.
     * @param action Action, either &#39;create&#39; or &#39;invite&#39;.
     */
    AccountAdminApi.prototype.createUser = function (body, action, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (action !== undefined) {
            queryParameters["action"] = action;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Delete a user.
     * An endpoint for deleting a user.
     * @param userId The ID of the user to be deleted.
     */
    AccountAdminApi.prototype.deleteUser = function (userId, callback) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users/{user-id}".replace("{" + "user-id" + "}", String(userId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get the details of all users.
     * An endpoint for retrieving the details of all users.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param statusEq Filter for status, for example active or reset
     */
    AccountAdminApi.prototype.getAllUsers = function (limit, after, order, include, statusEq, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (statusEq !== undefined) {
            queryParameters["status__eq"] = statusEq;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Details of a user.
     * An endpoint for retrieving the details of a user.
     * @param userId The ID or name of the user whose details are retrieved.
     */
    AccountAdminApi.prototype.getUser = function (userId, callback) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users/{user-id}".replace("{" + "user-id" + "}", String(userId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get users of a group.
     * An endpoint for listing the users of a group with details.
     * @param groupID The ID of the group whose users are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AccountAdminApi.prototype.getUsersOfGroup = function (groupID, limit, after, order, include, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups/{groupID}/users".replace("{" + "groupID" + "}", String(groupID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Remove users from a group.
     * An endpoint for removing users from groups.
     * @param groupID The ID of the group whose users are removed.
     * @param body A list of users to be removed from the group.
     */
    AccountAdminApi.prototype.removeUsersFromGroup = function (groupID, body, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups/{groupID}/users".replace("{" + "groupID" + "}", String(groupID)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Updates attributes of the account.
     * An endpoint for updating the account.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/accounts/me -d &#39;{\&quot;phone_number\&quot;: \&quot;12345678\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body Details of the account to be updated.
     */
    AccountAdminApi.prototype.updateMyAccount = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/accounts/me",
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating user details.
     * @param userId The ID of the user whose details are updated.
     * @param body A user object with attributes.
     */
    AccountAdminApi.prototype.updateUser = function (userId, body, callback) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users/{user-id}".replace("{" + "user-id" + "}", String(userId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    return AccountAdminApi;
}(apiBase_1.ApiBase));
exports.AccountAdminApi = AccountAdminApi;
/**
 * DeveloperApi
 */
var DeveloperApi = /** @class */ (function (_super) {
    __extends(DeveloperApi, _super);
    function DeveloperApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new API key.
     * An endpoint for creating a new API key.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/api-keys -d &#39;{\&quot;name\&quot;: \&quot;MyKey1\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body The details of the API key to be created.
     */
    DeveloperApi.prototype.createApiKey = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Delete API key.
     * An endpoint for deleting the API key.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be deleted.
     */
    DeveloperApi.prototype.deleteApiKey = function (apiKey, callback) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/{apiKey}".replace("{" + "apiKey" + "}", String(apiKey)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Delete a trusted certificate by ID.
     * An endpoint for deleting a trusted certificate.
     * @param certId The ID of the trusted certificate to be deleted.
     */
    DeveloperApi.prototype.deleteCertificate = function (certId, callback) {
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/trusted-certificates/{cert-id}".replace("{" + "cert-id" + "}", String(certId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get all API keys
     * An endpoint for retrieving API keys in an array, optionally filtered by the owner.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param ownerEq Owner name filter.
     */
    DeveloperApi.prototype.getAllApiKeys = function (limit, after, order, include, ownerEq, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (ownerEq !== undefined) {
            queryParameters["owner__eq"] = ownerEq;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get all trusted certificates.
     * An endpoint for retrieving trusted certificates in an array.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param serviceEq Service filter, either lwm2m or bootstrap
     * @param expireEq Expire filter in days
     * @param deviceExecutionModeEq Device execution mode, as 1 for developer certificates or as another natural integer value
     * @param ownerEq Owner ID filter
     */
    DeveloperApi.prototype.getAllCertificates = function (limit, after, order, include, serviceEq, expireEq, deviceExecutionModeEq, ownerEq, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (serviceEq !== undefined) {
            queryParameters["service__eq"] = serviceEq;
        }
        if (expireEq !== undefined) {
            queryParameters["expire__eq"] = expireEq;
        }
        if (deviceExecutionModeEq !== undefined) {
            queryParameters["device_execution_mode__eq"] = deviceExecutionModeEq;
        }
        if (ownerEq !== undefined) {
            queryParameters["owner__eq"] = ownerEq;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/trusted-certificates",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get all group information.
     * An endpoint for retrieving all group information.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    DeveloperApi.prototype.getAllGroups = function (limit, after, order, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.
     * @param apiKey The ID of the API key to be retrieved.
     */
    DeveloperApi.prototype.getApiKey = function (apiKey, callback) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/{apiKey}".replace("{" + "apiKey" + "}", String(apiKey)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get the API keys of a group.
     * An endpoint for listing the API keys of the group with details.
     * @param groupID The ID of the group whose API keys are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    DeveloperApi.prototype.getApiKeysOfGroup = function (groupID, limit, after, order, include, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups/{groupID}/api-keys".replace("{" + "groupID" + "}", String(groupID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get trusted certificate by ID.
     * An endpoint for retrieving a trusted certificate by ID.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID or name of the trusted certificate to be retrieved.
     */
    DeveloperApi.prototype.getCertificate = function (certId, callback) {
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/trusted-certificates/{cert-id}".replace("{" + "cert-id" + "}", String(certId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get group information.
     * An endpoint for getting general information about the group.
     * @param groupID The ID or name of the group to be retrieved.
     */
    DeveloperApi.prototype.getGroupSummary = function (groupID, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups/{groupID}".replace("{" + "groupID" + "}", String(groupID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get account info.
     * Returns detailed information about the account.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/accounts/me?include&#x3D;policies -H &#39;Authorization: Bearer API_KEY&#39;&#x60; .
     * @param include Comma separated additional data to return. Currently supported: limits, policies, sub_accounts.
     */
    DeveloperApi.prototype.getMyAccountInfo = function (include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/accounts/me",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys/me -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     */
    DeveloperApi.prototype.getMyApiKey = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/me",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Details of the current user.
     * An endpoint for retrieving the details of the logged in user.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/users/me -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param scratchCodes Request to regenerate new emergency scratch codes.
     */
    DeveloperApi.prototype.getMyUser = function (scratchCodes, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (scratchCodes !== undefined) {
            queryParameters["scratch_codes"] = scratchCodes;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users/me",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
        }, callback);
    };
    /**
     * Remove API keys from a group.
     * An endpoint for removing API keys from groups.
     * @param groupID The ID of the group whose API keys are removed.
     * @param body A list of API keys to be removed from the group.
     */
    DeveloperApi.prototype.removeApiKeysFromGroup = function (groupID, body, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/policy-groups/{groupID}/api-keys".replace("{" + "groupID" + "}", String(groupID)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.
     * @param apiKey The ID of the API key to be updated.
     * @param body New API key attributes to be stored.
     */
    DeveloperApi.prototype.updateApiKey = function (apiKey, body, callback) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/{apiKey}".replace("{" + "apiKey" + "}", String(apiKey)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Update trusted certificate.
     * An endpoint for updating existing trusted certificates.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -d {\&quot;description\&quot;: \&quot;very important cert\&quot;} -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID of the trusted certificate to be updated.
     * @param body A trusted certificate object with attributes.
     */
    DeveloperApi.prototype.updateCertificate = function (certId, body, callback) {
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/trusted-certificates/{cert-id}".replace("{" + "cert-id" + "}", String(certId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/api-keys/me -d &#39;{\&quot;name\&quot;: \&quot;TestApiKey25\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body New API key attributes to be stored.
     */
    DeveloperApi.prototype.updateMyApiKey = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/me",
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating the details of the logged in user.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/users/me -d &#39;{\&quot;address\&quot;: \&quot;1007 Mountain Drive\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body New attributes for the logged in user.
     */
    DeveloperApi.prototype.updateMyUser = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/users/me",
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            body: body,
        }, callback);
    };
    return DeveloperApi;
}(apiBase_1.ApiBase));
exports.DeveloperApi = DeveloperApi;

//# sourceMappingURL=iam.js.map
