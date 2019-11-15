import { Adapter } from "../../../common/adapter";
import { ActiveSession } from "./activeSession";
/**
 *ActiveSession adapter
 */
export class ActiveSessionAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): ActiveSession {
        if (!data) {
            return null;
        }
        const mappedEntity = ActiveSessionAdapter.assignDefined(instance || {}, {
            _discriminator: "ACTIVE_SESSION",
            accountId: data.account_id,
            createdAt: data.created_at,
            ipAddress: data.ip_address,
            loginTime: data.login_time,
            referenceToken: data.reference_token,
            userAgent: data.user_agent,
        });
        return mappedEntity;
    }
}
