/*
* Mbed Cloud JavaScript SDK
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

var MbedCloudSDK = require("../../index");
var config = require("./config");

var connect = new MbedCloudSDK.ConnectApi(config);

// creates an observer with no filter. This will listen for all device events
const observer = connect.subscribe.deviceState();

// add a callback
observer.addCallback(res => console.log(res));

// get a single device event via a promise
observer.once().then(res => console.log(res));

// get a single device event via a callback
observer.once(res => console.log(res));

// this observer will listen for registration events where the device Id is 1
const filteredObserver = connect.subscribe.deviceState({ id: "1", event: "registrations" });

// add a callback
filteredObserver.addCallback(res => console.log(res));

process.stdin.resume();
