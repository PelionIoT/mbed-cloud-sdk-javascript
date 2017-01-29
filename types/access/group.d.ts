import { GroupType } from "./types";
import { GroupSummary as apiGroup } from "../_api/iam";
export declare class Group {
    constructor(options: GroupType);
    static map(from: apiGroup): Group;
}
export interface Group extends GroupType {
}
