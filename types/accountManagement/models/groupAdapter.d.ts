import { GroupSummary as apiGroup } from "../../_api/iam";
import { AccountManagementApi } from "../accountManagementApi";
import { Group } from "./group";
/**
 * Group Adapter
 */
export declare class GroupAdapter {
    static map(from: apiGroup, api: AccountManagementApi): Group;
}
