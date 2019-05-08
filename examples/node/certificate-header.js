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
var readline = require("readline");

var PelionDMSDK = require("../../index");
var config = require("./config");

var certificateName = "header-cert";
var outputFile = path.join(process.cwd(), "header.h");

var certificates = new PelionDMSDK.CertificatesApi(config);

// Check for existing certificate with the same name
function checkCertificate() {
    return certificates.listCertificates({
        filter: {
            type: "developer"
        }
    })
    .then(certs => {
        var certificate = certs.data.find(cert => {
            return cert.name === certificateName;
        });

        if (certificate) {
            return new Promise((resolve, reject) => {
                var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                rl.question("Developer certificate already exists, overwrite? [y/N] ", answer => {
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

checkCertificate()
.then(() => {
    return certificates.addDeveloperCertificate({
        name: certificateName
    });
})
.then(certificate => {
    fs.writeFileSync(outputFile, certificate.headerFile);
    console.log(`Header file written to ${outputFile}`);
})
.catch(error => {
    if (error) console.log(error.message || error);
});
