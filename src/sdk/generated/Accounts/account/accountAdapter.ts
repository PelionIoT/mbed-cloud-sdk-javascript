import { Adapter } from "../../../common/adapter";
import { Account } from "./account";

export class AccountAdapter extends Adapter {
    public static fromApi(data: any, instance?: Account): Account {
        return this.assignDefined(instance || {},
            {
                key: data.key,
                name: data.name,
                createdAt: new Date(data.created_at),
                updatedAt: new Date(data.updated_at),
                groups: data.groups,
                status: data.status,
            });
    }
}
