import { Account } from "./account";

export function instanceOfAccount(object: any): object is Account {
    return object.discriminator === "ACCOUNT";
}
