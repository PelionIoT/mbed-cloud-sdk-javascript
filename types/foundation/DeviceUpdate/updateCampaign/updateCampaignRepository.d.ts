import { Repository } from "../../../common/repository";
import { UpdateCampaign } from "./updateCampaign";
import { UpdateCampaignCreateRequest } from "./types";
import { CampaignDeviceMetadata } from "../../index";
import { UpdateCampaignListOptions } from "./types";
import { UpdateCampaignUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *UpdateCampaign repository
 */
export declare class UpdateCampaignRepository extends Repository {
    /**
     * archive
     * @param id - The campaign ID
     */
    archive(id: string): Promise<UpdateCampaign>;
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: UpdateCampaignCreateRequest): Promise<UpdateCampaign>;
    /**
     * delete
     * @param id - The ID of the update campaign
     */
    delete(id: string): Promise<void>;
    /**
     * deviceMetadata
     * @param id - The update campaign ID
     * @param options - options
     */
    deviceMetadata(id: string, options?: ListOptions): Paginator<CampaignDeviceMetadata, ListOptions>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: UpdateCampaignListOptions): Paginator<UpdateCampaign, ListOptions>;
    /**
     * read
     * @param id - The campaign ID
     */
    read(id: string): Promise<UpdateCampaign>;
    /**
     * start
     * @param id - The campaign ID
     */
    start(id: string): Promise<UpdateCampaign>;
    /**
     * stop
     * @param id - The campaign ID
     */
    stop(id: string): Promise<UpdateCampaign>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The campaign ID
     */
    update(request: UpdateCampaignUpdateRequest, id: string): Promise<UpdateCampaign>;
}
