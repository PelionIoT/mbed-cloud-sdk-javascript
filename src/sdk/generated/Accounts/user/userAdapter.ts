import { Adapter } from "../../../common/adapter";
import { User } from "./user";

export class UserAdapter extends Adapter {
    public static fromApi(data: any, instance?: User): User {
        return UserAdapter.assignDefined<User>(instance || {},
            {
                _discriminator: "USER",
                fullName: data.full_name,
                username: data.username,
                password: data.password,
                email: data.email,
                phoneNumber: data.phone_number,
                address: data.address,
                termsAccepted: data.is_gtc_accepted,
                marketingAccepted: data.is_marketing_accepted,
                groups: data.groups,
                id: data.id,
                status: data.status,
                accountId: data.account_id,
                emailVerified: data.email_verified,
                createdAt: data.created_at,
                creationTime: data.creation_time,
                passwordChangedTime: data.password_changed_time,
                twoFactorAuthentication: data.is_totp_enabled,
                lastLoginTime: data.last_login_time,
            });
    }
}
