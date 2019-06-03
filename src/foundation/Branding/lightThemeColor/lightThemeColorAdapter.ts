import { Adapter } from "../../../common/adapter";
import { LightThemeColor } from "./lightThemeColor";
/**
 *LightThemeColor adapter
 */
export class LightThemeColorAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): LightThemeColor {
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
