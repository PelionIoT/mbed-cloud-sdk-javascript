import { DeviceStateType } from "./types";
import { CampaignDeviceMetadataSerializer as apiDeviceState } from "../_api/deployment_service";
export declare class DeviceState {
    constructor(options: DeviceStateType);
    static map(from: apiDeviceState): DeviceState;
}
export interface DeviceState extends DeviceStateType {
}
