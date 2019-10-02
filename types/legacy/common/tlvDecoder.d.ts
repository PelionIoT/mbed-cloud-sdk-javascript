/**
 * Decode a raw tlv value
 * @param value The raw tlv value
 */
export declare function decodeTlv(value: string): string | number | {
    [key: string]: string | number;
};
