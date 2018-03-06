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
     * Add API key to a list of groups.
     * An endpoint for adding API key to groups.
     * @param apiKey The ID of the API key to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AccountAdminApi.prototype.addApiKeyToGroups = function (apiKey, body, callback, requestOptions) {
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
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/{apiKey}/groups".replace("{" + "apiKey" + "}", String(apiKey)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Upload a new trusted certificate.
     * An endpoint for uploading new trusted certificates.
     * @param body A trusted certificate object with attributes.
     */
    AccountAdminApi.prototype.addCertificate = function (body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Add members to a group.
     * An endpoint for adding users and API keys to groups.
     * @param groupID The ID of the group to be updated.
     * @param body A list of users and API keys to be added to the group.
     */
    AccountAdminApi.prototype.addSubjectsToGroup = function (groupID, body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Add user to a list of groups.
     * An endpoint for adding user to groups.
     * @param userId The ID of the user to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AccountAdminApi.prototype.addUserToGroups = function (userId, body, callback, requestOptions) {
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
            url: "/v3/users/{user-id}/groups".replace("{" + "user-id" + "}", String(userId)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Create a new group.
     * An endpoint for creating a new group.
     * @param body Details of the group to be created.
     */
    AccountAdminApi.prototype.createGroup = function (body, callback, requestOptions) {
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
            url: "/v3/policy-groups",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Create a new user.
     * An endpoint for creating or inviting a new user to the account. In case of invitation email address is used only, other attributes are set in the 2nd step.
     * @param body A user object with attributes.
     * @param action Action, either &#39;create&#39; or &#39;invite&#39;.
     */
    AccountAdminApi.prototype.createUser = function (body, action, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Delete a group.
     * An endpoint for deleting a group.
     * @param groupID The ID of the group to be deleted.
     */
    AccountAdminApi.prototype.deleteGroup = function (groupID, callback, requestOptions) {
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
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Delete a user.
     * An endpoint for deleting a user.
     * @param userId The ID of the user to be deleted.
     */
    AccountAdminApi.prototype.deleteUser = function (userId, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get the details of all users.
     * An endpoint for retrieving the details of all users.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param emailEq Filter for email address
     * @param statusEq Filter for status, for example active or reset
     */
    AccountAdminApi.prototype.getAllUsers = function (limit, after, order, include, emailEq, statusEq, callback, requestOptions) {
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
        if (emailEq !== undefined) {
            queryParameters["email__eq"] = emailEq;
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get groups of the API key.
     * An endpoint for retrieving groups of the API key.
     * @param apiKey The ID of the API key whose details are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AccountAdminApi.prototype.getGroupsOfApikey = function (apiKey, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'apiKey' missing."));
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
            url: "/v3/api-keys/{apiKey}/groups".replace("{" + "apiKey" + "}", String(apiKey)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get groups of the user.
     * An endpoint for retrieving groups of the user.
     * @param userId The ID of the user whose details are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AccountAdminApi.prototype.getGroupsOfUser = function (userId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
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
            url: "/v3/users/{user-id}/groups".replace("{" + "user-id" + "}", String(userId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Details of a user.
     * An endpoint for retrieving the details of a user.
     * @param userId The ID of the user whose details are retrieved.
     * @param properties Request to return account specific user property values according to the given property name.
     */
    AccountAdminApi.prototype.getUser = function (userId, properties, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
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
            url: "/v3/users/{user-id}".replace("{" + "user-id" + "}", String(userId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
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
    AccountAdminApi.prototype.getUsersOfGroup = function (groupID, limit, after, order, include, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Remove API key from groups.
     * An endpoint for removing API key from groups.
     * @param apiKey The ID of the API key to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AccountAdminApi.prototype.removeApiKeyFromGroups = function (apiKey, body, callback, requestOptions) {
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
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/api-keys/{apiKey}/groups".replace("{" + "apiKey" + "}", String(apiKey)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove user from groups.
     * An endpoint for removing user from groups.
     * @param userId The ID of the user to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AccountAdminApi.prototype.removeUserFromGroups = function (userId, body, callback, requestOptions) {
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
            url: "/v3/users/{user-id}/groups".replace("{" + "user-id" + "}", String(userId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove users from a group.
     * An endpoint for removing users from groups.
     * @param groupID The ID of the group whose users are removed.
     * @param body A list of users to be removed from the group.
     */
    AccountAdminApi.prototype.removeUsersFromGroup = function (groupID, body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update the group name.
     * An endpoint for updating a group name.
     * @param groupID The ID of the group to be updated.
     * @param body Details of the group to be created.
     */
    AccountAdminApi.prototype.updateGroupName = function (groupID, body, callback, requestOptions) {
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
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Updates attributes of the account.
     * An endpoint for updating the account.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/accounts/me -d &#39;{\&quot;phone_number\&quot;: \&quot;12345678\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body Details of the account to be updated.
     */
    AccountAdminApi.prototype.updateMyAccount = function (body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating user details.
     * @param userId The ID of the user whose details are updated.
     * @param body A user object with attributes.
     */
    AccountAdminApi.prototype.updateUser = function (userId, body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    return AccountAdminApi;
}(apiBase_1.ApiBase));
exports.AccountAdminApi = AccountAdminApi;
/**
 * AggregatorAccountAdminApi
 */
var AggregatorAccountAdminApi = /** @class */ (function (_super) {
    __extends(AggregatorAccountAdminApi, _super);
    function AggregatorAccountAdminApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Add API key to a list of groups.
     * An endpoint for adding API key to groups.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AggregatorAccountAdminApi.prototype.addAccountApiKeyToGroups = function (accountID, apiKey, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Upload new trusted certificate.
     * An endpoint for uploading new trusted certificates.
     * @param accountID Account ID.
     * @param body A trusted certificate object with attributes, signature is optional.
     */
    AggregatorAccountAdminApi.prototype.addAccountCertificate = function (accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
            url: "/v3/accounts/{accountID}/trusted-certificates".replace("{" + "accountID" + "}", String(accountID)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Add user to a list of groups.
     * An endpoint for adding user to groups.
     * @param accountID Account ID.
     * @param userId The ID of the user to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AggregatorAccountAdminApi.prototype.addAccountUserToGroups = function (accountID, userId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/users/{user-id}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Add members to a group.
     * An endpoint for adding users and API keys to groups.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be updated.
     * @param body A list of users and API keys to be added to the group.
     */
    AggregatorAccountAdminApi.prototype.addSubjectsToAccountGroup = function (accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Attach a policy to API keys.
     * An endpoint for attaching policy to API keys.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be attached to API keys.
     * @param body List of API key IDs.
     */
    AggregatorAccountAdminApi.prototype.attachAccountPolicyToApikeys = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/api-keys".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Attach a policy to groups.
     * An endpoint for attaching policy to groups.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be attached to groups.
     * @param body List of groups IDs.
     */
    AggregatorAccountAdminApi.prototype.attachAccountPolicyToGroup = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Attach a policy to users.
     * An endpoint for attaching policy to users.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be attached to users.
     * @param body List of user IDs.
     */
    AggregatorAccountAdminApi.prototype.attachAccountPolicyToUsers = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/users".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Check the API key.
     * An endpoint for checking API key.
     * @param accountID Account ID.
     * @param apiKey The API key to be checked.
     */
    AggregatorAccountAdminApi.prototype.checkAccountApiKey = function (accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Create a new account.
     * An endpoint for creating a new account.
     * @param body Details of the account to be created.
     * @param action Action, either &#39;create&#39;, &#39;enroll&#39; or &#39;enrollment_link&#39;.
     */
    AggregatorAccountAdminApi.prototype.createAccount = function (body, action, callback, requestOptions) {
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
            url: "/v3/accounts",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Create a new API key.
     * An endpoint for creating a new API key. There is no default value for the owner ID and it must be from the same account where the new API key is created.
     * @param accountID Account ID.
     * @param body Details of the API key to be created.
     */
    AggregatorAccountAdminApi.prototype.createAccountApiKey = function (accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
            url: "/v3/accounts/{accountID}/api-keys".replace("{" + "accountID" + "}", String(accountID)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Create a policy.
     * An endpoint for creating a new policy.
     * @param accountID Account ID.
     * @param body The details of the policy to be created.
     */
    AggregatorAccountAdminApi.prototype.createAccountPolicy = function (accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
            url: "/v3/accounts/{accountID}/policies".replace("{" + "accountID" + "}", String(accountID)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Create a new user.
     * An endpoint for creating or inviting a new user to the account. In case of invitation email address is used only, other attributes are set in the 2nd step.
     * @param accountID Account ID.
     * @param body A user object with attributes.
     * @param action Create or invite user.
     */
    AggregatorAccountAdminApi.prototype.createAccountUser = function (accountID, body, action, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
            url: "/v3/accounts/{accountID}/users".replace("{" + "accountID" + "}", String(accountID)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Delete the API key.
     * An endpoint for deleting an API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be deleted.
     */
    AggregatorAccountAdminApi.prototype.deleteAccountApiKey = function (accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Delete trusted certificate by ID.
     * An endpoint for deleting the trusted certificate.
     * @param accountID Account ID.
     * @param certId The ID of the trusted certificate to be deleted.
     */
    AggregatorAccountAdminApi.prototype.deleteAccountCertificate = function (accountID, certId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/trusted-certificates/{cert-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "cert-id" + "}", String(certId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Delete policy.
     * An endpoint for deleting a policy.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be deleted.
     */
    AggregatorAccountAdminApi.prototype.deleteAccountPolicy = function (accountID, policyId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Delete a user.
     * An endpoint for deleting a user.
     * @param accountID Account ID.
     * @param userId The ID of the user to be deleted.
     */
    AggregatorAccountAdminApi.prototype.deleteAccountUser = function (accountID, userId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/users/{user-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Detach a policy from API keys.
     * An endpoint for detaching policy from API keys.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be detached from API keys.
     * @param body List of API key IDs.
     */
    AggregatorAccountAdminApi.prototype.detachAccountPolicyFromApikeys = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/api-keys".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Detach a policy from users.
     * An endpoint for detaching policy from users.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be detached from users.
     * @param body List of user IDs.
     */
    AggregatorAccountAdminApi.prototype.detachAccountPolicyFromUsers = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/users".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Detach a policy to groups.
     * An endpoint for detaching policy to groups.
     * @param accountID Account ID.
     * @param policyId The ID of the policy to be detached from groups.
     * @param body List of groups IDs.
     */
    AggregatorAccountAdminApi.prototype.detachAccountPolicyToGroup = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be retrieved.
     */
    AggregatorAccountAdminApi.prototype.getAccountApiKey = function (accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get trusted certificate by ID.
     * An endpoint for retrieving a trusted certificate by ID.
     * @param accountID Account ID.
     * @param certId The ID of the trusted certificate to be retrieved.
     */
    AggregatorAccountAdminApi.prototype.getAccountCertificate = function (accountID, certId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/trusted-certificates/{cert-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "cert-id" + "}", String(certId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get group information.
     * An endpoint for getting general information about the group.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be retrieved.
     */
    AggregatorAccountAdminApi.prototype.getAccountGroupSummary = function (accountID, groupID, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get account info.
     * Returns detailed information about the account.
     * @param accountID The ID of the account to be fetched.
     * @param include Comma separated additional data to return. Currently supported: limits, policies, sub_accounts
     * @param properties Property name to be returned from account specific properties.
     */
    AggregatorAccountAdminApi.prototype.getAccountInfo = function (accountID, include, properties, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
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
            url: "/v3/accounts/{accountID}".replace("{" + "accountID" + "}", String(accountID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get policy by ID.
     * An endpoint for retrieving a policy by ID.
     * @param accountID Account ID.
     * @param policyId The ID the policy to be retrieved.
     */
    AggregatorAccountAdminApi.prototype.getAccountPolicy = function (accountID, policyId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Fetch details of policy&#39;s API keys.
     * An endpoint for fetching detailed information about API keys this policy is attached to.
     * @param accountID Account ID.
     * @param policyId The ID the policy whose API keys to be retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getAccountPolicyApikeys = function (accountID, policyId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/api-keys".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Fetch details of policy&#39;s groups.
     * An endpoint for fetching detailed information about groups this policy is attached to.
     * @param accountID Account ID.
     * @param policyId The ID the policy whose API keys to be retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getAccountPolicyGroups = function (accountID, policyId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Fetch details of policy&#39;s users.
     * An endpoint for fetching detailed information about users this policy is attached to.
     * @param accountID Account ID.
     * @param policyId The ID the policy whose users to be retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getAccountPolicyUsers = function (accountID, policyId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}/users".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Details of the user.
     * An endpoint for retrieving details of the user.
     * @param accountID Account ID.
     * @param userId The ID of the user to be retrieved.
     * @param scratchCodes Request to regenerate new emergency scratch codes.
     * @param properties Request to return account specific user property values according to the given property name.
     */
    AggregatorAccountAdminApi.prototype.getAccountUser = function (accountID, userId, scratchCodes, properties, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (scratchCodes !== undefined) {
            queryParameters["scratch_codes"] = scratchCodes;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
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
            url: "/v3/accounts/{accountID}/users/{user-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all API keys.
     * An endpoint for retrieving the API keys in an array, optionally filtered by the owner.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param keyEq API key filter.
     * @param ownerEq Owner name filter.
     */
    AggregatorAccountAdminApi.prototype.getAllAccountApiKeys = function (accountID, limit, after, order, include, keyEq, ownerEq, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
        if (keyEq !== undefined) {
            queryParameters["key__eq"] = keyEq;
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
            url: "/v3/accounts/{accountID}/api-keys".replace("{" + "accountID" + "}", String(accountID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all trusted certificates.
     * An endpoint for retrieving trusted certificates in an array.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param nameEq Filter for certificate name
     * @param serviceEq Filter for service
     * @param expireEq Filter for expire
     * @param deviceExecutionModeEq Filter for developer certificates
     * @param deviceExecutionModeNeq Filter for not developer certificates
     * @param ownerEq Owner name filter
     * @param enrollmentModeEq Enrollment mode filter
     * @param issuerLike Filter for issuer. Finds all matches where the filter value is a case insensitive substring of the result. Example: issuer__like&#x3D;cn&#x3D;iss matches CN&#x3D;issuer.
     * @param subjectLike Filter for subject. Finds all matches where the filter value is a case insensitive substring of the result. Example: subject__like&#x3D;cn&#x3D;su matches CN&#x3D;subject.
     */
    AggregatorAccountAdminApi.prototype.getAllAccountCertificates = function (accountID, limit, after, order, include, nameEq, serviceEq, expireEq, deviceExecutionModeEq, deviceExecutionModeNeq, ownerEq, enrollmentModeEq, issuerLike, subjectLike, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
        if (nameEq !== undefined) {
            queryParameters["name__eq"] = nameEq;
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
        if (deviceExecutionModeNeq !== undefined) {
            queryParameters["device_execution_mode__neq"] = deviceExecutionModeNeq;
        }
        if (ownerEq !== undefined) {
            queryParameters["owner__eq"] = ownerEq;
        }
        if (enrollmentModeEq !== undefined) {
            queryParameters["enrollment_mode__eq"] = enrollmentModeEq;
        }
        if (issuerLike !== undefined) {
            queryParameters["issuer__like"] = issuerLike;
        }
        if (subjectLike !== undefined) {
            queryParameters["subject__like"] = subjectLike;
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
            url: "/v3/accounts/{accountID}/trusted-certificates".replace("{" + "accountID" + "}", String(accountID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all group information.
     * An endpoint for retrieving all group information.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param nameEq Filter for group name
     */
    AggregatorAccountAdminApi.prototype.getAllAccountGroups = function (accountID, limit, after, order, include, nameEq, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
        if (nameEq !== undefined) {
            queryParameters["name__eq"] = nameEq;
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
            url: "/v3/accounts/{accountID}/policy-groups".replace("{" + "accountID" + "}", String(accountID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all policies.
     * An endpoint for retrieving all policies in the account.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param nameEq Filter result by policy name.
     * @param statusEq Filter for status, ACTIVE or INACTIVE.
     * @param tagEq Filter results for tag.
     * @param userIdEq Retrieve policies attached to a certain user ID.
     * @param apikeyIdEq Retrieve policies attached to a certain API key ID.
     * @param groupIdEq Retrieve policies attached to a certain group ID.
     * @param unbounded Retrieve policies not attached to any subject in the account.
     */
    AggregatorAccountAdminApi.prototype.getAllAccountPolicies = function (accountID, limit, after, order, nameEq, statusEq, tagEq, userIdEq, apikeyIdEq, groupIdEq, unbounded, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
        if (nameEq !== undefined) {
            queryParameters["name__eq"] = nameEq;
        }
        if (statusEq !== undefined) {
            queryParameters["status__eq"] = statusEq;
        }
        if (tagEq !== undefined) {
            queryParameters["tag__eq"] = tagEq;
        }
        if (userIdEq !== undefined) {
            queryParameters["user_id__eq"] = userIdEq;
        }
        if (apikeyIdEq !== undefined) {
            queryParameters["apikey_id__eq"] = apikeyIdEq;
        }
        if (groupIdEq !== undefined) {
            queryParameters["group_id__eq"] = groupIdEq;
        }
        if (unbounded !== undefined) {
            queryParameters["unbounded"] = unbounded;
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
            url: "/v3/accounts/{accountID}/policies".replace("{" + "accountID" + "}", String(accountID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all user details.
     * An endpoint for retrieving details of all users.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param emailEq Filter for email address
     * @param statusEq Filter for status
     */
    AggregatorAccountAdminApi.prototype.getAllAccountUsers = function (accountID, limit, after, order, include, emailEq, statusEq, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
        if (emailEq !== undefined) {
            queryParameters["email__eq"] = emailEq;
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
            url: "/v3/accounts/{accountID}/users".replace("{" + "accountID" + "}", String(accountID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all accounts.
     * Returns an array of account objects, optionally filtered by status and tier level.
     * @param statusEq An optional filter for account status, ENROLLING, ACTIVE, RESTRICTED or SUSPENDED.
     * @param tierEq An optional filter for tier level, must be 0, 1, 2, 98, 99 or omitted.
     * @param parentEq An optional filter for parent account ID.
     * @param endMarketEq An optional filter for account end market.
     * @param countryLike An optional filter for account country. Finds all matches where the filter value is a case insensitive substring of the result. Example: country__like&#x3D;LAND matches Ireland.
     * @param limit The number of results to return (2-1000), default is 1000.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC. Default value is ASC
     * @param include Comma separated additional data to return. Currently supported: limits, policies, sub_accounts
     * @param format Format information for the response to the query, supported: format&#x3D;breakdown.
     * @param properties Property name to be returned from account specific properties.
     */
    AggregatorAccountAdminApi.prototype.getAllAccounts = function (statusEq, tierEq, parentEq, endMarketEq, countryLike, limit, after, order, include, format, properties, callback, requestOptions) {
        var headerParams = {};
        var queryParameters = {};
        if (statusEq !== undefined) {
            queryParameters["status__eq"] = statusEq;
        }
        if (tierEq !== undefined) {
            queryParameters["tier__eq"] = tierEq;
        }
        if (parentEq !== undefined) {
            queryParameters["parent__eq"] = parentEq;
        }
        if (endMarketEq !== undefined) {
            queryParameters["end_market__eq"] = endMarketEq;
        }
        if (countryLike !== undefined) {
            queryParameters["country__like"] = countryLike;
        }
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
        if (format !== undefined) {
            queryParameters["format"] = format;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
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
            url: "/v3/accounts",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get API keys of a group.
     * An endpoint for listing the API keys of the group with details.
     * @param accountID Account ID.
     * @param groupID The ID of the group whose API keys are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getApiKeysOfAccountGroup = function (accountID, groupID, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}/api-keys".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get groups of the API key.
     * An endpoint for retrieving groups of the API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key whose details are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getGroupsOfAccountApikey = function (accountID, apiKey, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'apiKey' missing."));
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
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get groups of the user.
     * An endpoint for retrieving groups of the user.
     * @param accountID Account ID.
     * @param userId The ID of the user whose details are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getGroupsOfAccountUser = function (accountID, userId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'userId' missing."));
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
            url: "/v3/accounts/{accountID}/users/{user-id}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get users of a group.
     * An endpoint for listing users of the group with details.
     * @param accountID Account ID.
     * @param groupID The ID of the group whose users are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AggregatorAccountAdminApi.prototype.getUsersOfAccountGroup = function (accountID, groupID, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}/users".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Remove API key from groups.
     * An endpoint for removing API key from groups.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AggregatorAccountAdminApi.prototype.removeAccountApiKeyFromGroups = function (accountID, apiKey, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove user from groups.
     * An endpoint for removing user from groups.
     * @param accountID Account ID.
     * @param userId The ID of the user to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    AggregatorAccountAdminApi.prototype.removeAccountUserFromGroups = function (accountID, userId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/users/{user-id}/groups".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove API keys from a group.
     * An endpoint for removing API keys from groups.
     * @param accountID Account ID.
     * @param groupID A list of API keys to be removed from the group.
     * @param body
     */
    AggregatorAccountAdminApi.prototype.removeApiKeysFromAccountGroup = function (accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}/api-keys".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove users from a group.
     * An endpoint for removing users from groups.
     * @param accountID Account ID.
     * @param groupID
     * @param body
     */
    AggregatorAccountAdminApi.prototype.removeUsersFromAccountGroup = function (accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}/users".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Reset the secret key.
     * An endpoint for resetting the secret key of the API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be reset.
     */
    AggregatorAccountAdminApi.prototype.resetAccountApiKeySecret = function (accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}/reset-secret".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Update attributes of an existing account.
     * An endpoint for updating an account.
     * @param accountID The ID of the account to be updated.
     * @param body Details of the account to be updated.
     */
    AggregatorAccountAdminApi.prototype.updateAccount = function (accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
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
            url: "/v3/accounts/{accountID}".replace("{" + "accountID" + "}", String(accountID)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be updated.
     * @param body New API key attributes to be stored.
     */
    AggregatorAccountAdminApi.prototype.updateAccountApiKey = function (accountID, apiKey, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "apiKey" + "}", String(apiKey)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update trusted certificate.
     * An endpoint for updating existing trusted certificates.
     * @param accountID Account ID.
     * @param certId The ID of the trusted certificate to be updated.
     * @param body A trusted certificate object with attributes.
     */
    AggregatorAccountAdminApi.prototype.updateAccountCertificate = function (accountID, certId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/trusted-certificates/{cert-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "cert-id" + "}", String(certId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update a policy.
     * An endpoint for updating a policy.
     * @param accountID Account ID.
     * @param policyId The ID the policy to be retrieved.
     * @param body The details of the policy to be updated.
     */
    AggregatorAccountAdminApi.prototype.updateAccountPolicy = function (accountID, policyId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "policyId" is set
        if (policyId === null || policyId === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'policyId' missing."));
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
            url: "/v3/accounts/{accountID}/policies/{policy-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "policy-id" + "}", String(policyId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating user details.
     * @param accountID Account ID.
     * @param userId The ID of the user to be updated.
     * @param body A user object with attributes.
     */
    AggregatorAccountAdminApi.prototype.updateAccountUser = function (accountID, userId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/users/{user-id}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "PUT",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Validate the user email.
     * An endpoint for validating the user email.
     * @param accountID Account ID.
     * @param userId The ID of the user whose email is validated.
     */
    AggregatorAccountAdminApi.prototype.validateAccountUserEmail = function (accountID, userId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
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
            url: "/v3/accounts/{accountID}/users/{user-id}/validate-email".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "user-id" + "}", String(userId)),
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    return AggregatorAccountAdminApi;
}(apiBase_1.ApiBase));
exports.AggregatorAccountAdminApi = AggregatorAccountAdminApi;
/**
 * DeveloperApi
 */
var DeveloperApi = /** @class */ (function (_super) {
    __extends(DeveloperApi, _super);
    function DeveloperApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Add user to a list of groupS.
     * An endpoint for adding user to groups.
     * @param body A list of IDs of the groups to be updated.
     */
    DeveloperApi.prototype.addMeToGroups = function (body, callback, requestOptions) {
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
            url: "/v3/users/me/groups",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Add API key to a list of groups.
     * An endpoint for adding API key to groups.
     * @param body A list of IDs of the groups to be updated.
     */
    DeveloperApi.prototype.addMyApiKeyToGroups = function (body, callback, requestOptions) {
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
            url: "/v3/api-keys/me/groups",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Create a new API key.
     * An endpoint for creating a new API key.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/api-keys -d &#39;{\&quot;name\&quot;: \&quot;MyKey1\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body The details of the API key to be created.
     */
    DeveloperApi.prototype.createApiKey = function (body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Delete API key.
     * An endpoint for deleting the API key.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be deleted.
     */
    DeveloperApi.prototype.deleteApiKey = function (apiKey, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Delete a trusted certificate by ID.
     * An endpoint for deleting a trusted certificate.
     * @param certId The ID of the trusted certificate to be deleted.
     */
    DeveloperApi.prototype.deleteCertificate = function (certId, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all API keys
     * An endpoint for retrieving API keys in an array, optionally filtered by the owner.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param keyEq API key filter.
     * @param ownerEq Owner name filter.
     */
    DeveloperApi.prototype.getAllApiKeys = function (limit, after, order, include, keyEq, ownerEq, callback, requestOptions) {
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
        if (keyEq !== undefined) {
            queryParameters["key__eq"] = keyEq;
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all trusted certificates.
     * An endpoint for retrieving trusted certificates in an array.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param nameEq Filter for certificate name
     * @param serviceEq Service filter, either lwm2m or bootstrap
     * @param expireEq Expire filter in days
     * @param deviceExecutionModeEq Device execution mode, as 1 for developer certificates or as another natural integer value
     * @param deviceExecutionModeNeq Device execution mode not equals filter
     * @param ownerEq Owner name filter
     * @param enrollmentModeEq Enrollment mode filter
     * @param issuerLike Issuer filter. Finds all matches where the filter value is a case insensitive substring of the result. Example: issuer__like&#x3D;cn&#x3D;iss matches CN&#x3D;issuer.
     * @param subjectLike Subject filter. Finds all matches where the filter value is a case insensitive substring of the result. Example: subject__like&#x3D;cn&#x3D;su matches CN&#x3D;subject.
     */
    DeveloperApi.prototype.getAllCertificates = function (limit, after, order, include, nameEq, serviceEq, expireEq, deviceExecutionModeEq, deviceExecutionModeNeq, ownerEq, enrollmentModeEq, issuerLike, subjectLike, callback, requestOptions) {
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
        if (nameEq !== undefined) {
            queryParameters["name__eq"] = nameEq;
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
        if (deviceExecutionModeNeq !== undefined) {
            queryParameters["device_execution_mode__neq"] = deviceExecutionModeNeq;
        }
        if (ownerEq !== undefined) {
            queryParameters["owner__eq"] = ownerEq;
        }
        if (enrollmentModeEq !== undefined) {
            queryParameters["enrollment_mode__eq"] = enrollmentModeEq;
        }
        if (issuerLike !== undefined) {
            queryParameters["issuer__like"] = issuerLike;
        }
        if (subjectLike !== undefined) {
            queryParameters["subject__like"] = subjectLike;
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get all group information.
     * An endpoint for retrieving all group information.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param nameEq Filter for group name
     */
    DeveloperApi.prototype.getAllGroups = function (limit, after, order, include, nameEq, callback, requestOptions) {
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
        if (nameEq !== undefined) {
            queryParameters["name__eq"] = nameEq;
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.
     * @param apiKey The ID of the API key to be retrieved.
     */
    DeveloperApi.prototype.getApiKey = function (apiKey, callback, requestOptions) {
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
            requestOptions: requestOptions,
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
    DeveloperApi.prototype.getApiKeysOfGroup = function (groupID, limit, after, order, include, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get trusted certificate by ID.
     * An endpoint for retrieving a trusted certificate by ID.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID of the trusted certificate to be retrieved.
     */
    DeveloperApi.prototype.getCertificate = function (certId, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get group information.
     * An endpoint for getting general information about the group.
     * @param groupID The ID of the group to be retrieved.
     */
    DeveloperApi.prototype.getGroupSummary = function (groupID, callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get groups of the API key.
     * An endpoint for retrieving groups of the API key.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    DeveloperApi.prototype.getGroupsOfMyApiKey = function (limit, after, order, include, callback, requestOptions) {
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
            url: "/v3/api-keys/me/groups",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get account info.
     * Returns detailed information about the account.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/accounts/me?include&#x3D;policies -H &#39;Authorization: Bearer API_KEY&#39;&#x60;.
     * @param include Comma separated additional data to return. Currently supported: limits, policies, sub_accounts.
     * @param properties Property name to be returned from account specific properties.
     */
    DeveloperApi.prototype.getMyAccountInfo = function (include, properties, callback, requestOptions) {
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get accounts of the user.
     * An endpoint for retrieving the accounts of the logged in user.
     */
    DeveloperApi.prototype.getMyAccounts = function (callback, requestOptions) {
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
            url: "/v3/users/me/accounts",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys/me -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     */
    DeveloperApi.prototype.getMyApiKey = function (callback, requestOptions) {
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
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get groups of the user.
     * An endpoint for retrieving groups of the user.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    DeveloperApi.prototype.getMyGroups = function (limit, after, order, include, callback, requestOptions) {
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
            url: "/v3/users/me/groups",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Details of the current user.
     * An endpoint for retrieving the details of the logged in user.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/users/me -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param scratchCodes Request to regenerate new emergency scratch codes.
     * @param properties Request to return account specific user property values according to the given property name.
     * @param include Comma separated additional data to return. Currently supported: active_sessions
     */
    DeveloperApi.prototype.getMyUser = function (scratchCodes, properties, include, callback, requestOptions) {
        var headerParams = {};
        var queryParameters = {};
        if (scratchCodes !== undefined) {
            queryParameters["scratch_codes"] = scratchCodes;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
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
            url: "/v3/users/me",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Remove API keys from a group.
     * An endpoint for removing API keys from groups.
     * @param groupID The ID of the group whose API keys are removed.
     * @param body A list of API keys to be removed from the group.
     */
    DeveloperApi.prototype.removeApiKeysFromGroup = function (groupID, body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove user from a group.
     * An endpoint for removing user from groups.
     * @param body A list of IDs of the groups to be updated.
     */
    DeveloperApi.prototype.removeMeFromGroups = function (body, callback, requestOptions) {
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
            url: "/v3/users/me/groups",
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Remove API key from groups.
     * An endpoint for removing API key from groups.
     * @param body A list of IDs of the groups to be updated.
     */
    DeveloperApi.prototype.removeMyApiKeyFromGroups = function (body, callback, requestOptions) {
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
            url: "/v3/api-keys/me/groups",
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.
     * @param apiKey The ID of the API key to be updated.
     * @param body New API key attributes to be stored.
     */
    DeveloperApi.prototype.updateApiKey = function (apiKey, body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update trusted certificate.
     * An endpoint for updating existing trusted certificates.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -d {\&quot;description\&quot;: \&quot;very important cert\&quot;} -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID of the trusted certificate to be updated.
     * @param body A trusted certificate object with attributes.
     */
    DeveloperApi.prototype.updateCertificate = function (certId, body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/api-keys/me -d &#39;{\&quot;name\&quot;: \&quot;TestApiKey25\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body New API key attributes to be stored.
     */
    DeveloperApi.prototype.updateMyApiKey = function (body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating the details of the logged in user.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/users/me -d &#39;{\&quot;address\&quot;: \&quot;1007 Mountain Drive\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body New attributes for the logged in user.
     */
    DeveloperApi.prototype.updateMyUser = function (body, callback, requestOptions) {
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
            requestOptions: requestOptions,
            body: body,
        }, callback);
    };
    return DeveloperApi;
}(apiBase_1.ApiBase));
exports.DeveloperApi = DeveloperApi;

//# sourceMappingURL=iam.js.map
