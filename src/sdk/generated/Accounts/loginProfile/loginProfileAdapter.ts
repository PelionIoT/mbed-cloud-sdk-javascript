import { Adapter } from "../../../common/adapter";
import { LoginProfile } from "./loginProfile";
/**
 *LoginProfile adapter
 */
export class LoginProfileAdapter extends Adapter {
    public static fromApi(data: any, instance?: LoginProfile): LoginProfile {
        if (!data) {
            return null;
        }
        const mappedEntity = LoginProfileAdapter.assignDefined<LoginProfile>(instance || {}, {
            _discriminator: "LOGIN_PROFILE",
            id: data.id,
            name: data.name,
        });
        return mappedEntity;
    }
}
