import { Adapter } from "../../../common/adapter";
import { LoginHistory } from "./loginHistory";
/**
 *LoginHistory adapter
 */
export class LoginHistoryAdapter extends Adapter {
    /**
     * fromApi
     * @returns LoginHistory
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): LoginHistory {
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
