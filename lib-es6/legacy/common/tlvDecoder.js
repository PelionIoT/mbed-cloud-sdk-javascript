/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * Internal
 * @ignore
 */
const typeMask = parseInt("11000000", 2);
/**
 * Internal
 * @ignore
 */
const idLengthMask = parseInt("00100000", 2); // Length of ID 0=8bits 1=16bits
/**
 * Internal
 * @ignore
 */
const lengthTypeMask = parseInt("00011000", 2);
/**
 * Internal
 * @ignore
 */
const lengthMask = parseInt("00000111", 2);
/**
 * Internal
 * @ignore
 */
const types = {
    OBJECT_INSTAN: parseInt("00000000", 2),
    RESOURCE_INST: parseInt("01000000", 2),
    MULT_RESOURCE: parseInt("10000000", 2),
    RESOURCE_VALU: parseInt("11000000", 2),
};
/**
 * Internal
 * @ignore
 */
const lengthType = {
    ONE_BYTE: parseInt("00001000", 2),
    TWO_BYTE: parseInt("00010000", 2),
    TRE_BYTE: parseInt("00011000", 2),
    OTR_BYTE: parseInt("00000000", 2),
};
/**
 * Internal
 * @ignore
 */
function findIdLength(byte) {
    return (byte & idLengthMask) === idLengthMask ? 2 : 1;
}
/**
 * Internal
 * @ignore
 */
function findValueLength(byte) {
    if ((byte & lengthTypeMask) === lengthType.ONE_BYTE) {
        return 1;
    }
    else if ((byte & lengthTypeMask) === lengthType.TWO_BYTE) {
        return 2;
    }
    else if ((byte & lengthTypeMask) === lengthType.TRE_BYTE) {
        return 3;
    }
    else {
        return (byte & lengthMask);
    }
}
/**
 * Internal
 * @ignore
 */
function decode(bytes, result = {}, path = "") {
    if (!bytes || bytes.length < 1) {
        return result;
    }
    const byte = bytes[0];
    const type = byte & typeMask;
    const idLength = findIdLength(byte);
    const length = findValueLength(byte);
    const getString = b => {
        return String.fromCharCode(b);
    };
    const combineBytes = (acc, cur, idx, arr) => {
        const step = arr.length - idx - 1;
        return acc + (cur << (8 * step));
    };
    let offset = 1;
    const id = bytes.slice(offset, offset + idLength).reduce(combineBytes, 0);
    offset = offset + idLength;
    let valueLength = length;
    if ((byte & lengthTypeMask) !== lengthType.OTR_BYTE) {
        // Need to get length of value from bytes
        valueLength = bytes.slice(offset, offset + length).reduce(combineBytes, 0);
        offset = offset + length;
    }
    if (type === types.MULT_RESOURCE) {
        // Go into multiple resources
        decode(bytes.slice(offset, offset + valueLength), result, `${path}/${id}`);
    }
    else {
        const valueBytes = bytes.slice(offset, offset + valueLength);
        const hasZero = valueBytes.some(b => {
            return b === 0;
        });
        const value = hasZero ? valueBytes.reduce(combineBytes, 0) : valueBytes.map(getString).join("");
        result[`${path}/${id}`] = value;
    }
    offset = offset + valueLength;
    decode(bytes.slice(offset), result, path);
    return result;
}
/**
 * Decode a raw tlv value
 * @param value The raw tlv value
 */
export function decodeTlv(value) {
    const bytes = value.split("").map(char => {
        return char.charCodeAt(0);
    });
    return decode(bytes);
}
//# sourceMappingURL=tlvDecoder.js.map