import { Adapter } from "../../../common/adapter";
import { UserInvitation } from "./userInvitation";
/**
 *UserInvitation adapter
 */
export class UserInvitationAdapter extends Adapter {
    public static fromApi(data: any, instance?: UserInvitation): UserInvitation {
        if (!data) {
            return null;
        }
        const mappedEntity = UserInvitationAdapter.assignDefined<UserInvitation>(instance || {}, {
            _discriminator: "USER_INVITATION",
            accountId: data.account_id,
            createdAt: data.created_at,
            email: data.email,
            expiration: data.expiration,
            id: data.id,
            loginProfiles: data.login_profiles,
            updatedAt: data.updated_at,
            userId: data.user_id,
        });
        return mappedEntity;
    }
}
