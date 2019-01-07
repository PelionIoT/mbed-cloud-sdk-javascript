import { Adapter } from "../../../common/adapter";
import { SubtenantUserInvitation } from "./subtenantUserInvitation";
/**
 *SubtenantUserInvitation adapter
 */
export class SubtenantUserInvitationAdapter extends Adapter {
    public static fromApi(data: any, instance?: SubtenantUserInvitation): SubtenantUserInvitation {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantUserInvitationAdapter.assignDefined<SubtenantUserInvitation>(instance || {}, {
            _discriminator: "SUBTENANT_USER_INVITATION",
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
