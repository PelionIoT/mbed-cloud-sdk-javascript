import { ListOptions } from "../common/interfaces";
/**
 * Pre-Shared Key
 * For more information about such keys, have a look at <a href="https://cloud.mbed.com/docs/latest/connecting/mbed-client-lite-security-considerations.html"/>
 */
export interface AddPreSharedKey {
    /**
     * The unique device
     * Note: It has to be 16-64 <a href="https://en.wikipedia.org/wiki/ASCII#Printable_characters">printable</a> (non-control) ASCII characters. It also must be globally unique. Consider using vendor-MAC-ID-device-model.
     * For example: "myEndpoint.host.com"
     */
    endpointName: string;
    /**
     * The secret Pre-Shared Key
     * Note: It is not case sensitive; 4a is same as 4A, and it is allowed with or without 0x in the beginning. The minimum length of the secret is 128 bits and maximum 256 bits.
     * For example: "4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a"
     */
    secretHex: string;
}
/**
 * Options to use when listing psks
 */
export interface PskListOptions extends ListOptions {
}
