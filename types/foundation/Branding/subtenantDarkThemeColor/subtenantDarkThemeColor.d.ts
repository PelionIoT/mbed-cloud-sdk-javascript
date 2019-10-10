import { Entity } from "../../../common/entity";
import { SubtenantDarkThemeColorReference } from "./types";
/**
 *SubtenantDarkThemeColor
 */
export interface SubtenantDarkThemeColor extends Entity {
    /**
     *The color given as name (purple) or as a hex code.
     *@example #f3f93e
     */
    color?: string;
    /**
     *Color name.
     */
    reference?: SubtenantDarkThemeColorReference;
    /**
     *Last update time in UTC.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
}
