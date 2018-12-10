import { ApiKey } from "./apiKey";
import { Adapter } from "../../../common/adapter";

export class ApiKeyAdapter extends Adapter {
    public static fromApi(data: any, instance?: ApiKey): ApiKey {
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
