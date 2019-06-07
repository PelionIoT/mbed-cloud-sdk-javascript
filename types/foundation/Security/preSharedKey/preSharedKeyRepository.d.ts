import { Repository } from "../../../common/repository";
import { PreSharedKey } from "./preSharedKey";
import { PreSharedKeyCreateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *PreSharedKey repository
 */
export declare class PreSharedKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: PreSharedKeyCreateRequest): Promise<PreSharedKey>;
    /**
     * delete
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<PreSharedKey, ListOptions>;
    /**
     * read
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    read(id: string): Promise<PreSharedKey>;
}
