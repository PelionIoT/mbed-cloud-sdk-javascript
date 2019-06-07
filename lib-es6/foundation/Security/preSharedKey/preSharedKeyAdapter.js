import { Adapter } from "../../../common/adapter";
import { preSharedKeyIdSetter } from "../../../common/privateFunctions";
/**
 *PreSharedKey adapter
 */
export class PreSharedKeyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = PreSharedKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "PRE_SHARED_KEY",
            createdAt: data.created_at,
            endpointName: data.endpoint_name,
            id: data.id,
        });
        preSharedKeyIdSetter(mappedEntity);
        preSharedKeyIdSetter(mappedEntity);
        return mappedEntity;
    }
}
//# sourceMappingURL=preSharedKeyAdapter.js.map