import { Entity } from "../../../common/entity";
import { LightThemeImageReference } from "./types";
/**
 *LightThemeImage
 */
export interface LightThemeImage extends Entity {
    /**
     *Name of the image.
     */
    reference?: LightThemeImageReference;
    /**
     *The static link to the image.
     *@example https://static.mbed.com/123456789.jpg
     */
    readonly staticUri?: string;
    /**
     *Last update time in UTC.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
}
