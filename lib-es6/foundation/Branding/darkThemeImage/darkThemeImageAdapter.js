import { Adapter } from "../../../common/adapter";
/**
 *DarkThemeImage adapter
 */
export class DarkThemeImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = DarkThemeImageAdapter.assignDefined(instance || {}, {
            _discriminator: "DARK_THEME_IMAGE",
            reference: data.reference,
            staticUri: data.static_uri,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=darkThemeImageAdapter.js.map