import { Adapter } from "../../../common/adapter";
import { ActiveSessionAdapter } from "../..";
import { LoginHistoryAdapter } from "../..";
import { LoginProfileAdapter } from "../..";
/**
 *SubtenantUser adapter
 */
export class SubtenantUserAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        let activeSessions = [];
        if (data.active_sessions) {
            activeSessions = data.active_sessions.map(i => ActiveSessionAdapter.fromApi(i));
        }
        let loginHistory = [];
        if (data.login_history) {
            loginHistory = data.login_history.map(i => LoginHistoryAdapter.fromApi(i));
        }
        let loginProfiles = [];
        if (data.login_profiles) {
            loginProfiles = data.login_profiles.map(i => LoginProfileAdapter.fromApi(i));
        }
        const mappedEntity = SubtenantUserAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_USER",
            accountId: data.account_id,
            activeSessions: activeSessions,
            address: data.address,
            createdAt: data.created_at,
            creationTime: data.creation_time || 0,
            customFields: data.custom_fields,
            email: data.email,
            emailVerified: data.email_verified,
            fullName: data.full_name,
            id: data.id,
            isGtcAccepted: data.is_gtc_accepted,
            isMarketingAccepted: data.is_marketing_accepted,
            isTotpEnabled: data.is_totp_enabled,
            lastLoginTime: data.last_login_time || 0,
            loginHistory: loginHistory,
            loginProfiles: loginProfiles,
            password: data.password,
            passwordChangedTime: data.password_changed_time || 0,
            phoneNumber: data.phone_number,
            status: data.status,
            totpScratchCodes: data.totp_scratch_codes,
            updatedAt: data.updated_at,
            username: data.username,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=subtenantUserAdapter.js.map