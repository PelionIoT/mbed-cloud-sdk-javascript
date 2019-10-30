/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";
/**
 * PublicAPIApi
 */
export class PublicAPIApi extends ApiBase {
    /**
     * Bulk upload
     * With bulk upload you can upload a CSV file containing a number of enrollment IDs.  **Example usage:** &#x60;&#x60;&#x60; curl -X POST \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ -F &#39;enrollment_identities&#x3D;@/path/to/enrollments/enrollments.csv&#39; \\ https://api.us-east-1.mbedcloud.com/v3/device-enrollments-bulk-uploads  &#x60;&#x60;&#x60; **Example csv File:** 1. First line is assumed to be the header. Content of the header is not validated. 2. Each line can contain comma separated values where 1st value is always assumed to be the Enrollment ID. 3. Only one enrollment ID is expected in one line. 4. Valid Enrollments begins with A followed by a - and 95 charactors in the format as given below. 5. Valid Enrollment identities may be enclosed with in quotes. 6. UTF-8 encoding is expected.  &#x60;&#x60;&#x60; \&quot;enrollment_identity\&quot; \&quot;A-4E:63:2D:AE:14:BC:D1:09:77:21:95:44:ED:34:06:57:1E:03:B1:EF:0E:F2:59:44:71:93:23:22:15:43:23:12\&quot;, \&quot;A-4E:63:2D:AE:14:BC:D1:09:77:21:95:44:ED:34:06:57:1E:03:B1:EF:0E:F2:59:25:48:44:71:22:15:43:23:12\&quot;,  &#x60;&#x60;&#x60;
     * @param enrollmentIdentities Enrollment identities CSV file. Maximum file size is 10MB.
     */
    createBulkDeviceEnrollment(enrollmentIdentities, callback, requestOptions) {
        // verify required parameter "enrollmentIdentities" is set
        if (enrollmentIdentities === null || enrollmentIdentities === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'enrollmentIdentities' missing."));
            }
            return;
        }
        const headerParams = {};
        const queryParameters = {};
        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams = {};
        if (enrollmentIdentities !== undefined) {
            formParams["enrollment_identities"] = enrollmentIdentities;
        }
        useFormData = true;
        // Determine the Content-Type header
        const contentTypes = [
            "multipart/form-data",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/device-enrollments-bulk-uploads",
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
     * Place an enrollment claim for one or several devices.
     * When the device connects to the bootstrap server and provides the enrollment ID, it will be assigned to your account. &lt;br&gt; **Example usage:** &#x60;&#x60;&#x60; curl -X POST \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ -H &#39;content-type: application/json&#39; \\ https://api.us-east-1.mbedcloud.com/v3/device-enrollments \\ -d &#39;{\&quot;enrollment_identity\&quot;: \&quot;A-35:e7:72:8a:07:50:3b:3d:75:96:57:52:72:41:0d:78:cc:c6:e5:53:48:c6:65:58:5b:fa:af:4d:2d:73:95:c5\&quot;}&#39; &#x60;&#x60;&#x60;
     * @param enrollmentIdentity
     */
    createDeviceEnrollment(enrollmentIdentity, callback, requestOptions) {
        // verify required parameter "enrollmentIdentity" is set
        if (enrollmentIdentity === null || enrollmentIdentity === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'enrollmentIdentity' missing."));
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
            url: "/v3/device-enrollments",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: enrollmentIdentity,
        }, callback);
    }
    /**
     * Delete an enrollment by ID.
     * To free a device from your account you can delete the enrollment claim. To bypass the device ownership, you need to delete the enrollment and do a factory reset for the device. For more information, see [Transferring the ownership using First-to-Claim](/docs/current/connecting/device-ownership.html). &lt;br&gt; **Example usage:** &#x60;&#x60;&#x60; curl -X DELETE \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ https://api.us-east-1.mbedcloud.com/v3/device-enrollments/{id} &#x60;&#x60;&#x60;
     * @param id Enrollment identity.
     */
    deleteDeviceEnrollment(id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'id' missing."));
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
            url: "/v3/device-enrollments/{id}".replace("{" + "id" + "}", String(id)),
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
     * Get bulk upload entity
     * Provides info about bulk upload for the given ID. For example bulk status and processed count of enrollment identities. Info includes also links for the bulk upload reports. **Example usage:** &#x60;&#x60;&#x60; curl -X GET \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ https://api.us-east-1.mbedcloud.com/v3/device-enrollments-bulk-uploads/{id} &#x60;&#x60;&#x60;
     * @param id Bulk create task entity ID
     */
    getBulkDeviceEnrollment(id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'id' missing."));
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
            url: "/v3/device-enrollments-bulk-uploads/{id}".replace("{" + "id" + "}", String(id)),
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
     * Get details of an enrollment by ID.
     * To check the enrollment info in detail, for example date of claim and expiration date. **Example usage:** &#x60;&#x60;&#x60; curl -X GET \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ https://api.us-east-1.mbedcloud.com/v3/device-enrollments/{id} &#x60;&#x60;&#x60;
     * @param id Enrollment identity.
     */
    getDeviceEnrollment(id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'id' missing."));
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
            url: "/v3/device-enrollments/{id}".replace("{" + "id" + "}", String(id)),
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
     * Get enrollment list.
     * Provides a list of pending and claimed enrollments. **Example usage:** &#x60;&#x60;&#x60; curl -X GET \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ https://api.us-east-1.mbedcloud.com/v3/device-enrollments &#x60;&#x60;&#x60; With query parameters: &#x60;&#x60;&#x60; curl -X GET \\ -H &#39;Authorization: Bearer &lt;valid access token&gt;&#39; \\ &#39;https://api.us-east-1.mbedcloud.com/v3/device-enrollments?limit&#x3D;10&#39; &#x60;&#x60;&#x60;
     * @param limit Number of results to be returned. Between 2 and 1000, inclusive.
     * @param after Entity ID to fetch after.
     * @param order ASC or DESC
     * @param include Comma-separated additional data to return. Currently supported: total_count.
     */
    getDeviceEnrollments(limit, after, order, include, callback, requestOptions) {
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
        const contentTypes = [
            "application/json",
        ];
        // Determine the Accept header
        const acceptTypes = [
            "application/json",
        ];
        return this.request({
            url: "/v3/device-enrollments",
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
}
//# sourceMappingURL=enrollment.js.map