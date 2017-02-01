"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var apiBase_1 = require("../common/apiBase");
/**
 * AccountAdminApi
 */
var AccountAdminApi = (function (_super) {
    __extends(AccountAdminApi, _super);
    function AccountAdminApi() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * Add an alias.
     * Adds an alias to the account.
     * @param accountID The ID of the account to be updated.
     * @param alias The account alias to be added.
     */
    AccountAdminApi.prototype.addAlias = function (accountID, alias, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'addAlias'."));
            }
            return;
        }
        // verify required parameter "alias" is set
        if (alias === null || alias === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'alias' missing when calling 'addAlias'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/alias/{alias}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'alias' + '}', String(alias)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Upload a new CA certificate.
     * An endpoint for uploading new CA certificates.
     * @param body A CA certificate object with attributes.
     */
    AccountAdminApi.prototype.addCertificate = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/ca-certificates',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Add an alias.
     * Adds an alias to the account.
     * @param alias
     */
    AccountAdminApi.prototype.addMyAccountAlias = function (alias, callback) {
        // verify required parameter "alias" is set
        if (alias === null || alias === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'alias' missing when calling 'addMyAccountAlias'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me/alias/{alias}'.replace('{' + 'alias' + '}', String(alias)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'groupID' missing when calling 'addSubjectsToGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addSubjectsToGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Add users to a group.
     * An endpoint for adding users to groups.
     * @param groupID The ID of the group to be updated.
     * @param body A list of users to be added to the group.
     */
    AccountAdminApi.prototype.addUsersToGroup = function (groupID, body, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'addUsersToGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addUsersToGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}/users'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new group.
     * An endpoint for creating a new group.
     * @param body Details of the group to be created.
     */
    AccountAdminApi.prototype.createGroup = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new user.
     * An endpoint for creating a new user.
     * @param body A user object with attributes.
     * @param action Action, either &#39;create&#39; or &#39;invite&#39;.
     */
    AccountAdminApi.prototype.createUser = function (body, action, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (action !== undefined) {
            queryParameters['action'] = action;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Delete a CA certificate by ID.
     * An endpoint for deleting a CA certificate.
     * @param caCertId The ID of the CA certificate to be deleted.
     */
    AccountAdminApi.prototype.deleteCertificate = function (caCertId, callback) {
        // verify required parameter "caCertId" is set
        if (caCertId === null || caCertId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'caCertId' missing when calling 'deleteCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/ca-certificates/{ca-cert-id}'.replace('{' + 'ca-cert-id' + '}', String(caCertId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete a group.
     * An endpoint for deleting a group.
     * @param groupID The ID of the group to be deleted.
     */
    AccountAdminApi.prototype.deleteGroup = function (groupID, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'deleteGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete a user.
     * An endpoint for deleting a user.
     * @param userId The ID of the user to be deleted.
     * @param force A flag indicating that the user is forced to be deleted.
     */
    AccountAdminApi.prototype.deleteUser = function (userId, force, callback) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'deleteUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (force !== undefined) {
            queryParameters['force'] = force;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/{user-id}'.replace('{' + 'user-id' + '}', String(userId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all CA certificates.
     * An endpoint for retrieving CA certificates in an array.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter Filter by service or expiring days, for example filter&#x3D;service%3Dlwm2m,expire%3D180
     */
    AccountAdminApi.prototype.getAllCertificates = function (limit, after, order, include, filter, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/ca-certificates',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get the details of all users.
     * An endpoint for retrieving the details of all users.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter Filter for the query, for example filter&#x3D;status%3Dactive,status%3Dreset.
     */
    AccountAdminApi.prototype.getAllUsers = function (limit, after, order, include, filter, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get CA certificate by ID.
     * An endpoint for retrieving a CA certificate by ID.
     * @param caCertId The ID or name of the CA certificate to be retrieved.
     */
    AccountAdminApi.prototype.getCertificate = function (caCertId, callback) {
        // verify required parameter "caCertId" is set
        if (caCertId === null || caCertId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'caCertId' missing when calling 'getCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/ca-certificates/{ca-cert-id}'.replace('{' + 'ca-cert-id' + '}', String(caCertId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'userId' missing when calling 'getUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/{user-id}'.replace('{' + 'user-id' + '}', String(userId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get users of a group.
     * An endpoint for listing the users of a group with details.
     * @param groupID The ID of the group whose users are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    AccountAdminApi.prototype.getUsersOfGroup = function (groupID, limit, after, order, include, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'getUsersOfGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}/users'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Remove an alias.
     * Removes an alias from the account.
     * @param accountID The ID of the account to be updated.
     * @param alias The account alias to be removed.
     */
    AccountAdminApi.prototype.removeAlias = function (accountID, alias, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'removeAlias'."));
            }
            return;
        }
        // verify required parameter "alias" is set
        if (alias === null || alias === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'alias' missing when calling 'removeAlias'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/alias/{alias}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'alias' + '}', String(alias)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Remove an alias.
     * Removes an alias from the account.
     * @param alias Account alias to be removed.
     */
    AccountAdminApi.prototype.removeMyAccountAlias = function (alias, callback) {
        // verify required parameter "alias" is set
        if (alias === null || alias === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'alias' missing when calling 'removeMyAccountAlias'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me/alias/{alias}'.replace('{' + 'alias' + '}', String(alias)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'groupID' missing when calling 'removeUsersFromGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'removeUsersFromGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}/users'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Reset the user password.
     * An endpoint for resetting the user password. The new password will visible in the response.
     * @param userId The ID of the user whose password is reset.
     */
    AccountAdminApi.prototype.resetUserPassword = function (userId, callback) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'resetUserPassword'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/{user-id}/reset-password'.replace('{' + 'user-id' + '}', String(userId)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Set aliases.
     * Defines aliases of the account and overwrites the previous set of aliases.
     * @param accountID The ID of the account to be updated.
     * @param body A list of aliases to be set.
     */
    AccountAdminApi.prototype.setAliases = function (accountID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'setAliases'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'setAliases'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/alias'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Set aliases.
     * Defines the aliases of the account and overwrites the previous set of aliases.
     * @param body List of aliases to be set.
     */
    AccountAdminApi.prototype.setMyAccountAliases = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'setMyAccountAliases'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me/alias',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update attributes of an existing account.
     * An endpoint for updating an account.
     * @param accountID The ID of the account to be updated.
     * @param body Details of the account to be updated.
     */
    AccountAdminApi.prototype.updateAccount = function (accountID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'updateAccount'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateAccount'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update CA certificate.
     * An endpoint for updating existing CA certificates.
     * @param caCertId The ID of the CA certificate to be updated.
     * @param body A CA certificate object with attributes.
     */
    AccountAdminApi.prototype.updateCertificate = function (caCertId, body, callback) {
        // verify required parameter "caCertId" is set
        if (caCertId === null || caCertId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'caCertId' missing when calling 'updateCertificate'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/ca-certificates/{ca-cert-id}'.replace('{' + 'ca-cert-id' + '}', String(caCertId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Updates attributes of the account.
     * An endpoint for updating the account.
     * @param body Details of the account to be updated.
     */
    AccountAdminApi.prototype.updateMyAccount = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateMyAccount'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me',
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'userId' missing when calling 'updateUser'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/{user-id}'.replace('{' + 'user-id' + '}', String(userId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    return AccountAdminApi;
}(apiBase_1.ApiBase));
exports.AccountAdminApi = AccountAdminApi;
/**
 * DefaultApi
 */
var DefaultApi = (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * Accept invitation.
     * Accepting pending invitation and providing missing details.
     * @param invitationId Invitation ID received in email.
     * @param body Details of the user accepting the invitation.
     */
    DefaultApi.prototype.activateUser = function (invitationId, body, callback) {
        // verify required parameter "invitationId" is set
        if (invitationId === null || invitationId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'invitationId' missing when calling 'activateUser'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'activateUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/invitations/{invitation-id}'.replace('{' + 'invitation-id' + '}', String(invitationId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Apply password recovery.
     * Applying password recovery by providing a secret hash code.
     * @param body Hash received by email and new password.
     * @param xForwardedFor
     */
    DefaultApi.prototype.applyPasswordRecovery = function (body, xForwardedFor, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'applyPasswordRecovery'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['X-Forwarded-For'] = xForwardedFor;
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/recover',
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Remove unconfirmed accounts.
     * An endpoint for removing unconfirmed accounts.
     * @param body Duration in seconds to determine how old accounts are to be removed.
     */
    DefaultApi.prototype.cleanUnconfirmedAccounts = function (body, callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/internal/v1/gc/register',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Get all accounts all CA certificates.
     * An endpoint for retrieving all accounts&#39; all CA certificates in an array.
     * @param service Filter certificates by service.
     * @param ifNoneMatch
     * @param issuer Optional filter for a certain issuer name.
     * @param accountId Optional filter for a certain account ID.
     */
    DefaultApi.prototype.getAllAccountsAllCertificates = function (service, ifNoneMatch, issuer, accountId, callback) {
        // verify required parameter "service" is set
        if (service === null || service === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'service' missing when calling 'getAllAccountsAllCertificates'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['If-None-Match'] = ifNoneMatch;
        var queryParameters = {};
        if (service !== undefined) {
            queryParameters['service'] = service;
        }
        if (issuer !== undefined) {
            queryParameters['issuer'] = issuer;
        }
        if (accountId !== undefined) {
            queryParameters['account_id'] = accountId;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/internal/v1/ca-certificates',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get invited user.
     * Returns information about the user being invited.
     * @param invitationId Invitation ID received in email.
     */
    DefaultApi.prototype.getInvitedUser = function (invitationId, callback) {
        // verify required parameter "invitationId" is set
        if (invitationId === null || invitationId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'invitationId' missing when calling 'getInvitedUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/invitations/{invitation-id}'.replace('{' + 'invitation-id' + '}', String(invitationId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get registering user.
     * Retrieving the details of a user to register.
     * @param signupId ID received while signing up.
     */
    DefaultApi.prototype.getSelfEnrollingUser = function (signupId, callback) {
        // verify required parameter "signupId" is set
        if (signupId === null || signupId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'signupId' missing when calling 'getSelfEnrollingUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/register/{signup-id}'.replace('{' + 'signup-id' + '}', String(signupId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headAllAccounts = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headAllApiKeys = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headAllCertificates = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/ca-certificates',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headAllGroups = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headAllInternalCertificates = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/internal/v1/ca-certificates',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headAllUsers = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headInternalLimits = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/internal/v1/limits',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headInvitations = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/invitations',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headMyAccount = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headMyApiKey = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/me',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headMyUser = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/me',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headRecovery = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/recover',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * The heartbeat method for this API.
     *
     */
    DefaultApi.prototype.headRegister = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/register',
            method: 'HEAD',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Register a new account.
     * An endpoint for registering a new account.
     * @param signupId ID received while signing up.
     * @param body Details of the account to be created.
     */
    DefaultApi.prototype.registerAccount = function (signupId, body, callback) {
        // verify required parameter "signupId" is set
        if (signupId === null || signupId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'signupId' missing when calling 'registerAccount'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'registerAccount'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/register/{signup-id}'.replace('{' + 'signup-id' + '}', String(signupId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Request password recovery.
     * Requesting password recovery by email address.
     * @param body Email address of the user whose password needs to be recovered.
     * @param xForwardedFor
     */
    DefaultApi.prototype.requestPasswordRecovery = function (body, xForwardedFor, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'requestPasswordRecovery'."));
            }
            return;
        }
        var headerParams = {};
        headerParams['X-Forwarded-For'] = xForwardedFor;
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/recover',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Set the logging level
     * An endpoint for setting the wanted level of logging.
     * @param body Logging level, either &#39;debug&#39;, &#39;info&#39; or &#39;warn&#39;
     */
    DefaultApi.prototype.setLoggingLevel = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'setLoggingLevel'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/logging',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Sign up for a new account.
     * Signing up for a new free tier account with email address.
     * @param body Email address of the user to be signed up.
     */
    DefaultApi.prototype.signup = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'signup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/register',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Verify self-enrollment code and aliases.
     * Verifying whether the code received by email is valid. Optionally, it also verifies whether an account with the given aliases exists.
     * @param signupId ID received while signing up.
     * @param body Verification code received by email and aliases to be checked.
     */
    DefaultApi.prototype.verifySelfEnrollment = function (signupId, body, callback) {
        // verify required parameter "signupId" is set
        if (signupId === null || signupId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'signupId' missing when calling 'verifySelfEnrollment'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/auth/register/{signup-id}'.replace('{' + 'signup-id' + '}', String(signupId)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    return DefaultApi;
}(apiBase_1.ApiBase));
exports.DefaultApi = DefaultApi;
/**
 * DeveloperApi
 */
var DeveloperApi = (function (_super) {
    __extends(DeveloperApi, _super);
    function DeveloperApi() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * Add API keys to a group.
     * Ann endpoint for adding API keys to groups.
     * @param groupID The ID of the group to be updated.
     * @param body A list of API keys to be added to the group.
     */
    DeveloperApi.prototype.addApiKeysToGroup = function (groupID, body, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'addApiKeysToGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addApiKeysToGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}/api-keys'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Change the password of the current user.
     * An endpoint for changing the password of the logged in user.
     * @param body Old and new password.
     */
    DeveloperApi.prototype.changeMyPassword = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'changeMyPassword'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/me/password',
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new API key.
     * An endpoint for creating a new API key.
     * @param body The details of the API key to be created.
     */
    DeveloperApi.prototype.createApiKey = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Delete API key.
     * An endpoint for deleting the API key.
     * @param apiKey The ID of the API key to be deleted.
     */
    DeveloperApi.prototype.deleteApiKey = function (apiKey, callback) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'apiKey' missing when calling 'deleteApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/{apiKey}'.replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Read account attributes.
     * Reads all account attributes as map.
     * @param accountID The ID of the account to be read.
     * @param name A comma separated list of attribute names.
     */
    DeveloperApi.prototype.getAccountAttributes = function (accountID, name, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAccountAttributes'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (name !== undefined) {
            queryParameters['name'] = name;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/attributes'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get aliases.
     * Retrieves the aliases of the account as an array.
     * @param accountID The ID of the account whose aliases are retrieved.
     */
    DeveloperApi.prototype.getAliases = function (accountID, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAliases'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/alias'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all API keys
     * An endpoint for retrieving API keys in an array, optionally filtered by the owner.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter A filter for the query, for example filter&#x3D;owner%3Duuid.
     * @param owner Owner name filter.
     */
    DeveloperApi.prototype.getAllApiKeys = function (limit, after, order, include, filter, owner, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        if (owner !== undefined) {
            queryParameters['owner'] = owner;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all group information.
     * An endpoint for retrieving all group information.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    DeveloperApi.prototype.getAllGroups = function (limit, after, order, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'apiKey' missing when calling 'getApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/{apiKey}'.replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get the API keys of a group.
     * An endpoint for listing the API keys of the group with details.
     * @param groupID The ID of the group whose API keys are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    DeveloperApi.prototype.getApiKeysOfGroup = function (groupID, limit, after, order, include, callback) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'getApiKeysOfGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}/api-keys'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'groupID' missing when calling 'getGroupSummary'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get aliases.
     * Retrieves the aliases of the account as an array.
     */
    DeveloperApi.prototype.getMyAccountAliases = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me/alias',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Read account attributes.
     * Reads all account attributes as map.
     * @param name A comma separated list of attribute names.
     */
    DeveloperApi.prototype.getMyAccountAttributes = function (name, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (name !== undefined) {
            queryParameters['name'] = name;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me/attributes',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get account info.
     * Returns detailed information about the account.
     * @param include Comma separated additional data to return. Currently supported: limits
     */
    DeveloperApi.prototype.getMyAccountInfo = function (include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/me',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.
     */
    DeveloperApi.prototype.getMyApiKey = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/me',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Details of the current user.
     * An endpoint for retrieving the details of the logged in user.
     */
    DeveloperApi.prototype.getMyUser = function (callback) {
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/me',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'groupID' missing when calling 'removeApiKeysFromGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'removeApiKeysFromGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/policy-groups/{groupID}/api-keys'.replace('{' + 'groupID' + '}', String(groupID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Reset secret key.
     * An endpoint for resetting the secret key of the API key. The new secret key will visible in the response.
     * @param apiKey The ID of the API key to be reset.
     */
    DeveloperApi.prototype.resetSecret = function (apiKey, callback) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'apiKey' missing when calling 'resetSecret'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/{apiKey}/reset-secret'.replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
                callback(new Error("Required parameter 'apiKey' missing when calling 'updateApiKey'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/{apiKey}'.replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.
     * @param body New API key attributes to be stored.
     */
    DeveloperApi.prototype.updateMyApiKey = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateMyApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/api-keys/me',
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating the details of the logged in user.
     * @param body New attributes for the logged in user.
     */
    DeveloperApi.prototype.updateMyUser = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateMyUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/users/me',
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    return DeveloperApi;
}(apiBase_1.ApiBase));
exports.DeveloperApi = DeveloperApi;
/**
 * RootAdminApi
 */
var RootAdminApi = (function (_super) {
    __extends(RootAdminApi, _super);
    function RootAdminApi() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * Upload new CA certificate.
     * An endpoint for uploading new CA certificates.
     * @param accountID Account ID.
     * @param body A CA certificate object with attributes.
     */
    RootAdminApi.prototype.addAccountCertificate = function (accountID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'addAccountCertificate'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addAccountCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/ca-certificates'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Add API keys to a group.
     * An endpoint for adding API keys to groups.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be updated.
     * @param body A list of API keys to be added to the group.
     */
    RootAdminApi.prototype.addApiKeysToAccountGroup = function (accountID, groupID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'addApiKeysToAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'addApiKeysToAccountGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addApiKeysToAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}/api-keys'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
    RootAdminApi.prototype.addSubjectsToAccountGroup = function (accountID, groupID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'addSubjectsToAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'addSubjectsToAccountGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addSubjectsToAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Add users to a group.
     * An endpoint for adding users to groups.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be updated.
     * @param body A list of users to be added to the group.
     */
    RootAdminApi.prototype.addUsersToAccountGroup = function (accountID, groupID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'addUsersToAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'addUsersToAccountGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'addUsersToAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}/users'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Change the password of a user.
     * An endpoint for changing the user password. The old password is not checked.
     * @param accountID Account ID.
     * @param userId The ID of the user whose password is changed.
     * @param body New password only.
     */
    RootAdminApi.prototype.changeAccountUserPassword = function (accountID, userId, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'changeAccountUserPassword'."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'changeAccountUserPassword'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'changeAccountUserPassword'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users/{user-id}/password'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'user-id' + '}', String(userId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Check the password of a user.
     * An endpoint for checking user&#39;s current password.
     * @param accountID Account ID.
     * @param userId The ID of the user whose password is checked.
     * @param body Current password only.
     */
    RootAdminApi.prototype.checkAccountUserPassword = function (accountID, userId, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'checkAccountUserPassword'."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'checkAccountUserPassword'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'checkAccountUserPassword'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users/{user-id}/password'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'user-id' + '}', String(userId)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new account.
     * An endpoint for creating a new account.
     * @param body Details of the account to be created.
     */
    RootAdminApi.prototype.createAccount = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createAccount'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new API key.
     * An endpoint for creating a new API key.
     * @param accountID Account ID.
     * @param body Details of the API key to be created.
     */
    RootAdminApi.prototype.createAccountApiKey = function (accountID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'createAccountApiKey'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createAccountApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/api-keys'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new group.
     * An endpoint for creating a new group.
     * @param accountID Account ID.
     * @param body Details of the group to be created.
     */
    RootAdminApi.prototype.createAccountGroup = function (accountID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'createAccountGroup'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new account template.
     * An endpoint for creating a new account template.
     * @param body Details of the account template to be created.
     */
    RootAdminApi.prototype.createAccountTemplate = function (body, callback) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createAccountTemplate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/account-templates',
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Create a new user.
     * An endpoint for creating a new user.
     * @param accountID Account ID.
     * @param body A user object with attributes.
     * @param action Create or invite user.
     */
    RootAdminApi.prototype.createAccountUser = function (accountID, body, action, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'createAccountUser'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'createAccountUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (action !== undefined) {
            queryParameters['action'] = action;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Delete an existing account.
     * An endpoint for deleting an account.
     * @param accountID The ID of the account to be deleted.
     */
    RootAdminApi.prototype.deleteAccount = function (accountID, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'deleteAccount'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete the API key.
     * An endpoint for deleting an API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be deleted.
     */
    RootAdminApi.prototype.deleteAccountApiKey = function (accountID, apiKey, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'deleteAccountApiKey'."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'apiKey' missing when calling 'deleteAccountApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/api-keys/{apiKey}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete CA certificate by ID.
     * An endpoint for deleting the CA certificate.
     * @param accountID Account ID.
     * @param caCertId The ID of the CA certificate to be deleted.
     */
    RootAdminApi.prototype.deleteAccountCertificate = function (accountID, caCertId, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'deleteAccountCertificate'."));
            }
            return;
        }
        // verify required parameter "caCertId" is set
        if (caCertId === null || caCertId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'caCertId' missing when calling 'deleteAccountCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/ca-certificates/{ca-cert-id}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'ca-cert-id' + '}', String(caCertId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete a group.
     * An endpoint for deleting a group.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be deleted.
     */
    RootAdminApi.prototype.deleteAccountGroup = function (accountID, groupID, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'deleteAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'deleteAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete account template by ID.
     * An endpoint for deleting a account template by ID.
     * @param templateId The ID of the account template to be deleted.
     */
    RootAdminApi.prototype.deleteAccountTemplate = function (templateId, callback) {
        // verify required parameter "templateId" is set
        if (templateId === null || templateId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'templateId' missing when calling 'deleteAccountTemplate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/account-templates/{template-id}'.replace('{' + 'template-id' + '}', String(templateId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Delete a user.
     * An endpoint for deleting a user.
     * @param accountID Account ID.
     * @param userId The ID of the user to be deleted.
     * @param force A flag indicating that the user is forced to be deleted.
     */
    RootAdminApi.prototype.deleteAccountUser = function (accountID, userId, force, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'deleteAccountUser'."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'deleteAccountUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (force !== undefined) {
            queryParameters['force'] = force;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users/{user-id}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'user-id' + '}', String(userId)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be retrieved.
     */
    RootAdminApi.prototype.getAccountApiKey = function (accountID, apiKey, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAccountApiKey'."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'apiKey' missing when calling 'getAccountApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/api-keys/{apiKey}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get CA certificate by ID.
     * An endpoint for retrieving a CA certificate by ID.
     * @param accountID Account ID.
     * @param caCertId The ID or name of the CA certificate to be retrieved.
     */
    RootAdminApi.prototype.getAccountCertificate = function (accountID, caCertId, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAccountCertificate'."));
            }
            return;
        }
        // verify required parameter "caCertId" is set
        if (caCertId === null || caCertId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'caCertId' missing when calling 'getAccountCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/ca-certificates/{ca-cert-id}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'ca-cert-id' + '}', String(caCertId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get group information.
     * An endpoint for getting general information about the group.
     * @param accountID Account ID.
     * @param groupID The ID or name of the group to be retrieved.
     */
    RootAdminApi.prototype.getAccountGroupSummary = function (accountID, groupID, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAccountGroupSummary'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'getAccountGroupSummary'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get account info.
     * Returns detailed information about the account.
     * @param accountID The ID or alias of the account to be fetched.
     * @param include Comma separated additional data to return. Currently supported: limits, policies
     */
    RootAdminApi.prototype.getAccountInfo = function (accountID, include, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAccountInfo'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get limits for account.
     * Endpoint for retrieving limits by account ID.
     * @param accountId The ID of the account whose limits to be retrieved.
     */
    RootAdminApi.prototype.getAccountLimits = function (accountId, callback) {
        // verify required parameter "accountId" is set
        if (accountId === null || accountId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountId' missing when calling 'getAccountLimits'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/internal/v1/limits/{account-id}'.replace('{' + 'account-id' + '}', String(accountId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get account template by ID.
     * An endpoint for retrieving a account template by ID.
     * @param templateId The ID of the account template to be retrieved.
     */
    RootAdminApi.prototype.getAccountTemplate = function (templateId, callback) {
        // verify required parameter "templateId" is set
        if (templateId === null || templateId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'templateId' missing when calling 'getAccountTemplate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/account-templates/{template-id}'.replace('{' + 'template-id' + '}', String(templateId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Details of the user.
     * An endpoint for retrieving details of the user.
     * @param accountID Account ID.
     * @param userId The ID or name of the user to be retrieved.
     */
    RootAdminApi.prototype.getAccountUser = function (accountID, userId, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAccountUser'."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'getAccountUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users/{user-id}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'user-id' + '}', String(userId)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all API keys.
     * An endpoint for retrieving the API keys in an array, optionally filtered by the owner.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter Filter for the query, for example filter&#x3D;owner%3Duuid.
     * @param owner Owner name filter.
     */
    RootAdminApi.prototype.getAllAccountApiKeys = function (accountID, limit, after, order, include, filter, owner, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAllAccountApiKeys'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        if (owner !== undefined) {
            queryParameters['owner'] = owner;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/api-keys'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all CA certificates.
     * An endpoint for retrieving CA certificates in an array.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter Filter for the query, for example filter&#x3D;service%3Dlwm2m,expire%3D180.
     */
    RootAdminApi.prototype.getAllAccountCertificates = function (accountID, limit, after, order, include, filter, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAllAccountCertificates'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/ca-certificates'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all group information.
     * An endpoint for retrieving all group information.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    RootAdminApi.prototype.getAllAccountGroups = function (accountID, limit, after, order, include, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAllAccountGroups'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all account templates.
     * An endpoint for retrieving account templates in an array.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; default ASC.
     * @param include Comma separated additional data to return. Currently supported: total_count.
     */
    RootAdminApi.prototype.getAllAccountTemplates = function (limit, after, order, include, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/account-templates',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all user details.
     * An endpoint for retrieving details of all users.
     * @param accountID Account ID.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter Filter for the query, for example filter&#x3D;status%3Dactive,status%3Dreset.
     */
    RootAdminApi.prototype.getAllAccountUsers = function (accountID, limit, after, order, include, filter, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getAllAccountUsers'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all accounts.
     * Returns an array of account objects, optionally filtered by status and tier level.
     * @param status An optional filter for account status, ENROLLING, ACTIVE, SUSPENDED or DISABLED.
     * @param tier An optional filter for tier level, must be 0, 1 or omitted.
     * @param parent An optional filter for parent account ID.
     * @param limit The number of results to return (2-1000). By default, it is unlimited.
     * @param after The entity ID to fetch after the given one.
     * @param include Comma separated additional data to return. Currently supported: total_count,limits
     * @param filter Filter for the query, for example filter&#x3D;tier%3D1 or status%3DACTIVE.
     */
    RootAdminApi.prototype.getAllAccounts = function (status, tier, parent, limit, after, include, filter, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (status !== undefined) {
            queryParameters['status'] = status;
        }
        if (tier !== undefined) {
            queryParameters['tier'] = tier;
        }
        if (parent !== undefined) {
            queryParameters['parent'] = parent;
        }
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get all users from all accounts
     * Endpoint for retrieving user info from all accounts
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param filter Filter for the query, for example filter&#x3D;status%3Dactive,status%3Dreset.
     */
    RootAdminApi.prototype.getAllAccountsAllUsers = function (limit, after, order, include, filter, callback) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        if (filter !== undefined) {
            queryParameters['filter'] = filter;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/users',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get API keys of a group.
     * An endpoint for listing the API keys of the group with details.
     * @param accountID Account ID.
     * @param groupID The ID of the group whose API keys are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    RootAdminApi.prototype.getApiKeysOfAccountGroup = function (accountID, groupID, limit, after, order, include, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getApiKeysOfAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'getApiKeysOfAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}/api-keys'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Get users of a group.
     * An endpoint for listing users of the group with details.
     * @param accountID Account ID.
     * @param groupID The ID of the group whose users are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    RootAdminApi.prototype.getUsersOfAccountGroup = function (accountID, groupID, limit, after, order, include, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'getUsersOfAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'getUsersOfAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (after !== undefined) {
            queryParameters['after'] = after;
        }
        if (order !== undefined) {
            queryParameters['order'] = order;
        }
        if (include !== undefined) {
            queryParameters['include'] = include;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}/users'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Manage an account.
     * This endpoint upgrades the account from free tier to commercial, sets the new status.
     * @param accountID The ID of the account to be updated.
     * @param status New status of the account; ACTIVE, SUSPENDED or DISABLED
     * @param tier New tier level of the account; &#39;0&#39;: free tier, &#39;1&#39;: commercial account. Other values are reserved for the future.
     * @param isProvisioningAllowed A flag indicating whether Factory Tool is permitted to be downloaded or not, true or false.
     */
    RootAdminApi.prototype.manageAccount = function (accountID, status, tier, isProvisioningAllowed, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'manageAccount'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        if (status !== undefined) {
            queryParameters['status'] = status;
        }
        if (tier !== undefined) {
            queryParameters['tier'] = tier;
        }
        if (isProvisioningAllowed !== undefined) {
            queryParameters['isProvisioningAllowed'] = isProvisioningAllowed;
        }
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/manage'.replace('{' + 'accountID' + '}', String(accountID)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Remove API keys from a group.
     * An endpoint for removing API keys from groups.
     * @param accountID Account ID.
     * @param groupID A list of API keys to be removed from the group.
     * @param body
     */
    RootAdminApi.prototype.removeApiKeysFromAccountGroup = function (accountID, groupID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'removeApiKeysFromAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'removeApiKeysFromAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}/api-keys'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
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
    RootAdminApi.prototype.removeUsersFromAccountGroup = function (accountID, groupID, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'removeUsersFromAccountGroup'."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'groupID' missing when calling 'removeUsersFromAccountGroup'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/policy-groups/{groupID}/users'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'groupID' + '}', String(groupID)),
            method: 'DELETE',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Reset the secret key.
     * An endpoint for resetting the secret key of the API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be reset.
     */
    RootAdminApi.prototype.resetAccountApiKeySecret = function (accountID, apiKey, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'resetAccountApiKeySecret'."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'apiKey' missing when calling 'resetAccountApiKeySecret'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/api-keys/{apiKey}/reset-secret'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Reset the user password.
     * An endpoint for resetting the user password. The new password will visible in the response.
     * @param accountID Account ID.
     * @param userId The ID of the user whose password is reset.
     */
    RootAdminApi.prototype.resetAccountUserPassword = function (accountID, userId, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'resetAccountUserPassword'."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'resetAccountUserPassword'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users/{user-id}/reset-password'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'user-id' + '}', String(userId)),
            method: 'POST',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    };
    /**
     * Update API key details.
     * An endpoint for updating API key details.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be updated.
     * @param body New API key attributes to be stored.
     */
    RootAdminApi.prototype.updateAccountApiKey = function (accountID, apiKey, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'updateAccountApiKey'."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'apiKey' missing when calling 'updateAccountApiKey'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateAccountApiKey'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/api-keys/{apiKey}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'apiKey' + '}', String(apiKey)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update CA certificate.
     * An endpoint for updating existing CA certificates.
     * @param accountID Account ID.
     * @param caCertId The ID of the CA certificate to be updated.
     * @param body A CA certificate object with attributes.
     */
    RootAdminApi.prototype.updateAccountCertificate = function (accountID, caCertId, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'updateAccountCertificate'."));
            }
            return;
        }
        // verify required parameter "caCertId" is set
        if (caCertId === null || caCertId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'caCertId' missing when calling 'updateAccountCertificate'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateAccountCertificate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/ca-certificates/{ca-cert-id}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'ca-cert-id' + '}', String(caCertId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update an existing account template.
     * An endpoint for updating an existing account template.
     * @param templateId The ID of the account template to be updated.
     * @param body Details of the account template to be updated.
     */
    RootAdminApi.prototype.updateAccountTemplate = function (templateId, body, callback) {
        // verify required parameter "templateId" is set
        if (templateId === null || templateId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'templateId' missing when calling 'updateAccountTemplate'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateAccountTemplate'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/admin/v3/account-templates/{template-id}'.replace('{' + 'template-id' + '}', String(templateId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    /**
     * Update user details.
     * An endpoint for updating user details.
     * @param accountID Account ID.
     * @param userId The ID of the user to be updated.
     * @param body A rootadmin user object with attributes.
     */
    RootAdminApi.prototype.updateAccountUser = function (accountID, userId, body, callback) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'accountID' missing when calling 'updateAccountUser'."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'userId' missing when calling 'updateAccountUser'."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'body' missing when calling 'updateAccountUser'."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        var useFormData = false;
        var formParams = {};
        return this.request({
            url: '/v3/accounts/{accountID}/users/{user-id}'.replace('{' + 'accountID' + '}', String(accountID)).replace('{' + 'user-id' + '}', String(userId)),
            method: 'PUT',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
            body: body,
        }, callback);
    };
    return RootAdminApi;
}(apiBase_1.ApiBase));
exports.RootAdminApi = RootAdminApi;
