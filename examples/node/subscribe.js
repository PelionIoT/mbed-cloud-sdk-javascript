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

var PelionDMSDK = require("../../index");
var config = require("./config");

var connect = new PelionDMSDK.ConnectApi(config);

// creates an observer with no filter. This will listen for all device events
const observer = connect.subscribe.deviceStateChanges();

// add a Listener
observer.addListener(res => console.log(res));

// get a single device event via a promise
observer.once().then(res => console.log(res));

// get a single device event via a callback
observer.once(res => console.log(res));

// this observer will listen for registration events where the device Id is 1
const filteredObserver = connect.subscribe.deviceStateChanges({ id: "1", event: "registrations" });

// add a Listener
filteredObserver.addListener(res => console.log(res));

// subscribe to all resource paths on all your devices
const subObserver = connect.subscribe.resourceValues({ deviceId: "*" })
                                      .addListener(res => console.log(res));

// by default, resourceValues() will create subscriptions for all matching resources. To turn this off set first value to "OnRegistration".
const subObserver1 = connect.subscribe.resourceValues({ deviceId: "*" }, "OnRegistration")
                                      .addListener(res => console.log(res));

// subscribe to devices whose id begins with 0161
const subObserver2 = connect.subscribe.resourceValues({ deviceId: "0161*" })
                                      .addListener(res => console.log(res));

// subscribe to two paths on a specific device
const subObserver3 = connect.subscribe.resourceValues({ deviceId: "0161661f44460000000000010010004f", resourcePaths: ["/3200/0/5501", "/5/0/3"] })
                                      .addListener(res => console.log(res));

// subscribe to two paths on two specific devices
const subObserver4 = connect.subscribe.resourceValues({ deviceId: ["0161661f44460000000000010010004f", "0161661f44460000000000010010004f"], resourcePaths: ["/3200/0/5501", "/5/0/3"] })
                                      .addListener(res => console.log(res));

// subscribe to two resource paths on all your devices
const subObserver5 = connect.subscribe.resourceValues({ resourcePaths: ["/3200/0/5501"] })
    .addListener(res => console.log(res))
    .addLocalFilter(res => res.payload >= 20);

subObserver.once().then(res => console.log(res));

process.stdin.resume();
