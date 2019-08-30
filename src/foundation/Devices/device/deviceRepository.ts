import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { Device } from "./device";
import { DeviceAddToGroupRequest } from "./types";
import { DeviceAdapter } from "../../index";
import { DeviceCreateRequest } from "./types";
import { extractFilter } from "../../../common/filters";
import { DeviceListOptions } from "./types";
import { DeviceRemoveFromGroupRequest } from "./types";
import { CertificateEnrollment } from "../../index";
import { CertificateEnrollmentAdapter } from "../../index";
import { DeviceUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *Device repository
 */
export class DeviceRepository extends Repository {
    /**
     * addToGroup
     * @param request - The entity to perform action on.
     * @param deviceGroupId - The ID of the group.
     */
    public addToGroup(request: DeviceAddToGroupRequest, deviceGroupId: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-groups/{device-group-id}/devices/add/",
                        method: "POST",
                        pathParams: {
                            "device-group-id": deviceGroupId,
                        },
                        body: {
                            device_id: request.deviceId,
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
    /**
     * create
     * @param request - The entity to perform action on.
     */
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
                            host_gateway: request.hostGateway,
                            issuer_fingerprint: request.issuerFingerprint,
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
                done(null, DeviceAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The ID of the device.
     */
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
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(options?: DeviceListOptions): Paginator<Device, ListOptions> {
        const pageFunc = (pageOptions: DeviceListOptions): Promise<Page<Device>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/devices/",
                            method: "GET",
                            query: {
                                lifecycle_status__eq: extractFilter(pageOptions.filter, "lifecycleStatus", "eq"),
                                lifecycle_status__neq: extractFilter(pageOptions.filter, "lifecycleStatus", "neq"),
                                lifecycle_status__in: extractFilter(pageOptions.filter, "lifecycleStatus", "in"),
                                lifecycle_status__nin: extractFilter(pageOptions.filter, "lifecycleStatus", "nin"),
                                operator_suspended__eq: extractFilter(pageOptions.filter, "operatorSuspended", "eq"),
                                operator_suspended__neq: extractFilter(pageOptions.filter, "operatorSuspended", "neq"),
                                last_operator_suspended_category__eq: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedCategory",
                                    "eq"
                                ),
                                last_operator_suspended_category__neq: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedCategory",
                                    "neq"
                                ),
                                last_operator_suspended_category__in: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedCategory",
                                    "in"
                                ),
                                last_operator_suspended_category__nin: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedCategory",
                                    "nin"
                                ),
                                last_operator_suspended_updated_at__in: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedUpdatedAt",
                                    "in"
                                ),
                                last_operator_suspended_updated_at__nin: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedUpdatedAt",
                                    "nin"
                                ),
                                last_operator_suspended_updated_at__lte: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedUpdatedAt",
                                    "lte"
                                ),
                                last_operator_suspended_updated_at__gte: extractFilter(
                                    pageOptions.filter,
                                    "lastOperatorSuspendedUpdatedAt",
                                    "gte"
                                ),
                                system_suspended__eq: extractFilter(pageOptions.filter, "systemSuspended", "eq"),
                                system_suspended__neq: extractFilter(pageOptions.filter, "systemSuspended", "neq"),
                                last_system_suspended_category__eq: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedCategory",
                                    "eq"
                                ),
                                last_system_suspended_category__neq: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedCategory",
                                    "neq"
                                ),
                                last_system_suspended_category__in: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedCategory",
                                    "in"
                                ),
                                last_system_suspended_category__nin: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedCategory",
                                    "nin"
                                ),
                                last_system_suspended_updated_at__in: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedUpdatedAt",
                                    "in"
                                ),
                                last_system_suspended_updated_at__nin: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedUpdatedAt",
                                    "nin"
                                ),
                                last_system_suspended_updated_at__lte: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedUpdatedAt",
                                    "lte"
                                ),
                                last_system_suspended_updated_at__gte: extractFilter(
                                    pageOptions.filter,
                                    "lastSystemSuspendedUpdatedAt",
                                    "gte"
                                ),
                                account_id__eq: extractFilter(pageOptions.filter, "accountId", "eq"),
                                account_id__neq: extractFilter(pageOptions.filter, "accountId", "neq"),
                                account_id__in: extractFilter(pageOptions.filter, "accountId", "in"),
                                account_id__nin: extractFilter(pageOptions.filter, "accountId", "nin"),
                                auto_update__eq: extractFilter(pageOptions.filter, "autoUpdate", "eq"),
                                auto_update__neq: extractFilter(pageOptions.filter, "autoUpdate", "neq"),
                                bootstrap_expiration_date__in: extractFilter(
                                    pageOptions.filter,
                                    "bootstrapExpirationDate",
                                    "in"
                                ),
                                bootstrap_expiration_date__nin: extractFilter(
                                    pageOptions.filter,
                                    "bootstrapExpirationDate",
                                    "nin"
                                ),
                                bootstrap_expiration_date__lte: extractFilter(
                                    pageOptions.filter,
                                    "bootstrapExpirationDate",
                                    "lte"
                                ),
                                bootstrap_expiration_date__gte: extractFilter(
                                    pageOptions.filter,
                                    "bootstrapExpirationDate",
                                    "gte"
                                ),
                                bootstrapped_timestamp__in: extractFilter(
                                    pageOptions.filter,
                                    "bootstrappedTimestamp",
                                    "in"
                                ),
                                bootstrapped_timestamp__nin: extractFilter(
                                    pageOptions.filter,
                                    "bootstrappedTimestamp",
                                    "nin"
                                ),
                                bootstrapped_timestamp__lte: extractFilter(
                                    pageOptions.filter,
                                    "bootstrappedTimestamp",
                                    "lte"
                                ),
                                bootstrapped_timestamp__gte: extractFilter(
                                    pageOptions.filter,
                                    "bootstrappedTimestamp",
                                    "gte"
                                ),
                                ca_id__eq: extractFilter(pageOptions.filter, "caId", "eq"),
                                ca_id__neq: extractFilter(pageOptions.filter, "caId", "neq"),
                                ca_id__in: extractFilter(pageOptions.filter, "caId", "in"),
                                ca_id__nin: extractFilter(pageOptions.filter, "caId", "nin"),
                                connector_expiration_date__in: extractFilter(
                                    pageOptions.filter,
                                    "connectorExpirationDate",
                                    "in"
                                ),
                                connector_expiration_date__nin: extractFilter(
                                    pageOptions.filter,
                                    "connectorExpirationDate",
                                    "nin"
                                ),
                                connector_expiration_date__lte: extractFilter(
                                    pageOptions.filter,
                                    "connectorExpirationDate",
                                    "lte"
                                ),
                                connector_expiration_date__gte: extractFilter(
                                    pageOptions.filter,
                                    "connectorExpirationDate",
                                    "gte"
                                ),
                                created_at__in: extractFilter(pageOptions.filter, "createdAt", "in"),
                                created_at__nin: extractFilter(pageOptions.filter, "createdAt", "nin"),
                                created_at__lte: extractFilter(pageOptions.filter, "createdAt", "lte"),
                                created_at__gte: extractFilter(pageOptions.filter, "createdAt", "gte"),
                                deployed_state__eq: extractFilter(pageOptions.filter, "deployedState", "eq"),
                                deployed_state__neq: extractFilter(pageOptions.filter, "deployedState", "neq"),
                                deployed_state__in: extractFilter(pageOptions.filter, "deployedState", "in"),
                                deployed_state__nin: extractFilter(pageOptions.filter, "deployedState", "nin"),
                                deployment__eq: extractFilter(pageOptions.filter, "deployment", "eq"),
                                deployment__neq: extractFilter(pageOptions.filter, "deployment", "neq"),
                                deployment__in: extractFilter(pageOptions.filter, "deployment", "in"),
                                deployment__nin: extractFilter(pageOptions.filter, "deployment", "nin"),
                                description__eq: extractFilter(pageOptions.filter, "description", "eq"),
                                description__neq: extractFilter(pageOptions.filter, "description", "neq"),
                                description__in: extractFilter(pageOptions.filter, "description", "in"),
                                description__nin: extractFilter(pageOptions.filter, "description", "nin"),
                                device_class__eq: extractFilter(pageOptions.filter, "deviceClass", "eq"),
                                device_class__neq: extractFilter(pageOptions.filter, "deviceClass", "neq"),
                                device_class__in: extractFilter(pageOptions.filter, "deviceClass", "in"),
                                device_class__nin: extractFilter(pageOptions.filter, "deviceClass", "nin"),
                                device_execution_mode__eq: extractFilter(
                                    pageOptions.filter,
                                    "deviceExecutionMode",
                                    "eq"
                                ),
                                device_execution_mode__neq: extractFilter(
                                    pageOptions.filter,
                                    "deviceExecutionMode",
                                    "neq"
                                ),
                                device_execution_mode__in: extractFilter(
                                    pageOptions.filter,
                                    "deviceExecutionMode",
                                    "in"
                                ),
                                device_execution_mode__nin: extractFilter(
                                    pageOptions.filter,
                                    "deviceExecutionMode",
                                    "nin"
                                ),
                                device_key__eq: extractFilter(pageOptions.filter, "deviceKey", "eq"),
                                device_key__neq: extractFilter(pageOptions.filter, "deviceKey", "neq"),
                                device_key__in: extractFilter(pageOptions.filter, "deviceKey", "in"),
                                device_key__nin: extractFilter(pageOptions.filter, "deviceKey", "nin"),
                                endpoint_name__eq: extractFilter(pageOptions.filter, "endpointName", "eq"),
                                endpoint_name__neq: extractFilter(pageOptions.filter, "endpointName", "neq"),
                                endpoint_name__in: extractFilter(pageOptions.filter, "endpointName", "in"),
                                endpoint_name__nin: extractFilter(pageOptions.filter, "endpointName", "nin"),
                                endpoint_type__eq: extractFilter(pageOptions.filter, "endpointType", "eq"),
                                endpoint_type__neq: extractFilter(pageOptions.filter, "endpointType", "neq"),
                                endpoint_type__in: extractFilter(pageOptions.filter, "endpointType", "in"),
                                endpoint_type__nin: extractFilter(pageOptions.filter, "endpointType", "nin"),
                                enrolment_list_timestamp__in: extractFilter(
                                    pageOptions.filter,
                                    "enrolmentListTimestamp",
                                    "in"
                                ),
                                enrolment_list_timestamp__nin: extractFilter(
                                    pageOptions.filter,
                                    "enrolmentListTimestamp",
                                    "nin"
                                ),
                                enrolment_list_timestamp__lte: extractFilter(
                                    pageOptions.filter,
                                    "enrolmentListTimestamp",
                                    "lte"
                                ),
                                enrolment_list_timestamp__gte: extractFilter(
                                    pageOptions.filter,
                                    "enrolmentListTimestamp",
                                    "gte"
                                ),
                                firmware_checksum__eq: extractFilter(pageOptions.filter, "firmwareChecksum", "eq"),
                                firmware_checksum__neq: extractFilter(pageOptions.filter, "firmwareChecksum", "neq"),
                                firmware_checksum__in: extractFilter(pageOptions.filter, "firmwareChecksum", "in"),
                                firmware_checksum__nin: extractFilter(pageOptions.filter, "firmwareChecksum", "nin"),
                                host_gateway__eq: extractFilter(pageOptions.filter, "hostGateway", "eq"),
                                host_gateway__neq: extractFilter(pageOptions.filter, "hostGateway", "neq"),
                                host_gateway__in: extractFilter(pageOptions.filter, "hostGateway", "in"),
                                host_gateway__nin: extractFilter(pageOptions.filter, "hostGateway", "nin"),
                                id__eq: extractFilter(pageOptions.filter, "id", "eq"),
                                id__neq: extractFilter(pageOptions.filter, "id", "neq"),
                                id__in: extractFilter(pageOptions.filter, "id", "in"),
                                id__nin: extractFilter(pageOptions.filter, "id", "nin"),
                                manifest__eq: extractFilter(pageOptions.filter, "manifest", "eq"),
                                manifest__neq: extractFilter(pageOptions.filter, "manifest", "neq"),
                                manifest__in: extractFilter(pageOptions.filter, "manifest", "in"),
                                manifest__nin: extractFilter(pageOptions.filter, "manifest", "nin"),
                                manifest_timestamp__in: extractFilter(pageOptions.filter, "manifestTimestamp", "in"),
                                manifest_timestamp__nin: extractFilter(pageOptions.filter, "manifestTimestamp", "nin"),
                                manifest_timestamp__lte: extractFilter(pageOptions.filter, "manifestTimestamp", "lte"),
                                manifest_timestamp__gte: extractFilter(pageOptions.filter, "manifestTimestamp", "gte"),
                                mechanism__eq: extractFilter(pageOptions.filter, "mechanism", "eq"),
                                mechanism__neq: extractFilter(pageOptions.filter, "mechanism", "neq"),
                                mechanism__in: extractFilter(pageOptions.filter, "mechanism", "in"),
                                mechanism__nin: extractFilter(pageOptions.filter, "mechanism", "nin"),
                                mechanism_url__eq: extractFilter(pageOptions.filter, "mechanismUrl", "eq"),
                                mechanism_url__neq: extractFilter(pageOptions.filter, "mechanismUrl", "neq"),
                                mechanism_url__in: extractFilter(pageOptions.filter, "mechanismUrl", "in"),
                                mechanism_url__nin: extractFilter(pageOptions.filter, "mechanismUrl", "nin"),
                                name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                                name__neq: extractFilter(pageOptions.filter, "name", "neq"),
                                name__in: extractFilter(pageOptions.filter, "name", "in"),
                                name__nin: extractFilter(pageOptions.filter, "name", "nin"),
                                serial_number__eq: extractFilter(pageOptions.filter, "serialNumber", "eq"),
                                serial_number__neq: extractFilter(pageOptions.filter, "serialNumber", "neq"),
                                serial_number__in: extractFilter(pageOptions.filter, "serialNumber", "in"),
                                serial_number__nin: extractFilter(pageOptions.filter, "serialNumber", "nin"),
                                state__eq: extractFilter(pageOptions.filter, "state", "eq"),
                                state__neq: extractFilter(pageOptions.filter, "state", "neq"),
                                state__in: extractFilter(pageOptions.filter, "state", "in"),
                                state__nin: extractFilter(pageOptions.filter, "state", "nin"),
                                updated_at__in: extractFilter(pageOptions.filter, "updatedAt", "in"),
                                updated_at__nin: extractFilter(pageOptions.filter, "updatedAt", "nin"),
                                updated_at__lte: extractFilter(pageOptions.filter, "updatedAt", "lte"),
                                updated_at__gte: extractFilter(pageOptions.filter, "updatedAt", "gte"),
                                vendor_id__eq: extractFilter(pageOptions.filter, "vendorId", "eq"),
                                vendor_id__neq: extractFilter(pageOptions.filter, "vendorId", "neq"),
                                vendor_id__in: extractFilter(pageOptions.filter, "vendorId", "in"),
                                vendor_id__nin: extractFilter(pageOptions.filter, "vendorId", "nin"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<Device>, done) => {
                    done(null, new Page(data, data.data, DeviceAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the device. The device ID is used across all Device Management APIs.
     */
    public read(id: string): Promise<Device> {
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
    /**
     * removeFromGroup
     * @param request - The entity to perform action on.
     * @param deviceGroupId - The ID of the group.
     */
    public removeFromGroup(request: DeviceRemoveFromGroupRequest, deviceGroupId: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-groups/{device-group-id}/devices/remove/",
                        method: "POST",
                        pathParams: {
                            "device-group-id": deviceGroupId,
                        },
                        body: {
                            device_id: request.deviceId,
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
    /**
     * renewCertificate
     * @param certificateName - The certificate name.
     * @param id - The certificate enrollment ID.
     */
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
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the device. The device ID is used across all Device Management APIs.
     */
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
                done(null, DeviceAdapter.fromApi(data, request));
            }
        );
    }
}
