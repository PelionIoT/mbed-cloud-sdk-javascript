import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { UpdateCampaign } from "./updateCampaign";
import { UpdateCampaignAdapter } from "../../index";
import { UpdateCampaignCreateRequest } from "./types";
import { CampaignDeviceMetadata } from "../../index";
import { CampaignDeviceMetadataAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { UpdateCampaignListOptions } from "./types";
import { UpdateCampaignUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *UpdateCampaign repository
 */
export class UpdateCampaignRepository extends Repository {
    /**
     * archive
     * @param id - The campaign ID.
     */
    public archive(id: string): Promise<UpdateCampaign> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}/archive",
                        method: "POST",
                        pathParams: {
                            campaign_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UpdateCampaignAdapter.fromApi(data));
            }
        );
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    public create(request: UpdateCampaignCreateRequest): Promise<UpdateCampaign> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns",
                        method: "POST",
                        body: {
                            approval_required: request.approvalRequired,
                            autostop: request.autostop,
                            autostop_success_percent: request.autostopSuccessPercent,
                            campaign_strategy: request.campaignStrategy,
                            description: request.description,
                            device_filter: request.deviceFilter,
                            name: request.name,
                            root_manifest_id: request.rootManifestId,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UpdateCampaignAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The campaign ID.
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}",
                        method: "DELETE",
                        pathParams: {
                            campaign_id: id,
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
     * deviceMetadata
     * @param id - The campaign ID.
     * @param options - options
     */
    public deviceMetadata(id: string, options?: ListOptions): Paginator<CampaignDeviceMetadata, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<CampaignDeviceMetadata>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/update-campaigns/{campaign_id}/campaign-device-metadata",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                campaign_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<CampaignDeviceMetadata>, done) => {
                    done(null, new Page(data, data.data, CampaignDeviceMetadataAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(options?: UpdateCampaignListOptions): Paginator<UpdateCampaign, ListOptions> {
        const pageFunc = (pageOptions: UpdateCampaignListOptions): Promise<Page<UpdateCampaign>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/update-campaigns",
                            method: "GET",
                            query: {
                                created_at__in: extractFilter(pageOptions.filter, "createdAt", "in"),
                                created_at__nin: extractFilter(pageOptions.filter, "createdAt", "nin"),
                                created_at__lte: extractFilter(pageOptions.filter, "createdAt", "lte"),
                                created_at__gte: extractFilter(pageOptions.filter, "createdAt", "gte"),
                                description__eq: extractFilter(pageOptions.filter, "description", "eq"),
                                description__neq: extractFilter(pageOptions.filter, "description", "neq"),
                                description__in: extractFilter(pageOptions.filter, "description", "in"),
                                description__nin: extractFilter(pageOptions.filter, "description", "nin"),
                                device_filter__eq: extractFilter(pageOptions.filter, "deviceFilter", "eq"),
                                device_filter__neq: extractFilter(pageOptions.filter, "deviceFilter", "neq"),
                                device_filter__in: extractFilter(pageOptions.filter, "deviceFilter", "in"),
                                device_filter__nin: extractFilter(pageOptions.filter, "deviceFilter", "nin"),
                                finished__in: extractFilter(pageOptions.filter, "finished", "in"),
                                finished__nin: extractFilter(pageOptions.filter, "finished", "nin"),
                                finished__lte: extractFilter(pageOptions.filter, "finished", "lte"),
                                finished__gte: extractFilter(pageOptions.filter, "finished", "gte"),
                                id__eq: extractFilter(pageOptions.filter, "id", "eq"),
                                id__neq: extractFilter(pageOptions.filter, "id", "neq"),
                                id__in: extractFilter(pageOptions.filter, "id", "in"),
                                id__nin: extractFilter(pageOptions.filter, "id", "nin"),
                                name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                                name__neq: extractFilter(pageOptions.filter, "name", "neq"),
                                name__in: extractFilter(pageOptions.filter, "name", "in"),
                                name__nin: extractFilter(pageOptions.filter, "name", "nin"),
                                root_manifest_id__eq: extractFilter(pageOptions.filter, "rootManifestId", "eq"),
                                root_manifest_id__neq: extractFilter(pageOptions.filter, "rootManifestId", "neq"),
                                root_manifest_id__in: extractFilter(pageOptions.filter, "rootManifestId", "in"),
                                root_manifest_id__nin: extractFilter(pageOptions.filter, "rootManifestId", "nin"),
                                started_at__in: extractFilter(pageOptions.filter, "startedAt", "in"),
                                started_at__nin: extractFilter(pageOptions.filter, "startedAt", "nin"),
                                started_at__lte: extractFilter(pageOptions.filter, "startedAt", "lte"),
                                started_at__gte: extractFilter(pageOptions.filter, "startedAt", "gte"),
                                state__eq: extractFilter(pageOptions.filter, "state", "eq"),
                                state__neq: extractFilter(pageOptions.filter, "state", "neq"),
                                state__in: extractFilter(pageOptions.filter, "state", "in"),
                                state__nin: extractFilter(pageOptions.filter, "state", "nin"),
                                updated_at__in: extractFilter(pageOptions.filter, "updatedAt", "in"),
                                updated_at__nin: extractFilter(pageOptions.filter, "updatedAt", "nin"),
                                updated_at__lte: extractFilter(pageOptions.filter, "updatedAt", "lte"),
                                updated_at__gte: extractFilter(pageOptions.filter, "updatedAt", "gte"),
                                when__in: extractFilter(pageOptions.filter, "when", "in"),
                                when__nin: extractFilter(pageOptions.filter, "when", "nin"),
                                when__lte: extractFilter(pageOptions.filter, "when", "lte"),
                                when__gte: extractFilter(pageOptions.filter, "when", "gte"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<UpdateCampaign>, done) => {
                    done(null, new Page(data, data.data, UpdateCampaignAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The campaign ID.
     */
    public read(id: string): Promise<UpdateCampaign> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}",
                        method: "GET",
                        pathParams: {
                            campaign_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UpdateCampaignAdapter.fromApi(data));
            }
        );
    }
    /**
     * start
     * @param id - The campaign ID.
     */
    public start(id: string): Promise<UpdateCampaign> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}/start",
                        method: "POST",
                        pathParams: {
                            campaign_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UpdateCampaignAdapter.fromApi(data));
            }
        );
    }
    /**
     * stop
     * @param id - The campaign ID.
     */
    public stop(id: string): Promise<UpdateCampaign> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}/stop",
                        method: "POST",
                        pathParams: {
                            campaign_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UpdateCampaignAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The campaign ID.
     */
    public update(request: UpdateCampaignUpdateRequest, id: string): Promise<UpdateCampaign> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/update-campaigns/{campaign_id}",
                        method: "PUT",
                        pathParams: {
                            campaign_id: id,
                        },
                        body: {
                            approval_required: request.approvalRequired,
                            autostop: request.autostop,
                            autostop_success_percent: request.autostopSuccessPercent,
                            description: request.description,
                            device_filter: request.deviceFilter,
                            name: request.name,
                            root_manifest_id: request.rootManifestId,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UpdateCampaignAdapter.fromApi(data, request));
            }
        );
    }
}
