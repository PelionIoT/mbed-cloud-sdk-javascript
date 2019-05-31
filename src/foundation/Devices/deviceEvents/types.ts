import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEventsDeviceEventsDateTimeFilter
 */
export interface DeviceEventsDeviceEventsDateTimeFilter {
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
 *DeviceEventsDeviceEventsDescriptionFilter
 */
export interface DeviceEventsDeviceEventsDescriptionFilter {
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
 *DeviceEventsDeviceEventsIdFilter
 */
export interface DeviceEventsDeviceEventsIdFilter {
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
 *DeviceEventsDeviceEventsDeviceIdFilter
 */
export interface DeviceEventsDeviceEventsDeviceIdFilter {
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
 *DeviceEventsDeviceEventsEventTypeFilter
 */
export interface DeviceEventsDeviceEventsEventTypeFilter {
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
 *DeviceEventsDeviceEventsStateChangeFilter
 */
export interface DeviceEventsDeviceEventsStateChangeFilter {
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
 *DeviceEventsDeviceEventsFilter
 */
export interface DeviceEventsDeviceEventsFilter {
    /**
     *Filter by dateTime on DeviceEvents
     */
    dateTime?: DeviceEventsDeviceEventsDateTimeFilter;

    /**
     *Filter by description on DeviceEvents
     */
    description?: string | DeviceEventsDeviceEventsDescriptionFilter;

    /**
     *Filter by id on DeviceEvents
     */
    id?: string | DeviceEventsDeviceEventsIdFilter;

    /**
     *Filter by deviceId on DeviceEvents
     */
    deviceId?: string | DeviceEventsDeviceEventsDeviceIdFilter;

    /**
     *Filter by eventType on DeviceEvents
     */
    eventType?: string | DeviceEventsDeviceEventsEventTypeFilter;

    /**
     *Filter by stateChange on DeviceEvents
     */
    stateChange?: boolean | DeviceEventsDeviceEventsStateChangeFilter;
}
/**
 *DeviceEventsDeviceEventsListOptions
 */
export interface DeviceEventsDeviceEventsListOptions extends ListOptions {
    /**
     *Filter for DeviceEvents
     */
    filter?: DeviceEventsDeviceEventsFilter;
}
