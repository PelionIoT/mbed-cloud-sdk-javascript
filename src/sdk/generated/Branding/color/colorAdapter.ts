import { Adapter } from "../../../common/adapter";
import { Color } from "./color";
/**
 *Color adapter
 */
export class ColorAdapter extends Adapter {
    public static fromApi(data: any, instance?: Color): Color {
        if (!data) {
            return null;
        }
        const mappedEntity = ColorAdapter.assignDefined<Color>(instance || {}, {
            _discriminator: "COLOR",
            color: data.color,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
