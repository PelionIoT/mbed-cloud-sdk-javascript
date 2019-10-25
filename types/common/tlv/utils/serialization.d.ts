export declare type ByteArray = Array<number> | Uint8Array;
/**
 * Converts the specified byte array into a `number`.
 * @param bytes - The byte array to convert. This should be an **unsigned integer**
 *  of 1, 2, or 4 big endian encoded bytes.
 * @returns The integer number encoded in the specified array.
 */
export declare function bytesToUInt(bytes: ByteArray): number;
/**
 * Converts the specified byte array into a `number`.
 * @param bytes - The byte array to convert. This should be an **signed integer**
 *  of 1, 2, 3, or 8 big endian encoded bytes.
 * @returns The integer number encoded in the specified array. Note that conversion
 * from 8 bytes integer to JavaScript `number` may loss precision.
 */
export declare function bytesToInt(bytes: ByteArray): number;
/**
 * Converts the specified array into a `number`.
 * @param bytes - The byte array to convert. This should be floating point number
 *  of 4 or 8 little endian encoded bytes.
 * @returns The floating point number encoded in the specified array.
 */
export declare function bytesToFloat(bytes: Array<number>): number;
/**
 * Converts the specified byte array into a string.
 * @param bytes - The UTF-8 encoded byte array to convert.
 * @returns An UTF-16 (or UCS-2) encoded JavaScript string. Encoding errors are always ignored.
 */
export declare function bytesToString(bytes: ByteArray): string;
/**
 * Converts a 8 bits unsigned integer into a big endian byte array.
 */
export declare function uint8ToBytes(value: number): number[];
/**
 * Converts a 16 bits unsigned integer into a big endian byte array.
 */
export declare function uint16ToBytes(value: number): number[];
/**
 * Converts a 24 bits unsigned integer into a big endian byte array.
 */
export declare function uint24ToBytes(value: number): number[];
/**
 * Converts a 32 bits signed integer into a big endian byte array.
 */
export declare function int32ToBytes(value: number): number[];
/**
 * Converts a 64 bit floating point number into a little endian byte array.
 */
export declare function float64ToBytes(value: number): number[];
/**
 * Convert the specified UTF-16 string into an UTF-8 encoded byte array.
 */
export declare function stringToBytes(text: string): any[];
/**
 * Simple single line hexdump, caller has to truncate (or pad) the buffer
 * to display a fixed width line. Use maximumNumberOfBytes to truncate the
 * number of bytes to display (but if done here an ellipsis character will
 * be added).
 */
export declare function bytesToHexDump(bytes: ByteArray, includeAsciiRepresentation?: boolean, maximumNumberOfBytes?: number): string;
