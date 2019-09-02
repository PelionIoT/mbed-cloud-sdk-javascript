import { AddPreSharedKey } from "../types";
import { BootstrapApi } from "../bootstrapApi";
import { CallbackFn } from "../../common/interfaces";
export declare class PreSharedKey {
    private readonly _api;
    /**
     * Creation time.
     */
    readonly createdAt?: Date;
    constructor(init: Partial<PreSharedKey>, _api: BootstrapApi);
    /**
     * Delete this PSK.
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete this PSK.
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface PreSharedKey extends AddPreSharedKey {
}
