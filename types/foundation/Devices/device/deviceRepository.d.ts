import { Repository } from "../../../common/repository";
import { Device } from "./device";
import { DeviceAddToGroupRequest } from "./types";
import { DeviceCreateRequest } from "./types";
import { DeviceListOptions } from "./types";
import { DeviceRemoveFromGroupRequest } from "./types";
import { CertificateEnrollment } from "../../index";
import { DeviceUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *Device repository
 */
export declare class DeviceRepository extends Repository {
    /**
     * addToGroup
     * @param request - The entity to perform action on.
     * @param deviceGroupId - The ID of the group.
     */
    addToGroup(request: DeviceAddToGroupRequest, deviceGroupId: string): Promise<void>;
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: DeviceCreateRequest): Promise<Device>;
    /**
     * delete
     * @param id - id
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: DeviceListOptions): Paginator<Device, ListOptions>;
    /**
     * read
     * @param id - The ID of the device. The device ID is used across all Device Management APIs.
     */
    read(id: string): Promise<Device>;
    /**
     * removeFromGroup
     * @param request - The entity to perform action on.
     * @param deviceGroupId - The ID of the group.
     */
    removeFromGroup(request: DeviceRemoveFromGroupRequest, deviceGroupId: string): Promise<void>;
    /**
     * renewCertificate
     * @param certificateName - The certificate name.
     * @param id - The certificate enrollment ID.
     */
    renewCertificate(certificateName: string, id: string): Promise<CertificateEnrollment>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the device. The device ID is used across all Device Management APIs.
     */
    update(request: DeviceUpdateRequest, id: string): Promise<Device>;
}
