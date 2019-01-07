import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Device } from "./device";
import { DeviceAdapter } from "../../index";
import { DeviceCreateRequest } from "./types";
import { CertificateEnrollment } from "../../index";
import { CertificateEnrollmentAdapter } from "../../index";
import { DeviceUpdateRequest } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
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
                        body: {
                            auto_update: request.autoUpdate,
                            bootstrap_expiration_date: request.bootstrapExpirationDate,
                            bootstrapped_timestamp: request.bootstrappedTimestamp,
                            ca_id: request.caId,
                            connector_expiration_date: request.connectorExpirationDate,
                            custom_attributes: request.customAttributes,
                            deployment: request.deployment,
                            description: request.description,
                            device_class: request.deviceClass,
                            device_execution_mode: request.deviceExecutionMode,
                            device_key: request.deviceKey,
                            endpoint_name: request.endpointName,
                            endpoint_type: request.endpointType,
                            firmware_checksum: request.firmwareChecksum,
                            host_gateway: request.hostGateway,
                            manifest: request.manifest,
                            mechanism: request.mechanism,
                            mechanism_url: request.mechanismUrl,
                            name: request.name,
                            serial_number: request.serialNumber,
                            state: request.state,
                            vendor_id: request.vendorId,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceAdapter.fromApi(data));
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
                        pathParams: {
                            id: id,
                        },
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
                        pathParams: {
                            id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceAdapter.fromApi(data));
            }
        );
    }
    public list(options?: ListOptions): Paginator<Device, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Device>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/devices/",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
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
                        pathParams: {
                            "certificate-name": certificateName,
                            "device-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CertificateEnrollmentAdapter.fromApi(data));
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
                        pathParams: {
                            id: id,
                        },
                        body: {
                            auto_update: request.autoUpdate,
                            ca_id: request.caId,
                            custom_attributes: request.customAttributes,
                            description: request.description,
                            device_key: request.deviceKey,
                            endpoint_name: request.endpointName,
                            endpoint_type: request.endpointType,
                            host_gateway: request.hostGateway,
                            name: request.name,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceAdapter.fromApi(data));
            }
        );
    }
}
