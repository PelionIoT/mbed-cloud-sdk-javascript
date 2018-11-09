import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { CertificateEnrollment } from "../../index";
import { DeviceDeployedStateEnum } from "../../enums";
import { DeviceMechanismEnum } from "../../enums";
import { DeviceStateEnum } from "../../enums";

import { CrudEntity } from "../../../common/crudEntity";

/**
 * Device
 */
export class Device extends EntityBase implements CrudEntity<Device> {
    /**
     * The ID of the associated account.
     */
    public accountId?: string;

    /**
     * DEPRECATED: Mark this device for automatic firmware update.
     */
    public autoUpdate?: boolean;

    /**
     * The expiration date of the certificate used to connect to bootstrap server.
     */
    public bootstrapExpirationDate?: Date;

    /**
     * The timestamp of the device&#39;s most recent bootstrap process.
     */
    public bootstrappedTimestamp?: Date;

    /**
     * The certificate issuer&#39;s ID.
     */
    public caId?: string;

    /**
     * The expiration date of the certificate used to connect to LwM2M server.
     */
    public connectorExpirationDate?: Date;

    /**
     * The timestamp of when the device was created in the device directory.
     */
    public createdAt?: Date;

    /**
     * Up to five custom key-value attributes.
     */
    public customAttributes?: { [key: string]: string };

    /**
     * DEPRECATED: The state of the device&#39;s deployment.
     */
    public deployedState?: DeviceDeployedStateEnum;

    /**
     * DEPRECATED: The last deployment used on the device.
     */
    public deployment?: string;

    /**
     * The description of the device.
     */
    public description?: string;

    /**
     * An ID representing the model and hardware revision of the device.
     */
    public deviceClass?: string;

    /**
            * The execution mode from the certificate of the device. Defaults to inheriting from host_gateway device.
Permitted values:
  - 0 - unspecified execution mode (default if host_gateway invalid or not set)
  - 1 - development devices
  - 5 - production devices
            */
    public deviceExecutionMode?: number;

    /**
     * The fingerprint of the device certificate.
     */
    public deviceKey?: string;

    /**
     * The endpoint name given to the device.
     */
    public endpointName?: string;

    /**
     * The endpoint type of the device. For example, the device is a gateway.
     */
    public endpointType?: string;

    /**
     * The claim date/time.
     */
    public enrolmentListTimestamp?: Date;

    /**
     * The SHA256 checksum of the current firmware image.
     */
    public firmwareChecksum?: string;

    /**
     * The `endpoint_name` of the host gateway, if appropriate.
     */
    public hostGateway?: string;

    /**
     * DEPRECATED: The URL for the current device manifest.
     */
    public manifest?: string;

    /**
     * The timestamp of the current manifest version.
     */
    public manifestTimestamp?: Date;

    /**
     * The ID of the channel used to communicate with the device.
     */
    public mechanism?: DeviceMechanismEnum;

    /**
     * The address of the connector to use.
     */
    public mechanismUrl?: string;

    /**
     * The name of the device.
     */
    public name?: string;

    /**
     * The serial number of the device.
     */
    public serialNumber?: string;

    /**
     * The current state of the device.
     */
    public state?: DeviceStateEnum;

    /**
     * The time the object was updated.
     */
    public updatedAt?: Date;

    /**
     * The device vendor ID.
     */
    public vendorId?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a Device.
     * @returns Promise containing Device.
     */
    public create(): Promise<Device> {
        const body = {
            auto_update: this.autoUpdate,
            bootstrap_expiration_date: this.bootstrapExpirationDate,
            bootstrapped_timestamp: this.bootstrappedTimestamp,
            ca_id: this.caId,
            connector_expiration_date: this.connectorExpirationDate,
            custom_attributes: this.customAttributes,
            deployment: this.deployment,
            description: this.description,
            device_class: this.deviceClass,
            device_execution_mode: this.deviceExecutionMode,
            device_key: this.deviceKey,
            endpoint_name: this.endpointName,
            endpoint_type: this.endpointType,
            firmware_checksum: this.firmwareChecksum,
            host_gateway: this.hostGateway,
            manifest: this.manifest,
            mechanism: this.mechanism,
            mechanism_url: this.mechanismUrl,
            name: this.name,
            serial_number: this.serialNumber,
            state: this.state,
            vendor_id: this.vendorId,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Device>(
                    {
                        url: "/v3/devices/",
                        method: "POST",
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * deletes a Device.
     * @returns Promise containing Device.
     */
    public delete(): Promise<Device> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Device>(
                    {
                        url: "/v3/devices/{id}/",
                        method: "DELETE",
                        pathParams: {
                            id: this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a Device.
     * @returns Promise containing Device.
     */
    public get(): Promise<Device> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Device>(
                    {
                        url: "/v3/devices/{id}/",
                        method: "GET",
                        pathParams: {
                            id: this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List Devices
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<Device, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Device>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<Device>(
                        {
                            url: "/v3/devices/",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        Device,
                        resultsFn
                    );
                },
                (data: ListResponse<Device>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * renewCertificates a CertificateEnrollment.
     * @returns Promise containing CertificateEnrollment.
     */
    public renewCertificate(certificateName: string): Promise<CertificateEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<CertificateEnrollment>(
                    {
                        url: "/v3/devices/{device-id}/certificates/{certificate-name}/renew",
                        method: "POST",
                        pathParams: {
                            "certificate-name": certificateName,
                            "device-id": this.id,
                        },
                    },
                    CertificateEnrollment,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * updates a Device.
     * @returns Promise containing Device.
     */
    public update(): Promise<Device> {
        const body = {
            auto_update: this.autoUpdate,
            ca_id: this.caId,
            custom_attributes: this.customAttributes,
            description: this.description,
            device_key: this.deviceKey,
            endpoint_name: this.endpointName,
            endpoint_type: this.endpointType,
            host_gateway: this.hostGateway,
            name: this.name,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<Device>(
                    {
                        url: "/v3/devices/{id}/",
                        method: "PUT",
                        pathParams: {
                            id: this.id,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
