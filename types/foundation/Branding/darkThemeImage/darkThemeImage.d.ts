import { Entity } from "../../../common/entity";
import { DarkThemeImageReference } from "./types";
/**
 *DarkThemeImage
 */
export interface DarkThemeImage extends Entity {
    /**
     *Name of the image.
     */
    reference?: DarkThemeImageReference;
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
