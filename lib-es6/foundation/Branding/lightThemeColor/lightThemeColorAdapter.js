import { Adapter } from "../../../common/adapter";
/**
 *LightThemeColor adapter
 */
export class LightThemeColorAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = LightThemeColorAdapter.assignDefined(instance || {}, {
            _discriminator: "LIGHT_THEME_COLOR",
            color: data.color,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=lightThemeColorAdapter.js.map