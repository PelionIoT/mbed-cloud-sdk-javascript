!function(){function t(n,e,r){function i(c,u){if(!e[c]){if(!n[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(o)return o(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var s=e[c]={exports:{}};n[c][0].call(s.exports,function(t){return i(n[c][1][t]||t)},s,s.exports,t,n,e,r)}return e[c].exports}for(var o="function"==typeof require&&require,c=0;c<r.length;c++)i(r[c]);return i}return t}()({1:[function(t,n,e){"use strict";/*
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
Object.defineProperty(e,"__esModule",{value:!0});var r=intern.getInterface("tdd"),i=r.suite,o=r.test,c=intern.getPlugin("chai").assert,u=t("../common/functions");i("testFunctions",function(){o("nullWildcardString",function(){var t=u.matchWithWildcard(null,"3/0/0");c.isTrue(t)}),o("undefinedWildcardString",function(){var t=u.matchWithWildcard(void 0,"3/0/0");c.isTrue(t)}),o("emptyWildcardString",function(){var t=u.matchWithWildcard("","3/0/0");c.isTrue(t)}),o("correctWildcarsString",function(){var t=u.matchWithWildcard("3/0/0","3/0/0");c.isTrue(t)}),o("wildcardString",function(){var t="3/*",n=u.matchWithWildcard(t,"3/0/0");c.isTrue(n),t="3/0/*",n=u.matchWithWildcard(t,"3/0/0"),c.isTrue(n),t="3/0/*",n=u.matchWithWildcard(t,"3/1/0"),c.isFalse(n),t="*",n=u.matchWithWildcard(t,"3/1/0"),c.isTrue(n)})}),i("testPayloadDecoding",function(){o("string",function(){var t=u.decodeBase64("dGVzdA==","text/plain");c.isString(t)}),o("number",function(){var t=u.decodeBase64("NQ==","text/plain");c.isNumber(t)}),o("tlv",function(){var t=u.decodeBase64("AAA=","tlv");c.deepEqual(t,{"/0":""})})}),i("testBillingMonth",function(){o("singleDigitMonth",function(){var t=new Date(2018,4),n=u.dateToBillingMonth(t);c.strictEqual("2018-05",n)}),o("doubleDigitMonth",function(){var t=new Date(2018,11),n=u.dateToBillingMonth(t);c.strictEqual("2018-12",n)})})},{"../common/functions":2}],2:[function(t,n,e){(function(n){"use strict";function r(t,n){if(!n)return new Promise(function(n,e){try{t(function(t,r){t?e(t):n(r)})}catch(t){e(new h.SDKError(t.message,t))}});try{t(n)}catch(t){n(new h.SDKError(t.message,t))}}function i(t,n,e,i){return void 0===i&&(i=!1),r(function(e){try{t(function(t,r){if(t)return i||404!==t.code?e(t):e(null,null);if(!n)return e(null,r);try{n(r,e)}catch(t){e(new h.SDKError(t.message,t))}})}catch(t){e(new h.SDKError(t.message,t))}},e)}function o(t,e){var r="";if(r="function"==typeof atob?atob(t):new n(t,"base64").toString("binary"),e&&e.indexOf("tlv")>-1)try{return _.decodeTlv(r)}catch(t){}return isNaN(r)?r:Number(r)}function c(t){return t&&t.length?t.map(a).join(","):null}function u(t){return t.replace(/(\_\w)/g,function(t){return t[1].toUpperCase()})}function a(t){return t.replace(/([A-Z]+?)/g,function(t){return"_"+t.toLowerCase()})}function f(t,n,e,r){if(void 0===e&&(e="$eq"),void 0===r&&(r=null),t&&t[n]){var i=t[n];if(i.constructor!=={}.constructor)return i;switch(e){case"$ne":if(i.$ne)return i.$ne;break;case"$gte":if(i.$gte)return i.$gte;break;case"$lte":if(i.$lte)return i.$lte;break;case"$in":if(i.$in)return i.$in;break;case"$nin":if(i.$nin)return i.$nin;break;default:if(i.$eq)return i.$eq}}return r}function s(t,n,e){function r(t,e,r,i){if(void 0===i&&(i=""),r instanceof Date&&(r=r.toISOString()),"boolean"==typeof r&&(r=r.toString()),i)i=a(i),i+="__";else{var o=n.from.indexOf(t);t=o>-1?n.to[o]:a(t)}var c=e.replace("$","");return"ne"===c&&(c="neq"),"eq"===c&&(c=""),c&&(c="__"+c),""+i+t+c+"="+r}return void 0===n&&(n={from:[],to:[]}),void 0===e&&(e=[]),t?Object.keys(t).map(function(n){return t[n].constructor!=={}.constructor?r(n,"",t[n]):Object.keys(t[n]).map(function(i){return e.indexOf(n)>-1?t[n][i].constructor!=={}.constructor?r(i,"",t[n][i],n):Object.keys(t[n][i]).map(function(e){return r(i,e,t[n][i][e],n)}).join("&"):r(n,i,t[n][i])}).join("&")}).join("&"):""}function l(t,n,e){function r(t){var e=n.to.indexOf(t);return e>-1?n.from[e]:u(t)}function i(t,n,e){n||(n="eq"),"neq"===n&&(n="ne"),n="$"+n,t[n]=e}void 0===n&&(n={from:[],to:[]}),void 0===e&&(e=[]);var o={};return t=decodeURIComponent(t),t.split("&").forEach(function(t){var n=t.match(/^(.+)=(.+)$/);if(n){var c=n[2],u=n[1].split("__"),a=r(u[0]);if(o[a]||(o[a]={}),e.indexOf(a)>-1){var f=u[1];return o[a][f]||(o[a][f]={}),void i(o[a][f],u[2],c)}i(o[a],u[1],c)}}),o}function d(t){return t instanceof Array?t:[t]}function v(t,n){return null!==n&&void 0!==n&&""!==n&&(null===t||void 0===t||""===t||"*"===t||(t.endsWith("*")?n.startsWith(t.slice(0,-1)):t===n))}function p(t){return t=new Date(t),t.getFullYear()+"-"+("0"+(t.getMonth()+1)).slice(-2)}/*
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
Object.defineProperty(e,"__esModule",{value:!0});var h=t("./sdkError"),_=t("./tlvDecoder");e.asyncStyle=r,e.apiWrapper=i,e.decodeBase64=o,e.encodeInclude=c,e.snakeToCamel=u,e.camelToSnake=a,e.extractFilter=f,e.encodeFilter=s,e.decodeFilter=l,e.ensureArray=d,e.matchWithWildcard=v,e.dateToBillingMonth=p}).call(this,t("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:5}],3:[function(t,n,e){"use strict";/*
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
var r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])};return function(n,e){function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function n(n,e,r,i){var o=t.call(this,n)||this;return o.innerError=e,o.details=r,o.code=i,o}return r(n,t),n}(Error);e.SDKError=i},{}],4:[function(t,n,e){"use strict";function r(t){return(t&a)===a?2:1}function i(t){return(t&f)===d.ONE_BYTE?1:(t&f)===d.TWO_BYTE?2:(t&f)===d.TRE_BYTE?3:t&s}function o(t,n,e){if(void 0===n&&(n={}),void 0===e&&(e=""),!t||t.length<1)return n;var c=t[0],a=c&u,s=r(c),v=i(c),p=function(t){return String.fromCharCode(t)},h=function(t,n,e,r){return t+(n<<8*(r.length-e-1))},_=1,m=t.slice(_,_+s).reduce(h,0);_+=s;var g=v;if((c&f)!==d.OTR_BYTE&&(g=t.slice(_,_+v).reduce(h,0),_+=v),a===l.MULT_RESOURCE)o(t.slice(_,_+g),n,e+"/"+m);else{var E=t.slice(_,_+g),T=E.some(function(t){return 0===t}),O=T?E.reduce(h,0):E.map(p).join("");n[e+"/"+m]=O}return _+=g,o(t.slice(_),n,e),n}function c(t){return o(t.split("").map(function(t){return t.charCodeAt(0)}))}/*
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
Object.defineProperty(e,"__esModule",{value:!0});var u=parseInt("11000000",2),a=parseInt("00100000",2),f=parseInt("00011000",2),s=parseInt("00000111",2),l={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},d={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};e.decodeTlv=c},{}],5:[function(t,n,e){},{}]},{},[1]);
//# sourceMappingURL=functions.js.map
