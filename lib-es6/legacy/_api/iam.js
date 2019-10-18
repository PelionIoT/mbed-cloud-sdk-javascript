/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";
/**
 * AccountAdminApi
 */
export class AccountAdminApi extends ApiBase {
    /**
     * Add API key to a list of groups.
     * An endpoint for adding API key to groups.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id}/groups -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    addApiKeyToGroups(apiKey, body, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Upload a new trusted certificate.
     * An endpoint for uploading new trusted certificates.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/trusted-certificates -d {\&quot;name\&quot;: \&quot;myCert1\&quot;, \&quot;description\&quot;: \&quot;very important cert\&quot;, \&quot;certificate\&quot;: \&quot;certificate_data\&quot;, \&quot;service\&quot;: \&quot;lwm2m\&quot;} -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body A trusted certificate object with attributes.
     */
    addCertificate(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Add members to a group.
     * An endpoint for adding users and API keys to a group.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id} -d &#39;{\&quot;users\&quot;: [0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group to be updated.
     * @param body A list of users and API keys to be added to the group.
     */
    addSubjectsToGroup(groupID, body, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Add user to a list of groups.
     * An endpoint for adding user to groups.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/users/{user-id}/groups -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param userId The ID of the user to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    addUserToGroups(userId, body, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Create a new group.
     * An endpoint for creating a new group.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/policy-groups -d &#39;{\&quot;name\&quot;: \&quot;MyGroup1\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body Details of the group to be created.
     */
    createGroup(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Create a new user.
     * An endpoint for creating or inviting a new user to the account. In case of invitation email address is used only, other attributes are set in the 2nd step.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/users?action&#x3D;invite -d {\&quot;email\&quot;: \&quot;myemail@company.com\&quot;} -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body A user object with attributes.
     * @param action Action, either &#39;create&#39; or &#39;invite&#39;.
     */
    createUser(body, action, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (action !== undefined) {
            queryParameters["action"] = action;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete a group.
     * An endpoint for deleting a group.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group to be deleted.
     */
    deleteGroup(groupID, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete a user.
     * An endpoint for deleting a user.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/users/{user-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param userId The ID of the user to be deleted.
     */
    deleteUser(userId, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get the details of all users.
     * An endpoint for retrieving the details of all users.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/users -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param emailEq Filter for email address
     * @param statusEq Filter for status, for example active or reset
     * @param statusIn An optional filter for getting users with a specified set of statuses.
     * @param statusNin An optional filter for excluding users with a specified set of statuses.
     */
    getAllUsers(limit, after, order, include, emailEq, statusEq, statusIn, statusNin, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        if (statusIn !== undefined) {
            queryParameters["status__in"] = statusIn;
        }
        if (statusNin !== undefined) {
            queryParameters["status__nin"] = statusNin;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get groups of the API key.
     * An endpoint for retrieving groups of the API key.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id}/groups -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key whose details are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    getGroupsOfApikey(apiKey, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get groups of the user.
     * An endpoint for retrieving groups of the user.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/users/{user-id}/groups -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param userId The ID of the user whose details are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    getGroupsOfUser(userId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Details of a user.
     * An endpoint for retrieving the details of a user.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/users/{user-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param userId The ID of the user whose details are retrieved.
     * @param properties Request to return account specific user property values according to the given property name.
     */
    getUser(userId, properties, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get users of a group.
     * An endpoint for listing the users of a group with details.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id}/users -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group whose users are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param statusEq An optional filter for getting users by status.
     * @param statusIn An optional filter for getting users with a specified set of statuses.
     * @param statusNin An optional filter for excluding users with a specified set of statuses.
     */
    getUsersOfGroup(groupID, limit, after, order, include, statusEq, statusIn, statusNin, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        if (statusIn !== undefined) {
            queryParameters["status__in"] = statusIn;
        }
        if (statusNin !== undefined) {
            queryParameters["status__nin"] = statusNin;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove API key from groups.
     * An endpoint for removing API key from groups.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id}/groups -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    removeApiKeyFromGroups(apiKey, body, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove user from groups.
     * An endpoint for removing user from groups.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/users/{user-id}/groups -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param userId The ID of the user to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    removeUserFromGroups(userId, body, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove users from a group.
     * An endpoint for removing users from groups.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id}/users -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group whose users are removed.
     * @param body A list of users to be removed from the group.
     */
    removeUsersFromGroup(groupID, body, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update the group name.
     * An endpoint for updating a group name.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id} -d &#39;{\&quot;name\&quot;: \&quot;TestGroup2\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group to be updated.
     * @param body Details of the group to be created.
     */
    updateGroupName(groupID, body, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Updates attributes of the account.
     * An endpoint for updating the account.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/accounts/me -d &#39;{\&quot;phone_number\&quot;: \&quot;12345678\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body Details of the account to be updated.
     */
    updateMyAccount(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update user details.
     * An endpoint for updating user details.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/users/{user-id} -d &#39;{\&quot;username\&quot;: \&quot;myusername\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param userId The ID of the user whose details are updated.
     * @param body A user object with attributes.
     */
    updateUser(userId, body, callback, requestOptions) {
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
}
/**
 * AggregatorAccountAdminApi
 */
export class AggregatorAccountAdminApi extends ApiBase {
    /**
     * Add API key to a list of groups.
     * An endpoint for adding API key to groups.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    addAccountApiKeyToGroups(accountID, apiKey, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Upload new trusted certificate.
     * An endpoint for uploading new trusted certificates.
     * @param accountID Account ID.
     * @param body A trusted certificate object with attributes, signature is optional.
     */
    addAccountCertificate(accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Add user to a list of groups.
     * An endpoint for adding user to groups.
     * @param accountID Account ID.
     * @param userId The ID of the user to be added to the group.
     * @param body A list of IDs of the groups to be updated.
     */
    addAccountUserToGroups(accountID, userId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Add members to a group.
     * An endpoint for adding users and API keys to groups.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be updated.
     * @param body A list of users and API keys to be added to the group.
     */
    addSubjectsToAccountGroup(accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Check the API key.
     * An endpoint for checking API key.
     * @param accountID Account ID.
     * @param apiKey The API key to be checked.
     */
    checkAccountApiKey(accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Create a new account.
     * An endpoint for creating a new account.
     * @param body Details of the account to be created.
     * @param action Action, either &#39;create&#39; or &#39;enroll&#39;. &lt;ul&gt;&lt;li&gt;&#39;create&#39; creates the account where its admin user has ACTIVE status if admin_password was defined in the request, or RESET status if no admin_password was defined. If the user already exists, its status is not modified. &lt;/li&gt;&lt;li&gt;&#39;enroll&#39; creates the account where its admin user has ENROLLING status. If the user already exists, its status is not modified. Email to finish the enrollment or to notify the existing user about the new account is sent to the admin_email defined in the request. &lt;/li&gt;&lt;/ul&gt;
     */
    createAccount(body, action, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (action !== undefined) {
            queryParameters["action"] = action;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Create a new API key.
     * An endpoint for creating a new API key. There is no default value for the owner ID and it must be from the same account where the new API key is created.
     * @param accountID Account ID.
     * @param body Details of the API key to be created.
     */
    createAccountApiKey(accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Create a new group.
     * An endpoint for creating a new group.
     * @param accountID Account ID.
     * @param body Details of the group to be created.
     */
    createAccountGroup(accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/policy-groups".replace("{" + "accountID" + "}", String(accountID)),
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
    }
    /**
     * Create a new user.
     * An endpoint for creating or inviting a new user to the account. In case of invitation email address is used only, other attributes are set in the 2nd step.
     * @param accountID Account ID.
     * @param body A user object with attributes.
     * @param action Create or invite user.
     */
    createAccountUser(accountID, body, action, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (action !== undefined) {
            queryParameters["action"] = action;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete the API key.
     * An endpoint for deleting an API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be deleted.
     */
    deleteAccountApiKey(accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete trusted certificate by ID.
     * An endpoint for deleting the trusted certificate.
     * @param accountID Account ID.
     * @param certId The ID of the trusted certificate to be deleted.
     */
    deleteAccountCertificate(accountID, certId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete a group.
     * An endpoint for deleting a group.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be deleted.
     */
    deleteAccountGroup(accountID, groupID, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
    /**
     * Delete a user.
     * An endpoint for deleting a user.
     * @param accountID Account ID.
     * @param userId The ID of the user to be deleted.
     */
    deleteAccountUser(accountID, userId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be retrieved.
     */
    getAccountApiKey(accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get trusted certificate by ID.
     * An endpoint for retrieving a trusted certificate by ID.
     * @param accountID Account ID.
     * @param certId The ID of the trusted certificate to be retrieved.
     */
    getAccountCertificate(accountID, certId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get group information.
     * An endpoint for getting general information about the group.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be retrieved.
     */
    getAccountGroupSummary(accountID, groupID, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get account info.
     * Returns detailed information about the account.
     * @param accountID The ID of the account to be fetched.
     * @param include Comma separated additional data to return. Currently supported: limits, policies, sub_accounts
     * @param properties Property name to be returned from account specific properties.
     */
    getAccountInfo(accountID, include, properties, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Details of the user.
     * An endpoint for retrieving details of the user.
     * @param accountID Account ID.
     * @param userId The ID of the user to be retrieved.
     * @param properties Request to return account specific user property values according to the given property name.
     */
    getAccountUser(accountID, userId, properties, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getAllAccountApiKeys(accountID, limit, after, order, include, keyEq, ownerEq, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getAllAccountCertificates(accountID, limit, after, order, include, nameEq, serviceEq, expireEq, deviceExecutionModeEq, deviceExecutionModeNeq, ownerEq, enrollmentModeEq, issuerLike, subjectLike, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getAllAccountGroups(accountID, limit, after, order, include, nameEq, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
     * @param statusIn An optional filter for getting users with a specified set of statuses.
     * @param statusNin An optional filter for excluding users with a specified set of statuses.
     */
    getAllAccountUsers(accountID, limit, after, order, include, emailEq, statusEq, statusIn, statusNin, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        if (statusIn !== undefined) {
            queryParameters["status__in"] = statusIn;
        }
        if (statusNin !== undefined) {
            queryParameters["status__nin"] = statusNin;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get all accounts.
     * Returns an array of account objects, optionally filtered by status and tier level.
     * @param statusEq An optional filter for account status, ENROLLING, ACTIVE, RESTRICTED or SUSPENDED.
     * @param statusIn An optional filter for getting accounts with a specified set of statuses.
     * @param statusNin An optional filter for excluding accounts with a specified set of statuses.
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
    getAllAccounts(statusEq, statusIn, statusNin, tierEq, parentEq, endMarketEq, countryLike, limit, after, order, include, format, properties, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
        if (statusEq !== undefined) {
            queryParameters["status__eq"] = statusEq;
        }
        if (statusIn !== undefined) {
            queryParameters["status__in"] = statusIn;
        }
        if (statusNin !== undefined) {
            queryParameters["status__nin"] = statusNin;
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getApiKeysOfAccountGroup(accountID, groupID, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getGroupsOfAccountApikey(accountID, apiKey, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getGroupsOfAccountUser(accountID, userId, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get users of a group.
     * An endpoint for listing users of the group with details.
     * @param accountID Account ID.
     * @param groupID The ID of the group whose users are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param statusEq An optional filter for getting users by status.
     * @param statusIn An optional filter for getting users with a specified set of statuses.
     * @param statusNin An optional filter for excluding users with a specified set of statuses.
     */
    getUsersOfAccountGroup(accountID, groupID, limit, after, order, include, statusEq, statusIn, statusNin, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        if (statusIn !== undefined) {
            queryParameters["status__in"] = statusIn;
        }
        if (statusNin !== undefined) {
            queryParameters["status__nin"] = statusNin;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove API key from groups.
     * An endpoint for removing API key from groups.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    removeAccountApiKeyFromGroups(accountID, apiKey, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove user from groups.
     * An endpoint for removing user from groups.
     * @param accountID Account ID.
     * @param userId The ID of the user to be removed from the group.
     * @param body A list of IDs of the groups to be updated.
     */
    removeAccountUserFromGroups(accountID, userId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove API keys from a group.
     * An endpoint for removing API keys from groups.
     * @param accountID Account ID.
     * @param groupID A list of API keys to be removed from the group.
     * @param body
     */
    removeApiKeysFromAccountGroup(accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove users from a group.
     * An endpoint for removing users from groups.
     * @param accountID Account ID.
     * @param groupID
     * @param body
     */
    removeUsersFromAccountGroup(accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Reset the secret key.
     * An endpoint for resetting the secret key of the API key.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be reset.
     */
    resetAccountApiKeySecret(accountID, apiKey, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update attributes of an existing account.
     * An endpoint for updating an account.
     * @param accountID The ID of the account to be updated.
     * @param body Details of the account to be updated.
     */
    updateAccount(accountID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update API key details.
     * An endpoint for updating API key details.
     * @param accountID Account ID.
     * @param apiKey The ID of the API key to be updated.
     * @param body New API key attributes to be stored.
     */
    updateAccountApiKey(accountID, apiKey, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update trusted certificate.
     * An endpoint for updating existing trusted certificates.
     * @param accountID Account ID.
     * @param certId The ID of the trusted certificate to be updated.
     * @param body A trusted certificate object with attributes.
     */
    updateAccountCertificate(accountID, certId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update the group name.
     * An endpoint for updating a group name.
     * @param accountID Account ID.
     * @param groupID The ID of the group to be updated.
     * @param body Details of the group to be created.
     */
    updateAccountGroupName(accountID, groupID, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/accounts/{accountID}/policy-groups/{groupID}".replace("{" + "accountID" + "}", String(accountID)).replace("{" + "groupID" + "}", String(groupID)),
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
    }
    /**
     * Update user details.
     * An endpoint for updating user details.
     * @param accountID Account ID.
     * @param userId The ID of the user to be updated.
     * @param body A user object with attributes.
     */
    updateAccountUser(accountID, userId, body, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Validate the user email.
     * An endpoint for validating the user email.
     * @param accountID Account ID.
     * @param userId The ID of the user whose email is validated.
     */
    validateAccountUserEmail(accountID, userId, callback, requestOptions) {
        // verify required parameter "accountID" is set
        if (accountID === null || accountID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'accountID' missing."));
            }
            return;
        }
        // verify required parameter "userId" is set
        if (userId === null || userId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'userId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
}
/**
 * DeveloperApi
 */
export class DeveloperApi extends ApiBase {
    /**
     * Add API key to a list of groups.
     * An endpoint for adding API key to groups.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/api-keys/me/groups -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body A list of IDs of the groups to be updated.
     */
    addMyApiKeyToGroups(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Create a new API key.
     * An endpoint for creating a new API key.   **Example usage:** &#x60;curl -X POST https://api.us-east-1.mbedcloud.com/v3/api-keys -d &#39;{\&quot;name\&quot;: \&quot;MyKey1\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body The details of the API key to be created.
     */
    createApiKey(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete API key.
     * An endpoint for deleting the API key.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be deleted.
     */
    deleteApiKey(apiKey, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Delete a trusted certificate by ID.
     * An endpoint for deleting a trusted certificate.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID of the trusted certificate to be deleted.
     */
    deleteCertificate(certId, callback, requestOptions) {
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
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
    getAllApiKeys(limit, after, order, include, keyEq, ownerEq, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get all trusted certificates.
     * An endpoint for retrieving trusted certificates in an array.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/trusted-certificates -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
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
    getAllCertificates(limit, after, order, include, nameEq, serviceEq, expireEq, deviceExecutionModeEq, deviceExecutionModeNeq, ownerEq, enrollmentModeEq, issuerLike, subjectLike, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get all group information.
     * An endpoint for retrieving all group information.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/policy-groups -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     * @param nameEq Filter for group name
     */
    getAllGroups(limit, after, order, include, nameEq, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be retrieved.
     */
    getApiKey(apiKey, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get the API keys of a group.
     * An endpoint for listing the API keys of the group with details.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id}/api-keys -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group whose API keys are retrieved.
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    getApiKeysOfGroup(groupID, limit, after, order, include, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get trusted certificate by ID.
     * An endpoint for retrieving a trusted certificate by ID.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID of the trusted certificate to be retrieved.
     */
    getCertificate(certId, callback, requestOptions) {
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get group information.
     * An endpoint for getting general information about the group.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id} -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group to be retrieved.
     */
    getGroupSummary(groupID, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get groups of the API key.
     * An endpoint for retrieving groups of the API key.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys/me/groups -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param limit The number of results to return (2-1000), default is 50.
     * @param after The entity ID to fetch after the given one.
     * @param order The order of the records based on creation time, ASC or DESC; by default ASC
     * @param include Comma separated additional data to return. Currently supported: total_count
     */
    getGroupsOfMyApiKey(limit, after, order, include, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
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
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get account info.
     * Returns detailed information about the account.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/accounts/me?include&#x3D;policies -H &#39;Authorization: Bearer API_KEY&#39;&#x60;.
     * @param include Comma separated additional data to return. Currently supported: limits, policies, sub_accounts.
     * @param properties Property name to be returned from account specific properties.
     */
    getMyAccountInfo(include, properties, callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        if (properties !== undefined) {
            queryParameters["properties"] = properties;
        }
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Get API key details.
     * An endpoint for retrieving API key details.   **Example usage:** &#x60;curl https://api.us-east-1.mbedcloud.com/v3/api-keys/me -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     */
    getMyApiKey(callback, requestOptions) {
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove API keys from a group.
     * An endpoint for removing API keys from groups.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/policy-groups/{group-id}/api-keys -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param groupID The ID of the group whose API keys are removed.
     * @param body A list of API keys to be removed from the group.
     */
    removeApiKeysFromGroup(groupID, body, callback, requestOptions) {
        // verify required parameter "groupID" is set
        if (groupID === null || groupID === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'groupID' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Remove API key from groups.
     * An endpoint for removing API key from groups.   **Example usage:** &#x60;curl -X DELETE https://api.us-east-1.mbedcloud.com/v3/api-keys/me/groups -d &#39;[0162056a9a1586f30242590700000000,0117056a9a1586f30242590700000000]&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body A list of IDs of the groups to be updated.
     */
    removeMyApiKeyFromGroups(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update API key details.
     * An endpoint for updating API key details.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/api-keys/{apikey-id} -d &#39;{\&quot;name\&quot;: \&quot;TestApiKey25\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param apiKey The ID of the API key to be updated.
     * @param body New API key attributes to be stored.
     */
    updateApiKey(apiKey, body, callback, requestOptions) {
        // verify required parameter "apiKey" is set
        if (apiKey === null || apiKey === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'apiKey' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update trusted certificate.
     * An endpoint for updating existing trusted certificates.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/trusted-certificates/{cert-id} -d {\&quot;description\&quot;: \&quot;very important cert\&quot;} -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param certId The ID of the trusted certificate to be updated.
     * @param body A trusted certificate object with attributes.
     */
    updateCertificate(certId, body, callback, requestOptions) {
        // verify required parameter "certId" is set
        if (certId === null || certId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'certId' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
    /**
     * Update API key details.
     * An endpoint for updating API key details.   **Example usage:** &#x60;curl -X PUT https://api.us-east-1.mbedcloud.com/v3/api-keys/me -d &#39;{\&quot;name\&quot;: \&quot;TestApiKey25\&quot;}&#39; -H &#39;content-type: application/json&#39; -H &#39;Authorization: Bearer API_KEY&#39;&#x60;
     * @param body New API key attributes to be stored.
     */
    updateMyApiKey(body, callback, requestOptions) {
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        // Determine the Content-Type header
        const contentTypes = [];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
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
    }
}
//# sourceMappingURL=iam.js.map