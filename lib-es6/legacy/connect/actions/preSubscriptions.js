import { apiWrapper } from "../../common/functions";
import { PresubscriptionAdapter } from "../models/presubscriptionAdapter";
export const listPresubscriptions = (endpoints, callback) => {
    return apiWrapper(resultsFn => {
        endpoints.subscriptions.getPreSubscriptions(resultsFn);
    }, (data, done) => {
        const presubs = data.map(PresubscriptionAdapter.map);
        done(null, presubs);
    }, callback);
};
export const updatePresubscriptions = (endpoints, subscriptions, callback) => {
    return apiWrapper(resultsFn => {
        const presubs = subscriptions.map(PresubscriptionAdapter.reverseMap);
        endpoints.subscriptions.updatePreSubscriptions(presubs, resultsFn);
    }, (data, done) => {
        done(null, data);
    }, callback);
};
export const deletePresubscriptions = (endpoints, callback) => {
    return apiWrapper(resultsFn => {
        endpoints.subscriptions.deletePreSubscriptions(resultsFn);
    }, (data, done) => {
        done(null, data);
    }, callback);
};
//# sourceMappingURL=preSubscriptions.js.map