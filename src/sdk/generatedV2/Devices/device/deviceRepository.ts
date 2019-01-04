import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Device } from "./device";
import { DeviceCreateRequest } from "./types";
import { CertificateEnrollment } from "../../Security/certificateEnrollment";
import { DeviceUpdateRequest } from "./types";
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
            (_data, done) => {
                done(null, null);
            }
        );
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
