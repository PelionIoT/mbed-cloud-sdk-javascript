/**
 * Base interface for an entity
 */
export interface Entity {
    /**
     * The unique identifier of the entity
     */
    readonly id?: string;
    /**
     * Internal value used to test entity has been mapped correctly
     * @ignore
     */
    readonly _discriminator?: string;
}
