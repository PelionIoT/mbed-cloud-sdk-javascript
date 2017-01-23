import { PresubscriptionType } from "./types";
import { Presubscription as apiPresubscription } from "../_api/mds";
export declare class Presubscription {
    constructor(options: PresubscriptionType);
    static map(from: apiPresubscription): Presubscription;
    static reverseMap(from: PresubscriptionType): apiPresubscription;
}
export interface Presubscription extends PresubscriptionType {
}
