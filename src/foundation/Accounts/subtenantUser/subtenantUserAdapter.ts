import { Adapter } from "../../../common/adapter";
import { SubtenantUser } from "./subtenantUser";
import { ActiveSessionAdapter } from "../..";
import { LoginHistoryAdapter } from "../..";
import { LoginProfileAdapter } from "../..";
/**
 *SubtenantUser adapter
 */
export class SubtenantUserAdapter extends Adapter {
    /**
     * fromApi
     * @returns SubtenantUser
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): SubtenantUser {
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
            creationTime: data.creation_time,
            customFields: data.custom_fields,
            email: data.email,
            emailVerified: data.email_verified,
            fullName: data.full_name,
            id: data.id,
            lastLoginTime: data.last_login_time,
            loginHistory: loginHistory,
            loginProfiles: loginProfiles,
            marketingAccepted: data.is_marketing_accepted,
            password: data.password,
            passwordChangedTime: data.password_changed_time,
            phoneNumber: data.phone_number,
            status: data.status,
            termsAccepted: data.is_gtc_accepted,
            totpScratchCodes: data.totp_scratch_codes,
            twoFactorAuthentication: data.is_totp_enabled,
            updatedAt: data.updated_at,
            username: data.username,
        });
        return mappedEntity;
    }
}
