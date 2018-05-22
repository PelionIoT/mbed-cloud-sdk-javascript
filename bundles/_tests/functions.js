!function(){function r(n,e,t){function i(c,u){if(!e[c]){if(!n[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(o)return o(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var s=e[c]={exports:{}};n[c][0].call(s.exports,function(r){return i(n[c][1][r]||r)},s,s.exports,r,n,e,t)}return e[c].exports}for(var o="function"==typeof require&&require,c=0;c<t.length;c++)i(t[c]);return i}return r}()({1:[function(r,n,e){"use strict";/*
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
Object.defineProperty(e,"__esModule",{value:!0});var t=intern.getInterface("tdd"),i=t.suite,o=t.test,c=intern.getPlugin("chai").assert,u=r("../common/functions");i("testFunctions",function(){o("nullWildcardString",function(){var r=u.matchWithWildcard(null,"3/0/0");c.isTrue(r)}),o("undefinedWildcardString",function(){var r=u.matchWithWildcard(void 0,"3/0/0");c.isTrue(r)}),o("emptyWildcardString",function(){var r=u.matchWithWildcard("","3/0/0");c.isTrue(r)}),o("correctWildcarsString",function(){var r=u.matchWithWildcard("3/0/0","3/0/0");c.isTrue(r)}),o("wildcardString",function(){var r="3/*",n=u.matchWithWildcard(r,"3/0/0");c.isTrue(n),r="3/0/*",n=u.matchWithWildcard(r,"3/0/0"),c.isTrue(n),r="3/0/*",n=u.matchWithWildcard(r,"3/1/0"),c.isFalse(n),r="*",n=u.matchWithWildcard(r,"3/1/0"),c.isTrue(n)})}),i("testPayloadDecoding",function(){o("string",function(){var r=u.decodeBase64("dGVzdA==","text/plain");c.isString(r)}),o("number",function(){var r=u.decodeBase64("NQ==","text/plain");c.isNumber(r)}),o("tlv",function(){var r=u.decodeBase64("AAA=","tlv");c.deepEqual(r,{"/0":""})})})},{"../common/functions":2}],2:[function(r,n,e){(function(n){"use strict";function t(r,n){if(!n)return new Promise(function(n,e){try{r(function(r,t){r?e(r):n(t)})}catch(r){e(new p.SDKError(r.message,r))}});try{r(n)}catch(r){n(new p.SDKError(r.message,r))}}function i(r,n,e,i){return void 0===i&&(i=!1),t(function(e){try{r(function(r,t){if(r)return i||404!==r.code?e(r):e(null,null);if(!n)return e(null,t);try{n(t,e)}catch(r){e(new p.SDKError(r.message,r))}})}catch(r){e(new p.SDKError(r.message,r))}},e)}function o(r,e){var t="";if(t="function"==typeof atob?atob(r):new n(r,"base64").toString("binary"),e&&e.indexOf("tlv")>-1)try{return h.decodeTlv(t)}catch(r){}return isNaN(t)?t:Number(t)}function c(r){return r&&r.length?r.map(a).join(","):null}function u(r){return r.replace(/(\_\w)/g,function(r){return r[1].toUpperCase()})}function a(r){return r.replace(/([A-Z]+?)/g,function(r){return"_"+r.toLowerCase()})}function f(r,n,e,t){if(void 0===e&&(e="$eq"),void 0===t&&(t=null),r&&r[n]){var i=r[n];if(i.constructor!=={}.constructor)return i;switch(e){case"$ne":if(i.$ne)return i.$ne;break;case"$gte":if(i.$gte)return i.$gte;break;case"$lte":if(i.$lte)return i.$lte;break;case"$in":if(i.$in)return i.$in;break;case"$nin":if(i.$nin)return i.$nin;break;default:if(i.$eq)return i.$eq}}return t}function s(r,n,e){function t(r,e,t,i){if(void 0===i&&(i=""),t instanceof Date&&(t=t.toISOString()),"boolean"==typeof t&&(t=t.toString()),i)i=a(i),i+="__";else{var o=n.from.indexOf(r);r=o>-1?n.to[o]:a(r)}var c=e.replace("$","");return"ne"===c&&(c="neq"),"eq"===c&&(c=""),c&&(c="__"+c),""+i+r+c+"="+t}return void 0===n&&(n={from:[],to:[]}),void 0===e&&(e=[]),r?Object.keys(r).map(function(n){return r[n].constructor!=={}.constructor?t(n,"",r[n]):Object.keys(r[n]).map(function(i){return e.indexOf(n)>-1?r[n][i].constructor!=={}.constructor?t(i,"",r[n][i],n):Object.keys(r[n][i]).map(function(e){return t(i,e,r[n][i][e],n)}).join("&"):t(n,i,r[n][i])}).join("&")}).join("&"):""}function d(r,n,e){function t(r){var e=n.to.indexOf(r);return e>-1?n.from[e]:u(r)}function i(r,n,e){n||(n="eq"),"neq"===n&&(n="ne"),n="$"+n,r[n]=e}void 0===n&&(n={from:[],to:[]}),void 0===e&&(e=[]);var o={};return r=decodeURIComponent(r),r.split("&").forEach(function(r){var n=r.match(/^(.+)=(.+)$/);if(n){var c=n[2],u=n[1].split("__"),a=t(u[0]);if(o[a]||(o[a]={}),e.indexOf(a)>-1){var f=u[1];return o[a][f]||(o[a][f]={}),void i(o[a][f],u[2],c)}i(o[a],u[1],c)}}),o}function l(r){return r instanceof Array?r:[r]}function v(r,n){return null!==n&&void 0!==n&&""!==n&&(null===r||void 0===r||""===r||"*"===r||(r.endsWith("*")?n.startsWith(r.slice(0,-1)):r===n))}/*
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
Object.defineProperty(e,"__esModule",{value:!0});var p=r("./sdkError"),h=r("./tlvDecoder");e.asyncStyle=t,e.apiWrapper=i,e.decodeBase64=o,e.encodeInclude=c,e.snakeToCamel=u,e.camelToSnake=a,e.extractFilter=f,e.encodeFilter=s,e.decodeFilter=d,e.ensureArray=l,e.matchWithWildcard=v}).call(this,r("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:5}],3:[function(r,n,e){"use strict";/*
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
var t=this&&this.__extends||function(){var r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var e in n)n.hasOwnProperty(e)&&(r[e]=n[e])};return function(n,e){function t(){this.constructor=n}r(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=function(r){function n(n,e,t,i){var o=r.call(this,n)||this;return o.innerError=e,o.details=t,o.code=i,o}return t(n,r),n}(Error);e.SDKError=i},{}],4:[function(r,n,e){"use strict";function t(r){return(r&a)===a?2:1}function i(r){return(r&f)===l.ONE_BYTE?1:(r&f)===l.TWO_BYTE?2:(r&f)===l.TRE_BYTE?3:r&s}function o(r,n,e){if(void 0===n&&(n={}),void 0===e&&(e=""),!r||r.length<1)return n;var c=r[0],a=c&u,s=t(c),v=i(c),p=function(r){return String.fromCharCode(r)},h=function(r,n,e,t){return r+(n<<8*(t.length-e-1))},_=1,m=r.slice(_,_+s).reduce(h,0);_+=s;var E=v;if((c&f)!==l.OTR_BYTE&&(E=r.slice(_,_+v).reduce(h,0),_+=v),a===d.MULT_RESOURCE)o(r.slice(_,_+E),n,e+"/"+m);else{var O=r.slice(_,_+E),T=O.some(function(r){return 0===r}),y=T?O.reduce(h,0):O.map(p).join("");n[e+"/"+m]=y}return _+=E,o(r.slice(_),n,e),n}function c(r){return o(r.split("").map(function(r){return r.charCodeAt(0)}))}/*
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
Object.defineProperty(e,"__esModule",{value:!0});var u=parseInt("11000000",2),a=parseInt("00100000",2),f=parseInt("00011000",2),s=parseInt("00000111",2),d={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},l={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};e.decodeTlv=c},{}],5:[function(r,n,e){},{}]},{},[1]);
//# sourceMappingURL=functions.js.map
