import { Repository } from "../../../common/repository";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentCreateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEnrollment repository
 */
export declare class DeviceEnrollmentRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: DeviceEnrollmentCreateRequest): Promise<DeviceEnrollment>;
    /**
     * delete
     * @param id - Enrollment identity.
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<DeviceEnrollment, ListOptions>;
    /**
     * read
     * @param id - Enrollment identity.
     */
    read(id: string): Promise<DeviceEnrollment>;
}
