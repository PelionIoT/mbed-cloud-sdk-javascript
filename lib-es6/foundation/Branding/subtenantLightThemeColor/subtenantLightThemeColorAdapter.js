import { Adapter } from "../../../common/adapter";
/**
 *SubtenantLightThemeColor adapter
 */
export class SubtenantLightThemeColorAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantLightThemeColorAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_LIGHT_THEME_COLOR",
            color: data.color,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=subtenantLightThemeColorAdapter.js.map