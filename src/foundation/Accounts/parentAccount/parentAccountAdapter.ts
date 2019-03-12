import { Adapter } from "../../../common/adapter";
import { ParentAccount } from "./parentAccount";
/**
 *ParentAccount adapter
 */
export class ParentAccountAdapter extends Adapter {
    /**
     * fromApi
     * @returns ParentAccount
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): ParentAccount {
        if (!data) {
            return null;
        }
        const mappedEntity = ParentAccountAdapter.assignDefined(instance || {}, {
            _discriminator: "PARENT_ACCOUNT",
            adminEmail: data.admin_email,
            adminName: data.admin_name,
            id: data.id,
        });
        return mappedEntity;
    }
}
