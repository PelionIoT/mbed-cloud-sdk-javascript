import { Adapter } from "../../../common/adapter";
/**
 *LightThemeImage adapter
 */
export class LightThemeImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = LightThemeImageAdapter.assignDefined(instance || {}, {
            _discriminator: "LIGHT_THEME_IMAGE",
            reference: data.reference,
            staticUri: data.static_uri,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=lightThemeImageAdapter.js.map