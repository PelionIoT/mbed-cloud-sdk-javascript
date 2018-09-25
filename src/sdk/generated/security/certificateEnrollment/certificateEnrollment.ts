import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { ConnectionOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
/**
* CertificateEnrollment.
*/
export class CertificateEnrollment extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        "certificate-enrollment-id": "certificateEnrollmentId",
    };
    /**
    * The certificate name.
    */
    public certificateName?: string;
    /**
    * Creation UTC time RFC3339.
    */
    public createdAt?: Date;
    /**
    * The device ID.
    */
    public deviceId?: string;
    /**
    * enrollResult.
    */
    public enrollResult?: string;
    /**
    * enrollStatus.
    */
    public enrollStatus?: string;
    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }
    /**
    * gets a CertificateEnrollment.
    * @returns Promise containing CertificateEnrollment.
    */
    public get(certificateEnrollmentId: string): Promise<CertificateEnrollment> {
        return apiWrapper(resultsFn => {
            Client._CallApi<CertificateEnrollment>({
                url: "/v3/certificate-enrollments/{certificate-enrollment-id}",
                method: "GET",
                pathParams: {
                    "certificate-enrollment-id": certificateEnrollmentId,
                },
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * List CertificateEnrollments
    * @param options filter options
    */
    public list(options?: ListOptions): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateEnrollment>> => {
            return apiWrapper(resultsFn => {
                const { limit, after, order, include } = pageOptions as ListOptions;
                Client._CallApi<CertificateEnrollment>({
                    url: "/v3/certificate-enrollments",
                    method: "GET",
                    query: { after, include, order, limit },
                    config: this.config,
                    paginated: true,
                }, new CertificateEnrollment(), resultsFn);
            }, (data: ListResponse<CertificateEnrollment>, done) => {
                done(null, new ListResponse(data, data.data));
            });
        };
        return new Paginator(pageFunc, options);
    }
    /**
    * List CertificateEnrollments
    * @param options filter options
    */
    public paginateList(options?: ListOptions): Paginator<CertificateEnrollment, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<CertificateEnrollment>> => {
            return apiWrapper(resultsFn => {
                const { limit, after, order, include } = pageOptions as ListOptions;
                Client._CallApi<CertificateEnrollment>({
                    url: "/v3/certificate-enrollments",
                    method: "GET",
                    query: { after, include, order, limit },
                    config: this.config,
                    paginated: true,
                }, new CertificateEnrollment(), resultsFn);
            }, (data: ListResponse<CertificateEnrollment>, done) => {
                done(null, new ListResponse(data, data.data));
            });
        };
        return new Paginator(pageFunc, options);
    }
}