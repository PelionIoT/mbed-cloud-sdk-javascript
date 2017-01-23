/*
* mbed Cloud JavaScript SDK
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

var fs = require('fs');
var path = require('path');
var readline = require('readline');
var execSync = require('child_process').execSync;

var Development = require('../../lib/').DevelopmentApi;
var Access = require('../../lib/').AccessApi;
var config = require('./config');

var outputFile = "header.h";
var development = new Development(config);
var access = new Access(config);

function ensureDirectory(directory) {
    var dirName = path.dirname(directory);
    if (!fs.existsSync(dirName)) {
        ensureDirectory(dirName);
    }
    if (fs.existsSync(directory)) return;
    fs.mkdirSync(directory);
}

function generateKeys() {
    var keys = execSync("openssl ecparam -genkey -name prime256v1", {"encoding": "utf8"});
    var publicPem = execSync("openssl ec -pubout", {"encoding": "utf8", input: keys});
    var privatePem = execSync("openssl ec", {"encoding": "utf8", input: keys});
    var hex = execSync("openssl ec -text -noout", {"encoding": "utf8", input: privatePem});

    var privateHex = hex.match(/priv:([0-9a-f:\s]+)pub:/)[1];
    privateHex = privateHex.replace(/\s/g, "");
    privateHex = privateHex.split(":").slice(-32);
    privateHex = privateHex.map(function(h, i) {
        if (h === "00") return 
        var prefix = i % 8 === 0 ? "\n\t" : "";
        return `${prefix}0x${h}`;
    }).join(", ");

    return {
        publicPem: publicPem,
        privatePem: privatePem,
        privateHex: privateHex
    }
}

function addCertificate(publicKey, successFn) {
    development.addCertificate({
        publicKey: publicKey
    }, function(err, cert) {

        if (err) {
            console.log(err);
            return;
        }

        console.log(`Certificate added with raw public key: ${cert.publicKey}`);
        successFn();
    });
}

function checkCertificate(successFn) {
    development.getCertificate(function(err, cert) {

        if (err) {
            console.log(err);
            return;
        }

        if (cert.publicKey) {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question("Remote certificate already exists, overwrite? [y/N] ", function(answer) {
                if (answer === "y") {
                    development.deleteCertificate(function(err) {

                        if (err) {
                            console.log(err);
                            return;
                        }

                        successFn();
                    });
                }
                rl.close();
            });
            return;
        }
        successFn();
    });
}


function getAccountDetails(successFn) {
    access.getAccount(function(err, account) {

        if (err) {
            console.log(err);
            return;
        }

        successFn(account);
    });
}

function processHeader(keys, accountId) {

    return `//----------------------------------------------------------------------------
//   The confidential and proprietary information contained in this file may
//   only be used by a person authorised under and to the extent permitted
//   by a subsisting licensing agreement from ARM Limited or its affiliates.
//
//          (C) COPYRIGHT 2013-2016 ARM Limited or its affiliates.
//              ALL RIGHTS RESERVED
//
//   This entire notice must be reproduced on all copies of this file
//   and copies of this file may only be made by a person if such person is
//   permitted to do so under the terms of a subsisting license agreement
//   from ARM Limited or its affiliates.
//----------------------------------------------------------------------------
/*
${keys.publicPem}
${keys.privatePem}*/

#ifndef __IDENTITY_DEV_SECURITY_H__
#define __IDENTITY_DEV_SECURITY_H__

#include <inttypes.h>

const char gIdcDevSecurityAccountId[33] = "${accountId}";

const uint8_t gIdcDevSecurityPrivateSignKey[32] = { ${keys.privateHex} };

#endif //__IDENTITY_DEV_SECURITY_H
`;
}

checkCertificate(function() {
    var keys = generateKeys();
    addCertificate(keys.publicPem, function() {
        getAccountDetails(function(account) {
            var header = processHeader(keys, account.id);
            ensureDirectory(path.dirname(outputFile));
            fs.writeFileSync(outputFile, header);
            console.log(`Header file written to ${outputFile}`);
        });
    });
});
