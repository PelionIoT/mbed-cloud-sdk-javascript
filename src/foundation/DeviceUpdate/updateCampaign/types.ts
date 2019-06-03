import { ListOptions } from "../../../legacy/common/interfaces";
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
 *UpdateCampaignUpdateCampaignCreatedAtFilter
 */
export interface UpdateCampaignUpdateCampaignCreatedAtFilter {
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
 *UpdateCampaignUpdateCampaignDescriptionFilter
 */
export interface UpdateCampaignUpdateCampaignDescriptionFilter {
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
 *UpdateCampaignUpdateCampaignDeviceFilterFilter
 */
export interface UpdateCampaignUpdateCampaignDeviceFilterFilter {
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
 *UpdateCampaignUpdateCampaignFinishedFilter
 */
export interface UpdateCampaignUpdateCampaignFinishedFilter {
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
 *UpdateCampaignUpdateCampaignIdFilter
 */
export interface UpdateCampaignUpdateCampaignIdFilter {
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
 *UpdateCampaignUpdateCampaignNameFilter
 */
export interface UpdateCampaignUpdateCampaignNameFilter {
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
 *UpdateCampaignUpdateCampaignRootManifestIdFilter
 */
export interface UpdateCampaignUpdateCampaignRootManifestIdFilter {
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
 *UpdateCampaignUpdateCampaignStartedAtFilter
 */
export interface UpdateCampaignUpdateCampaignStartedAtFilter {
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
 *UpdateCampaignUpdateCampaignStateFilter
 */
export interface UpdateCampaignUpdateCampaignStateFilter {
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
 *UpdateCampaignUpdateCampaignUpdatedAtFilter
 */
export interface UpdateCampaignUpdateCampaignUpdatedAtFilter {
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
 *UpdateCampaignUpdateCampaignWhenFilter
 */
export interface UpdateCampaignUpdateCampaignWhenFilter {
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
 *UpdateCampaignUpdateCampaignFilter
 */
export interface UpdateCampaignUpdateCampaignFilter {
    /**
     *Filter by createdAt on UpdateCampaign
     */
    createdAt?: UpdateCampaignUpdateCampaignCreatedAtFilter;

    /**
     *Filter by description on UpdateCampaign
     */
    description?: string | UpdateCampaignUpdateCampaignDescriptionFilter;

    /**
     *Filter by deviceFilter on UpdateCampaign
     */
    deviceFilter?: string | UpdateCampaignUpdateCampaignDeviceFilterFilter;

    /**
     *Filter by finished on UpdateCampaign
     */
    finished?: UpdateCampaignUpdateCampaignFinishedFilter;

    /**
     *Filter by id on UpdateCampaign
     */
    id?: string | UpdateCampaignUpdateCampaignIdFilter;

    /**
     *Filter by name on UpdateCampaign
     */
    name?: string | UpdateCampaignUpdateCampaignNameFilter;

    /**
     *Filter by rootManifestId on UpdateCampaign
     */
    rootManifestId?: string | UpdateCampaignUpdateCampaignRootManifestIdFilter;

    /**
     *Filter by startedAt on UpdateCampaign
     */
    startedAt?: UpdateCampaignUpdateCampaignStartedAtFilter;

    /**
     *Filter by state on UpdateCampaign
     */
    state?: string | UpdateCampaignUpdateCampaignStateFilter;

    /**
     *Filter by updatedAt on UpdateCampaign
     */
    updatedAt?: UpdateCampaignUpdateCampaignUpdatedAtFilter;

    /**
     *Filter by when on UpdateCampaign
     */
    when?: UpdateCampaignUpdateCampaignWhenFilter;
}
/**
 *UpdateCampaignUpdateCampaignListOptions
 */
export interface UpdateCampaignUpdateCampaignListOptions extends ListOptions {
    /**
     *Filter for UpdateCampaign
     */
    filter?: UpdateCampaignUpdateCampaignFilter;
}
