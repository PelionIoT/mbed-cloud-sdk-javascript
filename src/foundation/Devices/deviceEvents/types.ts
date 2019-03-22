import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEventsDateTimeFilter
 */
export interface DeviceEventsDateTimeFilter {
    /**
     *in
     */
    in?: Array<Date>;

    /**
     *nin
     */
    nin?: Array<Date>;

    /**
     *lte
     */
    lte?: Array<Date>;

    /**
     *gte
     */
    gte?: Array<Date>;
}
/**
 *DeviceEventsDescriptionFilter
 */
export interface DeviceEventsDescriptionFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEventsIdFilter
 */
export interface DeviceEventsIdFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEventsDeviceIdFilter
 */
export interface DeviceEventsDeviceIdFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEventsEventTypeFilter
 */
export interface DeviceEventsEventTypeFilter {
    /**
     *eq
     */
    eq?: string;

    /**
     *neq
     */
    neq?: string;

    /**
     *in
     */
    in?: Array<string>;

    /**
     *nin
     */
    nin?: Array<string>;
}
/**
 *DeviceEventsStateChangeFilter
 */
export interface DeviceEventsStateChangeFilter {
    /**
     *eq
     */
    eq?: boolean;

    /**
     *neq
     */
    neq?: boolean;

    /**
     *in
     */
    in?: Array<boolean>;

    /**
     *nin
     */
    nin?: Array<boolean>;
}
/**
 *DeviceEventsFilter
 */
export interface DeviceEventsFilter {
    /**
     *dateTime
     */
    dateTime?: DeviceEventsDateTimeFilter;

    /**
     *description
     */
    description?: string | DeviceEventsDescriptionFilter;

    /**
     *id
     */
    id?: string | DeviceEventsIdFilter;

    /**
     *deviceId
     */
    deviceId?: string | DeviceEventsDeviceIdFilter;

    /**
     *eventType
     */
    eventType?: string | DeviceEventsEventTypeFilter;

    /**
     *stateChange
     */
    stateChange?: boolean | DeviceEventsStateChangeFilter;
}
/**
 *DeviceEventsListOptions
 */
export interface DeviceEventsListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: DeviceEventsFilter;
}
