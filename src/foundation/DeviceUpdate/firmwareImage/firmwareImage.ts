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
     *@example e979fe432d6a19b0e70a93b33ac29094cd5fe35a8fd5fbedfd383d8d107d6a7e
     */
    readonly datafileChecksum?: string;

    /**
     *The size of the datafile in bytes.
     */
    readonly datafileSize?: number;

    /**
     *The firmware image file URL.
     *@example http://bucket.com/myimage.elf
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
