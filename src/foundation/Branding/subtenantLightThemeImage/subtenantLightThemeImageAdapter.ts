import { Adapter } from "../../../common/adapter";
import { SubtenantLightThemeImage } from "./subtenantLightThemeImage";
/**
 *SubtenantLightThemeImage adapter
 */
export class SubtenantLightThemeImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): SubtenantLightThemeImage {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantLightThemeImageAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_LIGHT_THEME_IMAGE",
            reference: data.reference,
            staticUri: data.static_uri,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
