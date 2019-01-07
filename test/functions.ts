import { Entity } from "../src/sdk/common/entity";

export function instanceOf<T extends Entity>(object: any, discriminator: string): object is T {
    return object._discriminator === discriminator;
}
