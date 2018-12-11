import { User } from "./user";

export function instanceOfUser(object: any): object is User {
    return object.discriminator === "USER";
}
