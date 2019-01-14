import { Entity } from "../../../common/entity";
import { ImageReferenceEnum } from "./types";
/**
 *Image
 */
export interface Image extends Entity {
    /**
     *reference
     */
    reference?: ImageReferenceEnum;

    /**
     *staticUri
     */
    staticUri?: string;

    /**
     *updatedAt
     */
    updatedAt?: Date;
}
