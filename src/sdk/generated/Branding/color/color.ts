import { Entity } from "../../../common/entity";
import { ColorReferenceEnum } from "./types";
/**
 *Color
 */
export interface Color extends Entity {
    /**
     *color
     */
    color?: string;

    /**
     *reference
     */
    reference?: ColorReferenceEnum;

    /**
     *updatedAt
     */
    updatedAt?: Date;
}
