import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEventsDateTimeFilter
 */
export interface DeviceEventsDateTimeFilter {
    /**
     *dateTime in
     */
    in?: Array<Date>;
    /**
     *dateTime not in
     */
    nin?: Array<Date>;
    /**
     *dateTime less than
     */
    lte?: Array<Date>;
    /**
     *dateTime greater than
     */
    gte?: Array<Date>;
}
/**
 *DeviceEventsDescriptionFilter
 */
export interface DeviceEventsDescriptionFilter {
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
 *DeviceEventsIdFilter
 */
export interface DeviceEventsIdFilter {
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
 *DeviceEventsDeviceIdFilter
 */
export interface DeviceEventsDeviceIdFilter {
    /**
     *deviceId equal to
     */
    eq?: string;
    /**
     *deviceId not equal to
     */
    neq?: string;
    /**
     *deviceId in
     */
    in?: Array<string>;
    /**
     *deviceId not in
     */
    nin?: Array<string>;
}
/**
 *DeviceEventsEventTypeFilter
 */
export interface DeviceEventsEventTypeFilter {
    /**
     *eventType equal to
     */
    eq?: string;
    /**
     *eventType not equal to
     */
    neq?: string;
    /**
     *eventType in
     */
    in?: Array<string>;
    /**
     *eventType not in
     */
    nin?: Array<string>;
}
/**
 *DeviceEventsStateChangeFilter
 */
export interface DeviceEventsStateChangeFilter {
    /**
     *stateChange equal to
     */
    eq?: boolean;
    /**
     *stateChange not equal to
     */
    neq?: boolean;
}
/**
 *DeviceEventsFilter
 */
export interface DeviceEventsFilter {
    /**
     *Filter by dateTime on DeviceEvents
     */
    dateTime?: DeviceEventsDateTimeFilter;
    /**
     *Filter by description on DeviceEvents
     */
    description?: string | DeviceEventsDescriptionFilter;
    /**
     *Filter by id on DeviceEvents
     */
    id?: string | DeviceEventsIdFilter;
    /**
     *Filter by deviceId on DeviceEvents
     */
    deviceId?: string | DeviceEventsDeviceIdFilter;
    /**
     *Filter by eventType on DeviceEvents
     */
    eventType?: string | DeviceEventsEventTypeFilter;
    /**
     *Filter by stateChange on DeviceEvents
     */
    stateChange?: boolean | DeviceEventsStateChangeFilter;
}
/**
 *DeviceEventsListOptions
 */
export interface DeviceEventsListOptions extends ListOptions {
    /**
     *Filter for DeviceEvents
     */
    filter?: DeviceEventsFilter;
}
