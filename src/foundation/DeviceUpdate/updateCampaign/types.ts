import { ListOptions } from "../../../common";
/**
 *UpdateCampaignCreateRequest
 */
export interface UpdateCampaignCreateRequest {
    /**
     *An optional description of the campaign
     */
    readonly description?: string;

    /**
     *The filter for the devices the campaign is targeting at
     *@example id__eq=00000000000000000000000000000000
     */
    readonly deviceFilter?: string;

    /**
     *The campaign name
     *@example campaign
     */
    readonly name?: string;

    /**
     *rootManifestId
     *@example 00000000000000000000000000000000
     */
    readonly rootManifestId?: string;

    /**
     *The scheduled start time for the campaign. The campaign will start within 1 minute when then start time has elapsed.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly when?: Date;
}
/**
 *UpdateCampaignUpdateRequest
 */
export interface UpdateCampaignUpdateRequest {
    /**
     *An optional description of the campaign
     */
    readonly description?: string;

    /**
     *The filter for the devices the campaign is targeting at
     *@example id__eq=00000000000000000000000000000000
     */
    readonly deviceFilter?: string;

    /**
     *The campaign name
     *@example campaign
     */
    readonly name?: string;

    /**
     *rootManifestId
     *@example 00000000000000000000000000000000
     */
    readonly rootManifestId?: string;

    /**
     *The scheduled start time for the campaign. The campaign will start within 1 minute when then start time has elapsed.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly when?: Date;
}
/**
 *UpdateCampaignCreatedAtFilter
 */
export interface UpdateCampaignCreatedAtFilter {
    /**
     *createdAt in
     */
    in?: Array<Date>;

    /**
     *createdAt not in
     */
    nin?: Array<Date>;

    /**
     *createdAt less than
     */
    lte?: Array<Date>;

    /**
     *createdAt greater than
     */
    gte?: Array<Date>;
}
/**
 *UpdateCampaignDescriptionFilter
 */
export interface UpdateCampaignDescriptionFilter {
    /**
     *description equal to
     */
    eq?: string;

    /**
     *description not equal to
     */
    neq?: string;

    /**
     *description in
     */
    in?: Array<string>;

    /**
     *description not in
     */
    nin?: Array<string>;
}
/**
 *UpdateCampaignDeviceFilterFilter
 */
export interface UpdateCampaignDeviceFilterFilter {
    /**
     *deviceFilter equal to
     */
    eq?: string;

    /**
     *deviceFilter not equal to
     */
    neq?: string;

    /**
     *deviceFilter in
     */
    in?: Array<string>;

    /**
     *deviceFilter not in
     */
    nin?: Array<string>;
}
/**
 *UpdateCampaignFinishedFilter
 */
export interface UpdateCampaignFinishedFilter {
    /**
     *finished in
     */
    in?: Array<Date>;

    /**
     *finished not in
     */
    nin?: Array<Date>;

    /**
     *finished less than
     */
    lte?: Array<Date>;

    /**
     *finished greater than
     */
    gte?: Array<Date>;
}
/**
 *UpdateCampaignIdFilter
 */
export interface UpdateCampaignIdFilter {
    /**
     *id equal to
     */
    eq?: string;

    /**
     *id not equal to
     */
    neq?: string;

    /**
     *id in
     */
    in?: Array<string>;

    /**
     *id not in
     */
    nin?: Array<string>;
}
/**
 *UpdateCampaignNameFilter
 */
export interface UpdateCampaignNameFilter {
    /**
     *name equal to
     */
    eq?: string;

    /**
     *name not equal to
     */
    neq?: string;

    /**
     *name in
     */
    in?: Array<string>;

    /**
     *name not in
     */
    nin?: Array<string>;
}
/**
 *UpdateCampaignRootManifestIdFilter
 */
export interface UpdateCampaignRootManifestIdFilter {
    /**
     *rootManifestId equal to
     */
    eq?: string;

    /**
     *rootManifestId not equal to
     */
    neq?: string;

    /**
     *rootManifestId in
     */
    in?: Array<string>;

    /**
     *rootManifestId not in
     */
    nin?: Array<string>;
}
/**
 *UpdateCampaignStartedAtFilter
 */
export interface UpdateCampaignStartedAtFilter {
    /**
     *startedAt in
     */
    in?: Array<Date>;

    /**
     *startedAt not in
     */
    nin?: Array<Date>;

    /**
     *startedAt less than
     */
    lte?: Array<Date>;

    /**
     *startedAt greater than
     */
    gte?: Array<Date>;
}
/**
 *UpdateCampaignStateFilter
 */
export interface UpdateCampaignStateFilter {
    /**
     *state equal to
     */
    eq?: string;

    /**
     *state not equal to
     */
    neq?: string;

    /**
     *state in
     */
    in?: Array<string>;

    /**
     *state not in
     */
    nin?: Array<string>;
}
/**
 *UpdateCampaignUpdatedAtFilter
 */
export interface UpdateCampaignUpdatedAtFilter {
    /**
     *updatedAt in
     */
    in?: Array<Date>;

    /**
     *updatedAt not in
     */
    nin?: Array<Date>;

    /**
     *updatedAt less than
     */
    lte?: Array<Date>;

    /**
     *updatedAt greater than
     */
    gte?: Array<Date>;
}
/**
 *UpdateCampaignWhenFilter
 */
export interface UpdateCampaignWhenFilter {
    /**
     *when in
     */
    in?: Array<Date>;

    /**
     *when not in
     */
    nin?: Array<Date>;

    /**
     *when less than
     */
    lte?: Array<Date>;

    /**
     *when greater than
     */
    gte?: Array<Date>;
}
/**
 *UpdateCampaignFilter
 */
export interface UpdateCampaignFilter {
    /**
     *Filter by createdAt on UpdateCampaign
     */
    createdAt?: UpdateCampaignCreatedAtFilter;

    /**
     *Filter by description on UpdateCampaign
     */
    description?: string | UpdateCampaignDescriptionFilter;

    /**
     *Filter by deviceFilter on UpdateCampaign
     */
    deviceFilter?: string | UpdateCampaignDeviceFilterFilter;

    /**
     *Filter by finished on UpdateCampaign
     */
    finished?: UpdateCampaignFinishedFilter;

    /**
     *Filter by id on UpdateCampaign
     */
    id?: string | UpdateCampaignIdFilter;

    /**
     *Filter by name on UpdateCampaign
     */
    name?: string | UpdateCampaignNameFilter;

    /**
     *Filter by rootManifestId on UpdateCampaign
     */
    rootManifestId?: string | UpdateCampaignRootManifestIdFilter;

    /**
     *Filter by startedAt on UpdateCampaign
     */
    startedAt?: UpdateCampaignStartedAtFilter;

    /**
     *Filter by state on UpdateCampaign
     */
    state?: string | UpdateCampaignStateFilter;

    /**
     *Filter by updatedAt on UpdateCampaign
     */
    updatedAt?: UpdateCampaignUpdatedAtFilter;

    /**
     *Filter by when on UpdateCampaign
     */
    when?: UpdateCampaignWhenFilter;
}
/**
 *UpdateCampaignListOptions
 */
export interface UpdateCampaignListOptions extends ListOptions {
    /**
     *Filter for UpdateCampaign
     */
    filter?: UpdateCampaignFilter;
}
