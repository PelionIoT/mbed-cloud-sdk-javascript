import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { CampaignDeviceMetadata } from "../../index";
import { UpdateCampaignCreateRequest } from "./types";
import { UpdateCampaignListOptions } from "./types";
import { UpdateCampaignUpdateRequest } from "./types";
import { UpdateCampaign } from "./updateCampaign";
/**
 *UpdateCampaign repository
 */
export declare class UpdateCampaignRepository extends Repository {
    /**
     * archive
     * @param id - The campaign ID.
     */
    archive(id: string): Promise<UpdateCampaign>;
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: UpdateCampaignCreateRequest): Promise<UpdateCampaign>;
    /**
     * delete
     * @param id - The campaign ID.
     */
    delete(id: string): Promise<void>;
    /**
     * deviceMetadata
     * @param id - The campaign ID.
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
     * @param id - The campaign ID.
     */
    read(id: string): Promise<UpdateCampaign>;
    /**
     * start
     * @param id - The campaign ID.
     */
    start(id: string): Promise<UpdateCampaign>;
    /**
     * stop
     * @param id - The campaign ID.
     */
    stop(id: string): Promise<UpdateCampaign>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The campaign ID.
     */
    update(request: UpdateCampaignUpdateRequest, id: string): Promise<UpdateCampaign>;
}
