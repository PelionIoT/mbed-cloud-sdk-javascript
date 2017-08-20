/*
* Mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
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

const typeMask       = parseInt('11000000', 2);
const idLengthMask   = parseInt('00100000', 2); // Length of ID 0=8bits 1=16bits
const lengthTypeMask = parseInt('00011000', 2);
const lengthMask     = parseInt('00000111', 2);

const types = {
    OBJECT_INSTAN: parseInt('00000000', 2), //Object Instance with one or more TLVs
    RESOURCE_INST: parseInt('01000000', 2), //Resource Instance with Value in multi Resource TLV
    MULT_RESOURCE: parseInt('10000000', 2),  //Multiple Resource, Value contains one or more Resource Instance
    RESOURCE_VALU: parseInt('11000000', 2)  //Resource with Value
};

const lengthType = {
    ONE_BYTE: parseInt('00001000', 2), //Length is 8-bits
    TWO_BYTE: parseInt('00010000', 2), //Length is 16-bits
    TRE_BYTE: parseInt('00011000', 2), //Length is 24-bits
    OTR_BYTE: parseInt('00000000', 2)  //Length is in bits 2-0
};

function findIdLength(byte): number {
    return (byte & idLengthMask) === idLengthMask ? 2 : 1;
}

function findValueLength(byte): number {
    if ((byte & lengthTypeMask) === lengthType.ONE_BYTE ) {
        return 1;
    } else if ((byte & lengthTypeMask) === lengthType.TWO_BYTE) {
        return 2;
    } else if ((byte & lengthTypeMask) === lengthType.TRE_BYTE) {
        return 3;
    } else {
        return (byte & lengthMask);
    }
}

function decode(bytes, result: {}={}, path: string="") {
    if (!bytes || bytes.length < 1) {
        return result;
    }

    let byte = bytes[0];
    let type = byte & typeMask;
    let idLength = findIdLength(byte);
    let length = findValueLength(byte);

    let getString = (b) => {
        return String.fromCharCode(b);
    };

    let combineBytes = (acc, cur, idx, arr) => {
        let step = arr.length - idx - 1;
        return acc + (cur << (8 * step));
    };

    let offset = 1;

    let id = bytes.slice(offset, offset + idLength).reduce(combineBytes, 0);
    offset = offset + idLength;

    let valueLength = length;
    if ((byte & lengthTypeMask) !== lengthType.OTR_BYTE) {
        //Need to get length of value from bytes
        valueLength = bytes.slice(offset, offset + length).reduce(combineBytes, 0);
        offset = offset + length;
    }

    if (type === types.MULT_RESOURCE ) {
        //Go into multiple resources
        decode(bytes.slice(offset, offset + valueLength), result, `${path}/${id}`);
    } else {
        let valueBytes = bytes.slice(offset, offset + valueLength);
        let hasZero = valueBytes.some(b => {
            return b === 0;
        });

        let value = hasZero ? valueBytes.reduce(combineBytes, 0) : valueBytes.map(getString).join('');
        result[`${path}/${id}`] =  value
    }

    offset = offset + valueLength;
    decode(bytes.slice(offset), result, path);

    return result;
};

export function decodeTlv(value: string): string | number | { [key: string]: string | number } {
    let bytes = value.split("").map(char => {
        return char.charCodeAt(0);
    });

    return decode(bytes);
}
