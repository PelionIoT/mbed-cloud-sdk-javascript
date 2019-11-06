import { LoginProfileAdapter } from "../..";
import { Adapter } from "../../../common/adapter";
import { SubtenantUserInvitation } from "./subtenantUserInvitation";
/**
 *SubtenantUserInvitation adapter
 */
export class SubtenantUserInvitationAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): SubtenantUserInvitation {
        if (!data) {
            return null;
        }
        let loginProfiles = [];
        if (data.login_profiles) {
            loginProfiles = data.login_profiles.map(i => LoginProfileAdapter.fromApi(i));
        }
        const mappedEntity = SubtenantUserInvitationAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_USER_INVITATION",
            accountId: data.account_id,
            createdAt: data.created_at,
            email: data.email,
            expiration: data.expiration,
            groups: data.groups,
            id: data.id,
            loginProfiles,
            updatedAt: data.updated_at,
            userId: data.user_id,
        });
        return mappedEntity;
    }
}
