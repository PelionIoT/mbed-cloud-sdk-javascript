import { ListOptions } from "../../../common";
export type UpdateCampaignStrategy = "one-shot" | "continuous";
export type UpdateCampaignPhase =
    | "draft"
    | "awaiting_approval"
    | "timed"
    | "starting"
    | "active"
    | "stopping"
    | "stopped"
    | "deleted"
    | "archived";
/**
 *UpdateCampaignCreateRequest
 */
export interface UpdateCampaignCreateRequest {
    /**
     *Flag indicating whether approval is needed to start the campaign.
     *@example false
     */
    readonly approvalRequired?: boolean;

    /**
     *Flag indicating whether the campaign should be auto-stopped on reaching a threshold.
     *@example false
     */
    readonly autostop?: boolean;

    /**
     *Percent of successful device updates to auto stop the campaign.
     *@example 85.00
     */
    readonly autostopSuccessPercent?: number;

    /**
     *How the campaign adds devices. A `one-shot` campaign does not add new devices after it has started. A `continuous` campaign means that devices may be added to the campaign after it has started. The default is `one-shot`.
     */
    readonly campaignStrategy?: UpdateCampaignStrategy;

    /**
     *An optional description of the campaign.
     *@example This campaign updates Class XX devices to version 1.34
     */
    readonly description?: string;

    /**
     *The filter for the devices the campaign is targeting at.
     *@example id__eq=00000000000000000000000000000000
     */
    readonly deviceFilter?: string;

    /**
     *The campaign name.
     *@example campaign
     */
    readonly name?: string;

    /**
     *The ID of the manifest that will be sent to the device as part of the campaign.
     *@example 00000000000000000000000000000000
     */
    readonly rootManifestId?: string;
}
/**
 *UpdateCampaignUpdateRequest
 */
export interface UpdateCampaignUpdateRequest {
    /**
     *Flag indicating whether approval is needed to start the campaign.
     *@example false
     */
    readonly approvalRequired?: boolean;

    /**
     *Flag indicating whether the campaign should be auto-stopped on reaching a threshold.
     *@example false
     */
    readonly autostop?: boolean;

    /**
     *Percent of successful device updates to auto stop the campaign.
     *@example 85.00
     */
    readonly autostopSuccessPercent?: number;

    /**
     *An optional description of the campaign.
     *@example This campaign updates Class XX devices to version 1.34
     */
    readonly description?: string;

    /**
     *The filter for the devices the campaign is targeting at.
     *@example id__eq=00000000000000000000000000000000
     */
    readonly deviceFilter?: string;

    /**
     *The campaign name.
     *@example campaign
     */
    readonly name?: string;

    /**
     *The ID of the manifest that will be sent to the device as part of the campaign.
     *@example 00000000000000000000000000000000
     */
    readonly rootManifestId?: string;
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
