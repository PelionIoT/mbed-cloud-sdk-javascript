import { Adapter } from "../../../common/adapter";
import { DarkThemeColor } from "./darkThemeColor";
/**
 *DarkThemeColor adapter
 */
export class DarkThemeColorAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): DarkThemeColor {
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
