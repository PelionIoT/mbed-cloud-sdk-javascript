import { Adapter } from "../../../common/adapter";
import { Image } from "./image";
/**
 *Image adapter
 */
export class ImageAdapter extends Adapter {
    public static fromApi(data: any, instance?: Image): Image {
        if (!data) {
            return null;
        }
        const mappedEntity = ImageAdapter.assignDefined<Image>(instance || {}, {
            _discriminator: "IMAGE",
            reference: data.reference,
            staticUri: data.static_uri,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
