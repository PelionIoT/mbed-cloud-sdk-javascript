import { Entity } from "../../../common/entity";
import { SubtenantLightThemeColorReference } from "./types";
/**
 *SubtenantLightThemeColor
 */
export interface SubtenantLightThemeColor extends Entity {
    /**
     *The color given as name (purple) or as a hex code.
     *@example #f3f93e
     */
    color?: string;
    /**
     *Color name.
     */
    reference?: SubtenantLightThemeColorReference;
    /**
     *Last update time in UTC.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
}
