import { Adapter } from "../../../common/adapter";
import { User } from "./user";
import { LoginHistoryAdapter } from "../..";
/**
 *User adapter
 */
export class UserAdapter extends Adapter {
    public static fromApi(data: any, instance?: User): User {
        let loginHistory = [];
        if (data.login_history) {
            loginHistory = data.login_history.map(i => LoginHistoryAdapter.fromApi(i));
        }
        return UserAdapter.assignDefined<User>(instance || {}, {
            _discriminator: "USER",
            accountId: data.account_id,
            address: data.address,
            createdAt: data.created_at,
            creationTime: data.creation_time,
            email: data.email,
            emailVerified: data.email_verified,
            fullName: data.full_name,
            id: data.id,
            lastLoginTime: data.last_login_time,
            loginHistory: loginHistory,
            loginProfiles: data.login_profiles,
            marketingAccepted: data.is_marketing_accepted,
            password: data.password,
            passwordChangedTime: data.password_changed_time,
            phoneNumber: data.phone_number,
            status: data.status,
            termsAccepted: data.is_gtc_accepted,
            twoFactorAuthentication: data.is_totp_enabled,
            updatedAt: data.updated_at,
            username: data.username,
        });
    }
}
