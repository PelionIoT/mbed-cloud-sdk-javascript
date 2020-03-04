import { FeaturePolicy as apiPolicy } from "../../_api/iam";
import { Policy } from "./policy";
/**
 * Policy Adapter
 */
export declare class PolicyAdapter {
    static map(from: apiPolicy): Policy;
}
