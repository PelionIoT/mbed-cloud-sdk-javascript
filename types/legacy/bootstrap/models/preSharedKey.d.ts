import { CallbackFn } from "../../common/interfaces";
import { BootstrapApi } from "../bootstrapApi";
import { AddPreSharedKey } from "../types";
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
