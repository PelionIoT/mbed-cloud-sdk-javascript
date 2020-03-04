import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { PresubscriptionObject } from "../types";
export declare const listPresubscriptions: (endpoints: Endpoints, callback?: CallbackFn<PresubscriptionObject[]>) => Promise<PresubscriptionObject[]>;
export declare const updatePresubscriptions: (endpoints: Endpoints, subscriptions: PresubscriptionObject[], callback?: CallbackFn<void>) => Promise<void>;
export declare const deletePresubscriptions: (endpoints: Endpoints, callback?: CallbackFn<void>) => Promise<void>;
