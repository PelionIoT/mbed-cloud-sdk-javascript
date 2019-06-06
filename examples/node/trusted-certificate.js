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

var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var readline = require("readline");
var execSync = require('child_process').execSync;

var PelionDMSDK = require("../../index");
var config = require("./config");

var account = new PelionDMSDK.AccountManagementApi(config);
var certificates = new PelionDMSDK.CertificatesApi(config);

var commonName = "trusted-cert";
var keyFile = path.join(process.cwd(), `${commonName}.key`);
var certFile = path.join(process.cwd(), `${commonName}.pem`);

// Check for existing certificate with the same name
function checkCertificate() {
    return certificates.listCertificates()
    .then(certs => {
        var certificate = certs.data.find(cert => {
            return cert.name === commonName;
        });

        if (certificate) {
            return new Promise((resolve, reject) => {
                var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                rl.question(`Certificate "${commonName}" already exists, overwrite? [y/N] `, answer => {
                    rl.close();
                    if (answer === "y") {
                        return certificate.delete()
                        .then(() => {
                            resolve();
                        });
                    } else {
                        reject();
                    }
                });
            });
        }
    });
}

// Function to delay a promise chain
function delay(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000);
    });
}

checkCertificate()
.then(() => {
    // Rather than spawn openssl, this could be done using the forge package - https://www.npmjs.com/package/node-forge

    // Create private key
    execSync(`openssl genrsa -out ${keyFile} 1024`);
    console.log(`Private key written to ${keyFile}`);
    
    // Create certificate key
    execSync(`openssl req -new -x509 -days 365 -key ${keyFile} -out ${certFile} -subj '/CN=${commonName}'`);
    console.log(`x509 certificate written to ${certFile}`);

    // Delay to ensure certificate becomes valid
    return delay(5);
})
.then(() => {
    // Get account details
    return account.getAccount();
})
.then(account => {
    // Create sugnature by signing account ID with private key
    var sign = crypto.createSign('sha256');
    sign.update(account.id);
    var signature = sign.sign(fs.readFileSync(keyFile, "utf8"), "base64");
    console.log(`Signature created`);
    
    // Upload certificate
    return certificates.addCertificate({
        name: commonName,
        type: "bootstrap",
        certificateData: fs.readFileSync(certFile, "utf8"),
        signature: signature
    });
})
.then(() => {
    console.log(`Certificate uploaded with name "${commonName}"`);
})
.catch(error => {
    if (error) console.log(error.message || error);
});
