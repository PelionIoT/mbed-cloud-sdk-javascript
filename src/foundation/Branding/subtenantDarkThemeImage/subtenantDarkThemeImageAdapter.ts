import { Adapter } from "../../../common/adapter";
import { SubtenantDarkThemeImage } from "./subtenantDarkThemeImage";
/**
 *SubtenantDarkThemeImage adapter
 */
export class SubtenantDarkThemeImageAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): SubtenantDarkThemeImage {
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
