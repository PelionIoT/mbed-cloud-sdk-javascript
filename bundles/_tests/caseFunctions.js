!function(){function e(n,r,t){function a(o,c){if(!r[o]){if(!n[o]){var u="function"==typeof require&&require;if(!c&&u)return u(o,!0);if(i)return i(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var s=r[o]={exports:{}};n[o][0].call(s.exports,function(e){return a(n[o][1][e]||e)},s,s.exports,e,n,r,t)}return r[o].exports}for(var i="function"==typeof require&&require,o=0;o<t.length;o++)a(t[o]);return a}return e}()({1:[function(e,n,r){"use strict";/*
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
Object.defineProperty(r,"__esModule",{value:!0});var t=intern.getInterface("tdd"),a=t.suite,i=t.test,o=intern.getPlugin("chai").assert,c=e("../common/functions");a("snakeToCamel",function(){i("should be camel",function(){var e=c.snakeToCamel("im_really_a_camel");o.strictEqual(e,"imReallyACamel")}),i("begins with _",function(){var e=c.snakeToCamel("_im_really_a_camel");o.strictEqual(e,"ImReallyACamel")}),i("ends with _",function(){var e=c.snakeToCamel("im_really_a_camel_");o.strictEqual(e,"imReallyACamel_")}),i("creates capital at end",function(){var e=c.snakeToCamel("im_really_a_came_l");o.strictEqual(e,"imReallyACameL")}),i("preserves capitals",function(){var e=c.snakeToCamel("iM_reAlly_a_caMel");o.strictEqual(e,"iMReAllyACaMel")})}),a("camelToSnake",function(){i("should be snake",function(){var e=c.camelToSnake("imReallyASnake");o.strictEqual(e,"im_really_a_snake")}),i("begins with capital",function(){var e=c.camelToSnake("ImReallyASnake");o.strictEqual(e,"_im_really_a_snake")}),i("ends with capital",function(){var e=c.camelToSnake("imReallyASnakE");o.strictEqual(e,"im_really_a_snak_e")}),i("creates _ at beginning",function(){var e=c.camelToSnake("ImReallyASnake");o.strictEqual(e,"_im_really_a_snake")}),i("preserves _",function(){var e=c.camelToSnake("imRe_allyA_Snake");o.strictEqual(e,"im_re_ally_a__snake")})})},{"../common/functions":2}],2:[function(e,n,r){(function(n){"use strict";function t(e,n){if(!n)return new Promise(function(n,r){try{e(function(e,t){e?r(e):n(t)})}catch(e){r(new p.SDKError(e.message,e))}});try{e(n)}catch(e){n(new p.SDKError(e.message,e))}}function a(e,n,r,a){return void 0===a&&(a=!1),t(function(r){try{e(function(e,t){if(e)return a||404!==e.code?r(e):r(null,null);if(!n)return r(null,t);try{n(t,r)}catch(e){r(new p.SDKError(e.message,e))}})}catch(e){r(new p.SDKError(e.message,e))}},r)}function i(e,r){var t="";if(t="function"==typeof atob?atob(e):new n(e,"base64").toString("binary"),r&&r.indexOf("tlv")>-1)try{return v.decodeTlv(t)}catch(e){}return isNaN(t)?t:Number(t)}function o(e){return e&&e.length?e.map(u).join(","):null}function c(e){return e.replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function u(e){return e.replace(/([A-Z]+?)/g,function(e){return"_"+e.toLowerCase()})}function l(e,n,r,t){if(void 0===r&&(r="$eq"),void 0===t&&(t=null),e&&e[n]){var a=e[n];if(a.constructor!=={}.constructor)return a;switch(r){case"$ne":if(a.$ne)return a.$ne;break;case"$gte":if(a.$gte)return a.$gte;break;case"$lte":if(a.$lte)return a.$lte;break;case"$in":if(a.$in)return a.$in;break;case"$nin":if(a.$nin)return a.$nin;break;default:if(a.$eq)return a.$eq}}return t}function s(e,n,r){function t(e,r,t,a){if(void 0===a&&(a=""),t instanceof Date&&(t=t.toISOString()),"boolean"==typeof t&&(t=t.toString()),a)a=u(a),a+="__";else{var i=n.from.indexOf(e);e=i>-1?n.to[i]:u(e)}var o=r.replace("$","");return"ne"===o&&(o="neq"),"eq"===o&&(o=""),o&&(o="__"+o),""+a+e+o+"="+t}return void 0===n&&(n={from:[],to:[]}),void 0===r&&(r=[]),e?Object.keys(e).map(function(n){return e[n].constructor!=={}.constructor?t(n,"",e[n]):Object.keys(e[n]).map(function(a){return r.indexOf(n)>-1?e[n][a].constructor!=={}.constructor?t(a,"",e[n][a],n):Object.keys(e[n][a]).map(function(r){return t(a,r,e[n][a][r],n)}).join("&"):t(n,a,e[n][a])}).join("&")}).join("&"):""}function f(e,n,r){function t(e){var r=n.to.indexOf(e);return r>-1?n.from[r]:c(e)}function a(e,n,r){n||(n="eq"),"neq"===n&&(n="ne"),n="$"+n,e[n]=r}void 0===n&&(n={from:[],to:[]}),void 0===r&&(r=[]);var i={};return e=decodeURIComponent(e),e.split("&").forEach(function(e){var n=e.match(/^(.+)=(.+)$/);if(n){var o=n[2],c=n[1].split("__"),u=t(c[0]);if(i[u]||(i[u]={}),r.indexOf(u)>-1){var l=c[1];return i[u][l]||(i[u][l]={}),void a(i[u][l],c[2],o)}a(i[u],c[1],o)}}),i}function _(e){return e instanceof Array?e:[e]}function d(e,n){return null!==n&&void 0!==n&&""!==n&&(null===e||void 0===e||""===e||"*"===e||(e.endsWith("*")?n.startsWith(e.slice(0,-1)):e===n))}function m(e){return e=new Date(e),e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var p=e("./sdkError"),v=e("./tlvDecoder");r.asyncStyle=t,r.apiWrapper=a,r.decodeBase64=i,r.encodeInclude=o,r.snakeToCamel=c,r.camelToSnake=u,r.extractFilter=l,r.encodeFilter=s,r.decodeFilter=f,r.ensureArray=_,r.matchWithWildcard=d,r.dateToBillingMonth=m}).call(this,e("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:5}],3:[function(e,n,r){"use strict";/*
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
var t=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])};return function(n,r){function t(){this.constructor=n}e(n,r),n.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}}();Object.defineProperty(r,"__esModule",{value:!0});var a=function(e){function n(n,r,t,a){var i=e.call(this,n)||this;return i.innerError=r,i.details=t,i.code=a,i}return t(n,e),n}(Error);r.SDKError=a},{}],4:[function(e,n,r){"use strict";function t(e){return(e&u)===u?2:1}function a(e){return(e&l)===_.ONE_BYTE?1:(e&l)===_.TWO_BYTE?2:(e&l)===_.TRE_BYTE?3:e&s}function i(e,n,r){if(void 0===n&&(n={}),void 0===r&&(r=""),!e||e.length<1)return n;var o=e[0],u=o&c,s=t(o),d=a(o),m=function(e){return String.fromCharCode(e)},p=function(e,n,r,t){return e+(n<<8*(t.length-r-1))},v=1,y=e.slice(v,v+s).reduce(p,0);v+=s;var E=d;if((o&l)!==_.OTR_BYTE&&(E=e.slice(v,v+d).reduce(p,0),v+=d),u===f.MULT_RESOURCE)i(e.slice(v,v+E),n,r+"/"+y);else{var T=e.slice(v,v+E),h=T.some(function(e){return 0===e}),k=h?T.reduce(p,0):T.map(m).join("");n[r+"/"+y]=k}return v+=E,i(e.slice(v),n,r),n}function o(e){return i(e.split("").map(function(e){return e.charCodeAt(0)}))}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var c=parseInt("11000000",2),u=parseInt("00100000",2),l=parseInt("00011000",2),s=parseInt("00000111",2),f={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},_={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};r.decodeTlv=o},{}],5:[function(e,n,r){},{}]},{},[1]);
//# sourceMappingURL=caseFunctions.js.map
