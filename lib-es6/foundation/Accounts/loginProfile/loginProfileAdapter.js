import { Adapter } from "../../../common/adapter";
/**
 *LoginProfile adapter
 */
export class LoginProfileAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = LoginProfileAdapter.assignDefined(instance || {}, {
            _discriminator: "LOGIN_PROFILE",
            id: data.id,
            name: data.name,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=loginProfileAdapter.js.map