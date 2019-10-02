import { Adapter } from "../../../common/adapter";
/**
 *ActiveSession adapter
 */
export class ActiveSessionAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = ActiveSessionAdapter.assignDefined(instance || {}, {
            _discriminator: "ACTIVE_SESSION",
            accountId: data.account_id,
            ipAddress: data.ip_address,
            loginTime: data.login_time,
            referenceToken: data.reference_token,
            userAgent: data.user_agent,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=activeSessionAdapter.js.map