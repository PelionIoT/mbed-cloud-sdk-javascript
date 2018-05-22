!function(){function e(t,r,n){function i(s,c){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!c&&u)return u(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var f=r[s]={exports:{}};t[s][0].call(f.exports,function(e){return i(t[s][1][e]||e)},f,f.exports,e,t,r,n)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}return e}()({1:[function(e,t,r){"use strict";function n(e){[{id:"1",event:"registration"},{id:"1",event:"registration"},{id:"2",event:"registration"},{id:"2",event:"registration"},{id:"3",event:"registration"},{id:"3",event:"registration"},{id:"4",event:"registration"},{id:"4",event:"registration"},{id:"5",event:"registration"},{id:"1",event:"reregistration"},{id:"1",event:"reregistration"},{id:"2",event:"reregistration"},{id:"2",event:"reregistration"},{id:"3",event:"reregistration"},{id:"3",event:"reregistration"},{id:"4",event:"reregistration"},{id:"4",event:"reregistration"},{id:"5",event:"reregistration"},{id:"1",event:"deregistration"},{id:"1",event:"deregistration"},{id:"2",event:"deregistration"},{id:"2",event:"deregistration"},{id:"3",event:"deregistration"},{id:"3",event:"deregistration"},{id:"4",event:"deregistration"},{id:"4",event:"deregistration"},{id:"5",event:"deregistration"},{id:"1",event:"expired"},{id:"1",event:"expired"},{id:"2",event:"expired"},{id:"2",event:"expired"},{id:"3",event:"expired"},{id:"3",event:"expired"},{id:"4",event:"expired"},{id:"4",event:"expired"},{id:"5",event:"expired"}].forEach(function(t){return e.notifyDeviceEvents(t)})}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var i=intern.getInterface("tdd"),o=i.suite,s=i.test,c=intern.getPlugin("chai").assert,u=e("../subscribe/subscribe");o("testSubscribe",function(){s("allEvents",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges().addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,36),n(e),c.lengthOf(t,72)}),s("oneDeviceId",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges({id:"1"}).addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,8),n(e),c.lengthOf(t,16)}),s("multipleDeviceId",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges({id:["1","2"]}).addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,16),n(e),c.lengthOf(t,32)}),s("oneState",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges({event:"registration"}).addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,9),n(e),c.lengthOf(t,18)}),s("multipleStates",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges({event:["registration","deregistration"]}).addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,18),n(e),c.lengthOf(t,36)}),s("specific",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges({id:"1",event:"registration"}).addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,2),n(e),c.lengthOf(t,4)}),s("multipleSpecific",function(){var e=new u.Subscribe,t=[];e.deviceStateChanges({id:["1","3"],event:["registration","deregistration"]}).addListener(function(e){return t.push(e)}),n(e),c.lengthOf(t,8),n(e),c.lengthOf(t,16)})}),r.mockNotify=n},{"../subscribe/subscribe":8}],2:[function(e,t,r){(function(t){"use strict";function n(e,t){if(!t)return new Promise(function(t,r){try{e(function(e,n){e?r(e):t(n)})}catch(e){r(new h.SDKError(e.message,e))}});try{e(t)}catch(e){t(new h.SDKError(e.message,e))}}function i(e,t,r,i){return void 0===i&&(i=!1),n(function(r){try{e(function(e,n){if(e)return i||404!==e.code?r(e):r(null,null);if(!t)return r(null,n);try{t(n,r)}catch(e){r(new h.SDKError(e.message,e))}})}catch(e){r(new h.SDKError(e.message,e))}},r)}function o(e,r){var n="";if(n="function"==typeof atob?atob(e):new t(e,"base64").toString("binary"),r&&r.indexOf("tlv")>-1)try{return v.decodeTlv(n)}catch(e){}return isNaN(n)?n:Number(n)}function s(e){return e&&e.length?e.map(u).join(","):null}function c(e){return e.replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function u(e){return e.replace(/([A-Z]+?)/g,function(e){return"_"+e.toLowerCase()})}function a(e,t,r,n){if(void 0===r&&(r="$eq"),void 0===n&&(n=null),e&&e[t]){var i=e[t];if(i.constructor!=={}.constructor)return i;switch(r){case"$ne":if(i.$ne)return i.$ne;break;case"$gte":if(i.$gte)return i.$gte;break;case"$lte":if(i.$lte)return i.$lte;break;case"$in":if(i.$in)return i.$in;break;case"$nin":if(i.$nin)return i.$nin;break;default:if(i.$eq)return i.$eq}}return n}function f(e,t,r){function n(e,r,n,i){if(void 0===i&&(i=""),n instanceof Date&&(n=n.toISOString()),"boolean"==typeof n&&(n=n.toString()),i)i=u(i),i+="__";else{var o=t.from.indexOf(e);e=o>-1?t.to[o]:u(e)}var s=r.replace("$","");return"ne"===s&&(s="neq"),"eq"===s&&(s=""),s&&(s="__"+s),""+i+e+s+"="+n}return void 0===t&&(t={from:[],to:[]}),void 0===r&&(r=[]),e?Object.keys(e).map(function(t){return e[t].constructor!=={}.constructor?n(t,"",e[t]):Object.keys(e[t]).map(function(i){return r.indexOf(t)>-1?e[t][i].constructor!=={}.constructor?n(i,"",e[t][i],t):Object.keys(e[t][i]).map(function(r){return n(i,r,e[t][i][r],t)}).join("&"):n(t,i,e[t][i])}).join("&")}).join("&"):""}function d(e,t,r){function n(e){var r=t.to.indexOf(e);return r>-1?t.from[r]:c(e)}function i(e,t,r){t||(t="eq"),"neq"===t&&(t="ne"),t="$"+t,e[t]=r}void 0===t&&(t={from:[],to:[]}),void 0===r&&(r=[]);var o={};return e=decodeURIComponent(e),e.split("&").forEach(function(e){var t=e.match(/^(.+)=(.+)$/);if(t){var s=t[2],c=t[1].split("__"),u=n(c[0]);if(o[u]||(o[u]={}),r.indexOf(u)>-1){var a=c[1];return o[u][a]||(o[u][a]={}),void i(o[u][a],c[2],s)}i(o[u],c[1],s)}}),o}function l(e){return e instanceof Array?e:[e]}function p(e,t){return null!==t&&void 0!==t&&""!==t&&(null===e||void 0===e||""===e||"*"===e||(e.endsWith("*")?t.startsWith(e.slice(0,-1)):e===t))}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var h=e("./sdkError"),v=e("./tlvDecoder");r.asyncStyle=n,r.apiWrapper=i,r.decodeBase64=o,r.encodeInclude=s,r.snakeToCamel=c,r.camelToSnake=u,r.extractFilter=a,r.encodeFilter=f,r.decodeFilter=d,r.ensureArray=l,r.matchWithWildcard=p}).call(this,e("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:9}],3:[function(e,t,r){"use strict";/*
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
var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(r,"__esModule",{value:!0});var i=function(e){function t(t,r,n,i){var o=e.call(this,t)||this;return o.innerError=r,o.details=n,o.code=i,o}return n(t,e),t}(Error);r.SDKError=i},{}],4:[function(e,t,r){"use strict";function n(e){return(e&u)===u?2:1}function i(e){return(e&a)===l.ONE_BYTE?1:(e&a)===l.TWO_BYTE?2:(e&a)===l.TRE_BYTE?3:e&f}function o(e,t,r){if(void 0===t&&(t={}),void 0===r&&(r=""),!e||e.length<1)return t;var s=e[0],u=s&c,f=n(s),p=i(s),h=function(e){return String.fromCharCode(e)},v=function(e,t,r,n){return e+(t<<8*(n.length-r-1))},b=1,y=e.slice(b,b+f).reduce(v,0);b+=f;var g=p;if((s&a)!==l.OTR_BYTE&&(g=e.slice(b,b+p).reduce(v,0),b+=p),u===d.MULT_RESOURCE)o(e.slice(b,b+g),t,r+"/"+y);else{var _=e.slice(b,b+g),O=_.some(function(e){return 0===e}),m=O?_.reduce(v,0):_.map(h).join("");t[r+"/"+y]=m}return b+=g,o(e.slice(b),t,r),t}function s(e){return o(e.split("").map(function(e){return e.charCodeAt(0)}))}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var c=parseInt("11000000",2),u=parseInt("00100000",2),a=parseInt("00011000",2),f=parseInt("00000111",2),d={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},l={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};r.decodeTlv=s},{}],5:[function(e,t,r){"use strict";/*
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
var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(r,"__esModule",{value:!0});var i=e("./observer"),o=e("../../common/functions"),s=function(e){function t(t){var r=e.call(this)||this;return r._subscribed=!0,t&&(r.filter=t),r}return n(t,e),t.prototype.filterFunc=function(e){if(this.filter)for(var t in this.filter)if(-1===o.ensureArray(this.filter[t]).indexOf(e[t]))return!1;return!0},t.prototype.notify=function(t){this._subscribed&&this.filterFunc(t)&&e.prototype.notify.call(this,t)},t.prototype.unsubscribe=function(){this._subscribed=!1,e.prototype.clearListeners.call(this)},t}(i.Observer);r.DeviceStateObserver=s},{"../../common/functions":2,"./observer":6}],6:[function(e,t,r){"use strict";/*
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
Object.defineProperty(r,"__esModule",{value:!0});var n=function(){function e(){this.subscribed=!0,this.notificationQueue=new Array,this.callbacks=new Array,this._waiting=new Array,this.filters=new Array}return e.prototype.notify=function(e){this.runLocalFilter(e)&&(this._notifyCallbacks(e),this._waiting.length>0?this._waiting.shift()(e):this.notificationQueue.push(e))},e.prototype.once=function(e){var t=this;if(this.notificationQueue.length>0){var r=this.notificationQueue.shift();if(!e)return new Promise(function(e,t){e(r)});e(r)}else{if(!e){return new Promise(function(e,r){var n=function(t){e(t)};t._waiting.push(n)})}this._waiting.push(e)}},e.prototype.addListener=function(e){return this.callbacks.push(e),this},e.prototype.removeListener=function(e){var t=this.callbacks.indexOf(e,0);return t>-1&&this.callbacks.splice(t,1),this},e.prototype.clearListeners=function(){return this.callbacks=new Array,this},e.prototype.listeners=function(){return this.callbacks},e.prototype.getNotificationQueue=function(){return this.notificationQueue},e.prototype.addLocalFilter=function(e){return this.filters.push(e),this},e.prototype.runLocalFilter=function(e){return!(this.filters.length>0)||this.filters.some(function(t){return t(e)})},e.prototype._notifyCallbacks=function(e){this.callbacks.forEach(function(t){return t(e)})},e}();r.Observer=n},{}],7:[function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(r,"__esModule",{value:!0});var i=e("./observer"),o=e("../../common/functions"),s=function(e){function t(t,r,n){void 0===n&&(n="OnValueUpdate");var i=e.call(this)||this;return i._subscribed=!0,i.firstValue=n,i.localPresubscriptions=new Array,r&&(i.connect=r),t&&(i.filter=t,o.ensureArray(i.filter.deviceId).forEach(function(e){i.localPresubscriptions.push({deviceId:e,resourcePaths:i.filter.resourcePaths||new Array})}),i.syncPresubscriptions()),i}return n(t,e),t.prototype.notify=function(t){this._subscribed&&(0===this.localPresubscriptions.length&&e.prototype.notify.call(this,t),this.compareData(t)&&e.prototype.notify.call(this,t))},t.prototype.unsubscribe=function(){this._subscribed=!1,e.prototype.clearListeners.call(this)},t.prototype.compareData=function(e){return this.localPresubscriptions.some(function(t){return o.matchWithWildcard(t.deviceId,e.deviceId)&&(0===t.resourcePaths.length||t.resourcePaths.some(function(t){return o.matchWithWildcard(t,e.path)}))})},t.prototype.syncPresubscriptions=function(){var e=this;this.connect&&(this.connect.listPresubscriptions().then(function(t){var r=e.localPresubscriptions.concat(t),n=r.filter(function(e,t,r){return t===r.indexOf(e)});e.connect.updatePresubscriptions(n)}),"OnValueUpdate"===this.firstValue&&this.localPresubscriptions.forEach(function(t){e.connect.listConnectedDevices().then(function(r){r.data.filter(function(e){return o.matchWithWildcard(e.id,t.deviceId)}).forEach(function(r){r.listResources().then(function(n){n.forEach(function(n){(0===t.resourcePaths.length||t.resourcePaths.some(function(e){return o.matchWithWildcard(e,n.path)}))&&e.connect.addResourceSubscription(r.id,n.path)})})})})}))},t}(i.Observer);r.ResourceValuesObserver=s},{"../../common/functions":2,"./observer":6}],8:[function(e,t,r){"use strict";/*
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
Object.defineProperty(r,"__esModule",{value:!0});var n=e("./observers/deviceStateObserver"),i=e("./observers/resourceValuesObserver"),o=function(){function e(e){e&&(this.connect=e),this.deviceStateObservers=new Array,this.resourceValueObservers=new Array}return e.prototype.deviceStateChanges=function(e){var t=new n.DeviceStateObserver(e);return this.deviceStateObservers.push(t),this.startNotifications(),t},e.prototype.resourceValues=function(e,t){void 0===t&&(t="OnValueUpdate");var r=new i.ResourceValuesObserver(e,this.connect,t);return this.resourceValueObservers.push(r),this.startNotifications(),r},e.prototype.notifyDeviceEvents=function(e){this.deviceStateObservers.forEach(function(t){return t.notify(e)})},e.prototype.notifyResourceValues=function(e){this.resourceValueObservers.forEach(function(t){return t.notify(e)})},e.prototype.startNotifications=function(){this.connect&&(this.connect.handleNotifications||this.connect.startNotifications())},e}();r.Subscribe=o},{"./observers/deviceStateObserver":5,"./observers/resourceValuesObserver":7}],9:[function(e,t,r){},{}]},{},[1]);
//# sourceMappingURL=subscribe.js.map
