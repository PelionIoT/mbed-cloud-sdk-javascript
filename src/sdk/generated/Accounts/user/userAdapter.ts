import { Adapter } from "../../../common/adapter";
import { User } from "./user";

export class UserAdapter extends Adapter {
    public static fromApi(data: any, instance?: User): User {
        return this.assignDefined(instance || {},
            {
                id: data.id,
                key: data.key,
                name: data.name,
                createdAt: new Date(data.created_at),
                updatedAt: new Date(data.updated_at),
                groups: data.groups,
                status: data.status,
            });
    }
}
