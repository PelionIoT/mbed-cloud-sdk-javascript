!function(){function e(t,n,r){function i(c,u){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(o)return o(c,!0);var s=new Error("Cannot find module '"+c+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){return i(t[c][1][e]||e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var o="function"==typeof require&&require,c=0;c<r.length;c++)i(r[c]);return i}return e}()({1:[function(e,t,n){"use strict";function r(e){[{id:"1",event:"registration"},{id:"1",event:"registration"},{id:"2",event:"registration"},{id:"2",event:"registration"},{id:"3",event:"registration"},{id:"3",event:"registration"},{id:"4",event:"registration"},{id:"4",event:"registration"},{id:"5",event:"registration"},{id:"1",event:"reregistration"},{id:"1",event:"reregistration"},{id:"2",event:"reregistration"},{id:"2",event:"reregistration"},{id:"3",event:"reregistration"},{id:"3",event:"reregistration"},{id:"4",event:"reregistration"},{id:"4",event:"reregistration"},{id:"5",event:"reregistration"},{id:"1",event:"deregistration"},{id:"1",event:"deregistration"},{id:"2",event:"deregistration"},{id:"2",event:"deregistration"},{id:"3",event:"deregistration"},{id:"3",event:"deregistration"},{id:"4",event:"deregistration"},{id:"4",event:"deregistration"},{id:"5",event:"deregistration"},{id:"1",event:"expired"},{id:"1",event:"expired"},{id:"2",event:"expired"},{id:"2",event:"expired"},{id:"3",event:"expired"},{id:"3",event:"expired"},{id:"4",event:"expired"},{id:"4",event:"expired"},{id:"5",event:"expired"}].forEach(function(t){return e.notify(t)})}/*
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
Object.defineProperty(n,"__esModule",{value:!0});var i=intern.getInterface("tdd"),o=i.suite,c=i.test,u=intern.getPlugin("chai").assert,a=e("../connect/subscribe/subscribe");o("testSubscribe",function(){c("allEvents",function(){var e=new a.Subscribe,t=[];e.deviceState().addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,36),r(e),u.lengthOf(t,72)}),c("oneDeviceId",function(){var e=new a.Subscribe,t=[];e.deviceState({id:"1"}).addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,8),r(e),u.lengthOf(t,16)}),c("multipleDeviceId",function(){var e=new a.Subscribe,t=[];e.deviceState({id:["1","2"]}).addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,16),r(e),u.lengthOf(t,32)}),c("oneState",function(){var e=new a.Subscribe,t=[];e.deviceState({event:"registration"}).addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,9),r(e),u.lengthOf(t,18)}),c("multipleStates",function(){var e=new a.Subscribe,t=[];e.deviceState({event:["registration","deregistration"]}).addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,18),r(e),u.lengthOf(t,36)}),c("specific",function(){var e=new a.Subscribe,t=[];e.deviceState({id:"1",event:"registration"}).addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,2),r(e),u.lengthOf(t,4)}),c("multipleSpecific",function(){var e=new a.Subscribe,t=[];e.deviceState({id:["1","3"],event:["registration","deregistration"]}).addCallback(function(e){return t.push(e)}),r(e),u.lengthOf(t,8),r(e),u.lengthOf(t,16)})}),n.mockNotify=r},{"../connect/subscribe/subscribe":7}],2:[function(e,t,n){(function(t){"use strict";function r(e,t){if(!t)return new Promise(function(t,n){try{e(function(e,r){e?n(e):t(r)})}catch(e){n(new v.SDKError(e.message,e))}});try{e(t)}catch(e){t(new v.SDKError(e.message,e))}}function i(e,t,n,i){return void 0===i&&(i=!1),r(function(n){try{e(function(e,r){if(e)return i||404!==e.code?n(e):n(null,null);if(!t)return n(null,r);try{t(r,n)}catch(e){n(new v.SDKError(e.message,e))}})}catch(e){n(new v.SDKError(e.message,e))}},n)}function o(e,n){var r="";if(r="function"==typeof atob?atob(e):new t(e,"base64").toString("binary"),n&&n.indexOf("tlv")>-1)try{return p.decodeTlv(r)}catch(e){}return r}function c(e){return e&&e.length?e.map(a).join(","):null}function u(e){return e.replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function a(e){return e.replace(/([A-Z]+?)/g,function(e){return"_"+e.toLowerCase()})}function s(e,t,n){if(void 0===n&&(n=null),e&&e[t]){var r=e[t];if(r.constructor!=={}.constructor)return r;if(r.$eq)return r.$eq}return n}function f(e,t,n){function r(e,n,r,i){if(void 0===i&&(i=""),r instanceof Date&&(r=r.toISOString()),"boolean"==typeof r&&(r=r.toString()),i)i=a(i),i+="__";else{var o=t.from.indexOf(e);e=o>-1?t.to[o]:a(e)}var c=n.replace("$","");return"ne"===c&&(c="neq"),"eq"===c&&(c=""),c&&(c="__"+c),""+i+e+c+"="+r}return void 0===t&&(t={from:[],to:[]}),void 0===n&&(n=[]),e?Object.keys(e).map(function(t){return e[t].constructor!=={}.constructor?r(t,"",e[t]):Object.keys(e[t]).map(function(i){return n.indexOf(t)>-1?e[t][i].constructor!=={}.constructor?r(i,"",e[t][i],t):Object.keys(e[t][i]).map(function(n){return r(i,n,e[t][i][n],t)}).join("&"):r(t,i,e[t][i])}).join("&")}).join("&"):""}function d(e,t,n){function r(e){var n=t.to.indexOf(e);return n>-1?t.from[n]:u(e)}function i(e,t,n){t||(t="eq"),"neq"===t&&(t="ne"),t="$"+t,e[t]=n}void 0===t&&(t={from:[],to:[]}),void 0===n&&(n=[]);var o={};return e=decodeURIComponent(e),e.split("&").forEach(function(e){var t=e.match(/^(.+)=(.+)$/);if(t){var c=t[2],u=t[1].split("__"),a=r(u[0]);if(o[a]||(o[a]={}),n.indexOf(a)>-1){var s=u[1];return o[a][s]||(o[a][s]={}),void i(o[a][s],u[2],c)}i(o[a],u[1],c)}}),o}function l(e){return e instanceof Array?e:[e]}/*
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
Object.defineProperty(n,"__esModule",{value:!0});var v=e("./sdkError"),p=e("./tlvDecoder");n.asyncStyle=r,n.apiWrapper=i,n.decodeBase64=o,n.encodeInclude=c,n.snakeToCamel=u,n.camelToSnake=a,n.extractFilter=s,n.encodeFilter=f,n.decodeFilter=d,n.ensureArray=l}).call(this,e("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:8}],3:[function(e,t,n){"use strict";/*
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
var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(n,"__esModule",{value:!0});var i=function(e){function t(t,n,r,i){var o=e.call(this,t)||this;return o.innerError=n,o.details=r,o.code=i,o}return r(t,e),t}(Error);n.SDKError=i},{}],4:[function(e,t,n){"use strict";function r(e){return(e&a)===a?2:1}function i(e){return(e&s)===l.ONE_BYTE?1:(e&s)===l.TWO_BYTE?2:(e&s)===l.TRE_BYTE?3:e&f}function o(e,t,n){if(void 0===t&&(t={}),void 0===n&&(n=""),!e||e.length<1)return t;var c=e[0],a=c&u,f=r(c),v=i(c),p=function(e){return String.fromCharCode(e)},h=function(e,t,n,r){return e+(t<<8*(r.length-n-1))},b=1,g=e.slice(b,b+f).reduce(h,0);b+=f;var _=v;if((c&s)!==l.OTR_BYTE&&(_=e.slice(b,b+v).reduce(h,0),b+=v),a===d.MULT_RESOURCE)o(e.slice(b,b+_),t,n+"/"+g);else{var y=e.slice(b,b+_),O=y.some(function(e){return 0===e}),S=O?y.reduce(h,0):y.map(p).join("");t[n+"/"+g]=S}return b+=_,o(e.slice(b),t,n),t}function c(e){return o(e.split("").map(function(e){return e.charCodeAt(0)}))}/*
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
Object.defineProperty(n,"__esModule",{value:!0});var u=parseInt("11000000",2),a=parseInt("00100000",2),s=parseInt("00011000",2),f=parseInt("00000111",2),d={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},l={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};n.decodeTlv=c},{}],5:[function(e,t,n){"use strict";/*
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
var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(n,"__esModule",{value:!0});var i=e("../observer"),o=e("../../../../common/functions"),c=function(e){function t(t){var n=e.call(this)||this;return n._subscribed=!0,t&&(n.filter=t),n}return r(t,e),t.prototype.filterFunc=function(e){if(this.filter)for(var t in this.filter)if(-1===o.ensureArray(this.filter[t]).indexOf(e[t]))return!1;return!0},t.prototype.notify=function(t){this._subscribed&&this.filterFunc(t)&&e.prototype.notify.call(this,t)},t.prototype.unsubscribe=function(){this._subscribed=!1,e.prototype.clearCallbacks.call(this)},t}(i.Observer);n.DeviceStateObserver=c},{"../../../../common/functions":2,"../observer":6}],6:[function(e,t,n){"use strict";/*
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
Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(){this.notificationQueue=new Array,this.callbacks=new Array,this._waiting=new Array}return e.prototype.notify=function(e){this._notifyCallbacks(e),this._waiting.length>0?this._waiting.shift()(e):this.notificationQueue.push(e)},e.prototype.take=function(e){var t=this;if(this.notificationQueue.length>0){var n=this.notificationQueue.shift();if(!e)return new Promise(function(e,t){e(n)});e(n)}else{if(!e){return new Promise(function(e,n){var r=function(t){e(t)};t._waiting.push(r)})}this._waiting.push(e)}},e.prototype.addCallback=function(e){this.callbacks.push(e)},e.prototype.removeCallback=function(e){var t=this.callbacks.indexOf(e,0);t>-1&&this.callbacks.splice(t,1)},e.prototype.clearCallbacks=function(){this.callbacks=new Array},e.prototype._notifyCallbacks=function(e){this.callbacks.forEach(function(t){return t(e)})},e}();n.Observer=r},{}],7:[function(e,t,n){"use strict";/*
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
Object.defineProperty(n,"__esModule",{value:!0});var r=e("./observers/DeviceState/deviceStateObserver"),i=function(){function e(e){e&&(this.connect=e),this.deviceStateObservers=new Array}return e.prototype.deviceState=function(e){var t=new r.DeviceStateObserver(e);return this.deviceStateObservers.push(t),this.connect&&(this.connect.handleNotifications||this.connect.startNotifications()),t},e.prototype.notify=function(e){this.deviceStateObservers.forEach(function(t){return t.notify(e)})},e}();n.Subscribe=i},{"./observers/DeviceState/deviceStateObserver":5}],8:[function(e,t,n){},{}]},{},[1]);
//# sourceMappingURL=subscribe.js.map
