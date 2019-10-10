import { Adapter } from "../../../common/adapter";
/**
 *LoginHistory adapter
 */
export class LoginHistoryAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = LoginHistoryAdapter.assignDefined(instance || {}, {
            _discriminator: "LOGIN_HISTORY",
            date: data.date,
            ipAddress: data.ip_address,
            success: data.success,
            userAgent: data.user_agent,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=loginHistoryAdapter.js.map