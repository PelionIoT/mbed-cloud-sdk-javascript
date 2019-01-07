import { Adapter } from "../../../common/adapter";
import { SubtenantUser } from "./subtenantUser";
/**
 *SubtenantUser adapter
 */
export class SubtenantUserAdapter extends Adapter {
    public static fromApi(data: any, instance?: SubtenantUser): SubtenantUser {
        return SubtenantUserAdapter.assignDefined<SubtenantUser>(instance || {}, {
            _discriminator: "SUBTENANT_USER",
            accountId: data.account_id,
            address: data.address,
            createdAt: data.created_at,
            creationTime: data.creation_time,
            email: data.email,
            emailVerified: data.email_verified,
            fullName: data.full_name,
            id: data.id,
            lastLoginTime: data.last_login_time,
            loginHistory: data.login_history,
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
