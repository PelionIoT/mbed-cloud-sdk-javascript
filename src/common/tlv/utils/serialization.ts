export type ByteArray = Array<number> | Uint8Array;

function isHostLittleEndian() {
    return new Uint8Array(new Uint32Array([0x01000002]).buffer)[0] === 0x02;
}

function bytesToInt32(bytes: ByteArray) {
    return (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
}

/**
 * Converts the specified byte array into a `number`.
 * @param bytes - The byte array to convert. This should be an **unsigned integer**
 *  of 1, 2, or 4 big endian encoded bytes.
 * @returns The integer number encoded in the specified array.
 */
export function bytesToUInt(bytes: ByteArray) {
    if (bytes.length === 1) {
        return bytes[0];
    }

    if (bytes.length === 2) {
        return ((bytes[0] & 0xff) << 8) | (bytes[1] & 0xff);
    }

    if (bytes.length === 3) {
        return ((bytes[0] & 0xff) << 16) | ((bytes[0] & 0xff) << 8) | (bytes[2] & 0xff);
    }

    // Bitwise operations works on bits but result is then converted
    // to a signed 32 bit integer value (and then, eventually, to
    // standard JS Number type). We have to go the "dirty way" and
    // check for endianness.
    if (bytes.length === 4) {
        const reorderedBytes = isHostLittleEndian() ? bytes.reverse() : bytes;
        return new Uint32Array(new Uint8Array(reorderedBytes).buffer)[0];
    }

    throw new Error(`Unsupported array size for bytesToUint() conversion: ${bytes.length}.`);
}

/**
 * Converts the specified byte array into a `number`.
 * @param bytes - The byte array to convert. This should be an **signed integer**
 *  of 1, 2, 3, or 8 big endian encoded bytes.
 * @returns The integer number encoded in the specified array. Note that conversion
 * from 8 bytes integer to JavaScript `number` may loss precision.
 */
export function bytesToInt(bytes: ByteArray) {
    const sign = bytes[0] & 0b10000000;

    if (bytes.length === 1) {
        return sign ? 0xffffff00 | bytes[0] : bytes[0];
    }

    if (bytes.length === 2) {
        const num = (bytes[0] << 8) | bytes[1];
        return sign ? 0xffff0000 | num : num;
    }

    if (bytes.length === 4) {
        return bytesToInt32(bytes);
    }

    // It's a 64 bit integer, we can't represent this correctly
    // in JS but at least we can return an approximation.
    const high = bytesToInt32(bytes.slice(0, 4));
    const low = bytesToUInt(bytes.slice(4, 8));

    return high * 4294967296 + low;
}

/**
 * Converts the specified array into a `number`.
 * @param bytes - The byte array to convert. This should be floating point number
 *  of 4 or 8 little endian encoded bytes.
 * @returns The floating point number encoded in the specified array.
 */
export function bytesToFloat(bytes: Array<number>) {
    if (bytes.length === 4) {
        return new Float32Array(new Uint32Array([bytesToUInt(bytes)]).buffer)[0];
    }

    // There isn't int64_t in JS, we need to check endianness (should we support BigInt?)
    if (bytes.length === 8) {
        const reorderedBytes = isHostLittleEndian() ? bytes.reverse() : bytes;
        return new Float64Array(new Uint8Array(reorderedBytes).buffer)[0];
    }

    return Number.NaN;
}

/**
 * Converts the specified byte array into a string.
 * @param bytes - The UTF-8 encoded byte array to convert.
 * @returns An UTF-16 (or UCS-2) encoded JavaScript string. Encoding errors are always ignored.
 */
export function bytesToString(bytes: ByteArray) {
    // UTF-8 encoded
    let result = "";

    let byteIndex = 0;
    while (byteIndex < bytes.length) {
        // ASCII characters
        const char = bytes[byteIndex++];
        if (char >> 7 === 0) {
            result += String.fromCharCode(char);
            continue;
        }

        // Invalid starting byte
        if (char >> 6 === 0x02) {
            continue;
        }

        // Multibyte, how many bytes left?
        let extraLength = 0;
        if (char >> 5 === 0x06) {
            extraLength = 1;
        } else if (char >> 4 === 0x0e) {
            extraLength = 2;
        } else if (char >> 3 === 0x1e) {
            extraLength = 3;
        } else if (char >> 2 === 0x3e) {
            extraLength = 4;
        } else if (char >> 1 === 0x7e) {
            extraLength = 5;
        } else {
            continue;
        }

        // If we do not have enough data then simply discard leftovers.
        if (byteIndex + extraLength > bytes.length) {
            return result;
        }

        // Remove the UTF-8 prefix
        let res = char & ((1 << (8 - extraLength - 1)) - 1);

        let count = 0;
        for (count = 0; count < extraLength; ++count) {
            const nextChar = bytes[byteIndex++];

            // Break if next byte is not valid but keep trying to parse what's next.
            if (nextChar >> 6 !== 0x02) {
                break;
            }

            res = (res << 6) | (nextChar & 0x3f);
        }

        if (count !== extraLength) {
            --byteIndex;
            continue;
        }

        if (res <= 0xffff) {
            result += String.fromCharCode(res);
            continue;
        }

        res -= 0x10000;
        const high = ((res >> 10) & 0x3ff) + 0xd800;
        const low = (res & 0x3ff) + 0xdc00;
        result += String.fromCharCode(high, low);
    }

    return result;
}

/**
 * Converts a 8 bits unsigned integer into a big endian byte array.
 */
export function uint8ToBytes(value: number) {
    return [value & 0xff];
}

/**
 * Converts a 16 bits unsigned integer into a big endian byte array.
 */
export function uint16ToBytes(value: number) {
    return [(value & 0xff00) >> 8, value & 0xff];
}

/**
 * Converts a 24 bits unsigned integer into a big endian byte array.
 */
export function uint24ToBytes(value: number) {
    return [(value & 0xff0000) >> 16, (value & 0xff00) >> 8, value & 0xff];
}

/**
 * Converts a 32 bits signed integer into a big endian byte array.
 */
export function int32ToBytes(value: number) {
    const buffer = new Uint8Array(4);
    buffer[0] = (value >> 24) & 0xff;
    buffer[1] = (value >> 16) & 0xff;
    buffer[2] = (value >> 8) & 0xff;
    buffer[3] = value & 0xff;

    return Array.from(buffer);
}

/**
 * Converts a 64 bit floating point number into a little endian byte array.
 */
export function float64ToBytes(value: number) {
    // There is not int64_t in JS...
    const bytes = Array.from(new Uint8Array(new Float64Array([value]).buffer));
    if (isHostLittleEndian()) return bytes.reverse();

    return bytes;
}

/**
 * Convert the specified UTF-16 string into an UTF-8 encoded byte array.
 */
export function stringToBytes(text: string) {
    const utf8 = [];
    for (let i = 0; i < text.length; ++i) {
        let charcode = text.charCodeAt(i);
        if (charcode < 0x80) {
            utf8.push(charcode);
        } else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
        } else {
            // surrogate pair
            ++i;

            charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (text.charCodeAt(i) & 0x3ff));
            utf8.push(
                0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f)
            );
        }
    }

    return utf8;
}

/**
 * Simple single line hexdump, caller has to truncate (or pad) the buffer
 * to display a fixed width line. Use maximumNumberOfBytes to truncate the
 * number of bytes to display (but if done here an ellipsis character will
 * be added).
 */
export function bytesToHexDump(bytes: ByteArray, includeAsciiRepresentation = false, maximumNumberOfBytes?: number) {
    function _byteToHex(byte: number) {
        return ("0" + byte.toString(16)).slice(-2);
    }

    function _byteToPrintableAscii(byte: number) {
        function _isPrintableAsciiByte() {
            return byte >= 32 && byte < 127;
        }

        return _isPrintableAsciiByte() ? String.fromCharCode(byte) : "·";
    }

    if (!Array.isArray(bytes)) {
        bytes = Array.from(bytes);
    }

    let trimming = "";
    if (maximumNumberOfBytes !== undefined && bytes.length > maximumNumberOfBytes) {
        trimming = "…";
        bytes = bytes.slice(0, maximumNumberOfBytes);
    }

    const hex = bytes.map(_byteToHex).join(" ") + trimming;

    if (includeAsciiRepresentation) {
        const ascii = bytes.map(_byteToPrintableAscii).join("") + trimming;

        return `${hex}    ${ascii}`;
    }

    return hex;
}
