import { Adapter } from "../../../common/adapter";
import { User } from "./user";
import { LoginHistoryAdapter } from "../..";
import { LoginProfileAdapter } from "../..";
/**
 *User adapter
 */
export class UserAdapter extends Adapter {
    public static fromApi(data: any, instance?: any): User {
        if (!data) {
            return null;
        }
        let loginHistory = [];
        if (data.login_history) {
            loginHistory = data.login_history.map(i => LoginHistoryAdapter.fromApi(i));
        }
        let loginProfiles = [];
        if (data.login_profiles) {
            loginProfiles = data.login_profiles.map(i => LoginProfileAdapter.fromApi(i));
        }
        const mappedEntity = UserAdapter.assignDefined(instance || {}, {
            _discriminator: "USER",
            accountId: data.account_id,
            activeSessions: data.active_sessions,
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
