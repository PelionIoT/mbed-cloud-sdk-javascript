import { Adapter } from "../../../common/adapter";
import { LoginProfile } from "./loginProfile";
/**
 *LoginProfile adapter
 */
export class LoginProfileAdapter extends Adapter {
    public static fromApi(data: any, instance?: any): LoginProfile {
        if (!data) {
            return null;
        }
        const mappedEntity = LoginProfileAdapter.assignDefined(instance || {}, {
            _discriminator: "LOGIN_PROFILE",
        });
        return mappedEntity;
    }
}
