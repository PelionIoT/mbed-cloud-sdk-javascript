import { Presubscription as apiPresubscription } from "../../_api/mds";
import { PresubscriptionObject as Presubscription } from "../types";
/**
 * Presubscription Adapter
 */
export declare class PresubscriptionAdapter {
    static map(from: apiPresubscription): Presubscription;
    static reverseMap(from: Presubscription): apiPresubscription;
}
