import { PresubscriptionObject as Presubscription } from "../types";
import { Presubscription as apiPresubscription } from "../../_api/mds";
/**
 * Presubscription Adapter
 */
export declare class PresubscriptionAdapter {
    static map(from: apiPresubscription): Presubscription;
    static reverseMap(from: Presubscription): apiPresubscription;
}
