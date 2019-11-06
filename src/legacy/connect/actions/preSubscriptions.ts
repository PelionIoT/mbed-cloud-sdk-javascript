import { apiWrapper } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { Endpoints } from "../endpoints";
import { PresubscriptionAdapter } from "../models/presubscriptionAdapter";
import { PresubscriptionObject } from "../types";

export const listPresubscriptions = (
    endpoints: Endpoints,
    callback?: CallbackFn<Array<PresubscriptionObject>>
): Promise<Array<PresubscriptionObject>> => {
    return apiWrapper(
        resultsFn => {
            endpoints.subscriptions.getPreSubscriptions(resultsFn);
        },
        (data, done) => {
            const presubs = data.map(PresubscriptionAdapter.map);
            done(null, presubs);
        },
        callback
    );
};

export const updatePresubscriptions = (
    endpoints: Endpoints,
    subscriptions: Array<PresubscriptionObject>,
    callback?: CallbackFn<void>
): Promise<void> => {
    return apiWrapper(
        resultsFn => {
            const presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);
            endpoints.subscriptions.updatePreSubscriptions(presubs, resultsFn);
        },
        (data, done) => {
            done(null, data);
        },
        callback
    );
};

export const deletePresubscriptions = (endpoints: Endpoints, callback?: CallbackFn<void>): Promise<void> => {
    return apiWrapper(
        resultsFn => {
            endpoints.subscriptions.deletePreSubscriptions(resultsFn);
        },
        (data, done) => {
            done(null, data);
        },
        callback
    );
};
