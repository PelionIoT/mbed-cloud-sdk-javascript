import { Adapter } from "../../../common/adapter";
/**
 *DarkThemeColor adapter
 */
export class DarkThemeColorAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = DarkThemeColorAdapter.assignDefined(instance || {}, {
            _discriminator: "DARK_THEME_COLOR",
            color: data.color,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=darkThemeColorAdapter.js.map