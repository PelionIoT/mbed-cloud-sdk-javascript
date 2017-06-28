import { CallbackFn } from "../../common/interfaces";
import { ConnectApi } from "../connectApi";
import { Resource } from "./resource";
/**
 * Connected Device
 */
export declare class ConnectedDevice {
    private _api;
    /**
     * The ID of the device
     */
    readonly id: string;
    /**
     * Determines whether the device is in queue mode.
     */
    readonly queueMode?: boolean;
    /**
     * Type of endpoint. (Free text)
     */
    readonly type?: string;
    constructor(init?: Partial<ConnectedDevice>, _api?: ConnectApi);
    /**
     * List device's resources
     * @returns Promise of device resources
     */
    listResources(): Promise<Array<Resource>>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    listResources(callback: CallbackFn<Array<Resource>>): void;
    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    listSubscriptions(): Promise<any>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    listSubscriptions(callback: CallbackFn<any>): void;
    /**
     * Removes a device's subscriptions
     * @returns Promise containing any error
     */
    deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    deleteSubscriptions(callback: CallbackFn<void>): void;
}
