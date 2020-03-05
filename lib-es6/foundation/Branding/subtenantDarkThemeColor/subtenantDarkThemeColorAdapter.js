import { Adapter } from "../../../common/adapter";
/**
 *SubtenantDarkThemeColor adapter
 */
export class SubtenantDarkThemeColorAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantDarkThemeColorAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_DARK_THEME_COLOR",
            color: data.color,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=subtenantDarkThemeColorAdapter.js.map