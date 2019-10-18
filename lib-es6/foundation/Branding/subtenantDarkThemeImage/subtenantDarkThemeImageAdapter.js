import { Adapter } from "../../../common/adapter";
/**
 *SubtenantDarkThemeImage adapter
 */
export class SubtenantDarkThemeImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantDarkThemeImageAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_DARK_THEME_IMAGE",
            reference: data.reference,
            staticUri: data.static_uri,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=subtenantDarkThemeImageAdapter.js.map