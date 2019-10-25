import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantTrustedCertificateAdapter } from "../../index";
import { DeveloperCertificateAdapter } from "../../index";
/**
 *SubtenantTrustedCertificate repository
 */
export class SubtenantTrustedCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    create(request, accountId) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    certificate: request.certificate,
                    description: request.description,
                    enrollment_mode: request.enrollmentMode,
                    name: request.name,
                    service: request.service,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantTrustedCertificateAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the trusted certificate to delete.
     */
    delete(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    cert_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * getDeveloperCertificateInfo
     * @param id - ID that uniquely identifies the developer certificate.
     */
    getDeveloperCertificateInfo(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/developer-certificates/{developerCertificateId}",
                method: "GET",
                pathParams: {
                    developerCertificateId: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DeveloperCertificateAdapter.fromApi(data));
        });
    }
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - Entity ID.
     */
    read(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    cert_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantTrustedCertificateAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - Entity ID.
     */
    update(request, accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    cert_id: id,
                },
                body: {
                    certificate: request.certificate,
                    description: request.description,
                    enrollment_mode: request.enrollmentMode,
                    name: request.name,
                    service: request.service,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantTrustedCertificateAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=subtenantTrustedCertificateRepository.js.map