import { Adapter } from "../../../common/adapter";
/**
 *ParentAccount adapter
 */
export class ParentAccountAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
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
//# sourceMappingURL=parentAccountAdapter.js.map