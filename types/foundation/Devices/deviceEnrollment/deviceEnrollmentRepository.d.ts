import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { DeviceEnrollment } from "./deviceEnrollment";
import { DeviceEnrollmentCreateRequest } from "./types";
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
