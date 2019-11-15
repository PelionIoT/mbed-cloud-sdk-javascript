import { Entity } from "../../../common/entity";
/**
 *FirmwareImage
 */
export interface FirmwareImage extends Entity {
    /**
     *The time the entity was created.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;

    /**
     *The checksum (sha256) generated for the datafile.
     *@example 0000000000000000000000000000000000000000000000000000000000000000
     */
    readonly datafileChecksum?: string;

    /**
     *The size of the datafile in bytes.
     */
    readonly datafileSize?: number;

    /**
     *The firmware image file URL
     *@example http://example.com/00000000000000000000000000000000
     */
    readonly datafileUrl?: string;

    /**
     *The description of the object.
     *@example a description
     */
    description?: string;

    /**
     *The firmware image name.
     */
    name?: string;

    /**
     *The time the entity was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
}
