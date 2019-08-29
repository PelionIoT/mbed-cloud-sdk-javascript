import { Adapter } from "../../../common/adapter";
import { Device } from "./device";
/**
 *Device adapter
 */
export class DeviceAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): Device {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE",
            accountId: data.account_id,
            autoUpdate: data.auto_update,
            bootstrapExpirationDate: data.bootstrap_expiration_date,
            bootstrappedTimestamp: data.bootstrapped_timestamp,
            caId: data.ca_id,
            connectorExpirationDate: data.connector_expiration_date,
            createdAt: data.created_at,
            customAttributes: data.custom_attributes,
            deployedState: data.deployed_state,
            deployment: data.deployment,
            description: data.description,
            deviceClass: data.device_class,
            deviceExecutionMode: data.device_execution_mode || 0,
            deviceKey: data.device_key,
            endpointName: data.endpoint_name,
            endpointType: data.endpoint_type,
            enrolmentListTimestamp: data.enrolment_list_timestamp,
            firmwareChecksum: data.firmware_checksum,
            groups: data.groups,
            hostGateway: data.host_gateway,
            id: data.id,
            issuerFingerprint: data.issuer_fingerprint,
            lastOperatorSuspendedCategory: data.last_operator_suspended_category,
            lastOperatorSuspendedDescription: data.last_operator_suspended_description,
            lastOperatorSuspendedUpdatedAt: data.last_operator_suspended_updated_at,
            lastSystemSuspendedCategory: data.last_system_suspended_category,
            lastSystemSuspendedDescription: data.last_system_suspended_description,
            lastSystemSuspendedUpdatedAt: data.last_system_suspended_updated_at,
            lifecycleStatus: data.lifecycle_status,
            manifest: data.manifest,
            manifestTimestamp: data.manifest_timestamp,
            mechanism: data.mechanism,
            mechanismUrl: data.mechanism_url,
            name: data.name,
            operatorSuspended: data.operator_suspended,
            serialNumber: data.serial_number,
            state: data.state,
            systemSuspended: data.system_suspended,
            updatedAt: data.updated_at,
            vendorId: data.vendor_id,
        });
        return mappedEntity;
    }
}
