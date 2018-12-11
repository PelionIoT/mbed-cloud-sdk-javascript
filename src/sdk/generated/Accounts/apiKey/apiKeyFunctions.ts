import { ApiKey } from "./apiKey";

export function instanceOfApiKey(object: any): object is ApiKey {
    return object.discriminator === "APIKEY";
}
