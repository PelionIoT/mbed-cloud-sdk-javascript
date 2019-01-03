import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Device } from "./device";
import { DeviceCreateRequest } from "./types";
import { DeviceAdapter } from "./deviceAdapter";
import { CertificateEnrollment } from "../../Security/certificateEnrollment";
import { DeviceUpdateRequest } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions, OrderEnum } from "../../../../common/interfaces";
/**
 *Device repository
 */
export class DeviceRepository extends Repository {
    public create(request: DeviceCreateRequest): Promise<Device> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/devices/",
                        method: "POST",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/devices/{id}/",
                        method: "DELETE",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string): Promise<Device> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/devices/{id}/",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public list(options?: {
        after?: string;
        include?: string;
        limit?: number;
        order?: OrderEnum;
    }): Paginator<Device, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Device>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/devices/",
                            method: "GET",
                            query: { after, include, order, limit },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<Device>, done) => {
                    done(null, new ListResponse(data, data.data, DeviceAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public renewCertificate(certificateName: string, id: string): Promise<CertificateEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/devices/{device-id}/certificates/{certificate-name}/renew",
                        method: "POST",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public update(request: DeviceUpdateRequest, id: string): Promise<Device> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/devices/{id}/",
                        method: "PUT",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
