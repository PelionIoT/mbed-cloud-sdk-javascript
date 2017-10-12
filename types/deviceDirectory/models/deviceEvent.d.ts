/**
 * Device Event
 */
export declare class DeviceEvent {
    /**
     * ID of the event
     */
    readonly id: string;
    /**
     * Date and time of the event
     */
    readonly eventDate: Date;
    /**
     * ID of device the event is for
     */
    readonly deviceId?: string;
    /**
     * Whether the event changed state
     */
    readonly stateChanged?: boolean;
    /**
     * Description of the event
     */
    readonly description?: string;
    /**
     * Changes made
     */
    readonly changes?: {};
    /**
     * Description of the event type
     */
    readonly typeDescription?: string;
    /**
     * Type of the event
     */
    readonly type?: string;
    /**
     * Data pertaining to the event
     */
    readonly data?: {};
    constructor(init?: Partial<DeviceEvent>);
}
