!function e(n,r,t){function a(i,c){if(!r[i]){if(!n[i]){var u="function"==typeof require&&require;if(!c&&u)return u(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var s=r[i]={exports:{}};n[i][0].call(s.exports,function(e){var r=n[i][1][e];return a(r||e)},s,s.exports,e,n,r,t)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<t.length;i++)a(t[i]);return a}({1:[function(e,n,r){"use strict";/*
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
Object.defineProperty(r,"__esModule",{value:!0});var t=intern.getInterface("tdd"),a=t.suite,o=t.test,i=intern.getPlugin("chai").assert,c=e("../common/functions");a("snakeToCamel",function(){o("should be camel",function(){var e=c.snakeToCamel("im_really_a_camel");i.strictEqual(e,"imReallyACamel")}),o("begins with _",function(){var e=c.snakeToCamel("_im_really_a_camel");i.strictEqual(e,"ImReallyACamel")}),o("ends with _",function(){var e=c.snakeToCamel("im_really_a_camel_");i.strictEqual(e,"imReallyACamel_")}),o("creates capital at end",function(){var e=c.snakeToCamel("im_really_a_came_l");i.strictEqual(e,"imReallyACameL")}),o("preserves capitals",function(){var e=c.snakeToCamel("iM_reAlly_a_caMel");i.strictEqual(e,"iMReAllyACaMel")})}),a("camelToSnake",function(){o("should be snake",function(){var e=c.camelToSnake("imReallyASnake");i.strictEqual(e,"im_really_a_snake")}),o("begins with capital",function(){var e=c.camelToSnake("ImReallyASnake");i.strictEqual(e,"_im_really_a_snake")}),o("ends with capital",function(){var e=c.camelToSnake("imReallyASnakE");i.strictEqual(e,"im_really_a_snak_e")}),o("creates _ at beginning",function(){var e=c.camelToSnake("ImReallyASnake");i.strictEqual(e,"_im_really_a_snake")}),o("preserves _",function(){var e=c.camelToSnake("imRe_allyA_Snake");i.strictEqual(e,"im_re_ally_a__snake")})})},{"../common/functions":2}],2:[function(e,n,r){(function(n){"use strict";function t(e,n){if(!n)return new Promise(function(n,r){try{e(function(e,t){e?r(e):n(t)})}catch(e){r(new _.SDKError(e.message,e))}});try{e(n)}catch(e){n(new _.SDKError(e.message,e))}}function a(e,n,r){return t(function(r){try{e(function(e,t){if(e)return r(e);if(!n)return r(null,t);try{n(t,r)}catch(e){r(new _.SDKError(e.message,e))}})}catch(e){r(new _.SDKError(e.message,e))}},r)}function o(e,r){var t="";if(t="function"==typeof atob?atob(e):new n(e,"base64").toString("binary"),r&&r.indexOf("tlv")>-1)try{return m.decodeTlv(t)}catch(e){}return t}function i(e){return e&&e.length?e.map(u).join(","):null}function c(e){return e.replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function u(e){return e.replace(/([A-Z]+?)/g,function(e){return"_"+e.toLowerCase()})}function l(e,n,r){if(void 0===r&&(r=null),e&&e[n]){var t=e[n];if(t.constructor!=={}.constructor)return t;if(t.$eq)return t.$eq}return r}function s(e,n,r){function t(e,r,t,a){if(void 0===a&&(a=""),t instanceof Date&&(t=t.toISOString()),"boolean"==typeof t&&(t=t.toString()),a)a=u(a),a+="__";else{var o=n.from.indexOf(e);e=o>-1?n.to[o]:u(e)}var i=r.replace("$","");return"ne"===i&&(i="neq"),"eq"===i&&(i=""),i&&(i="__"+i),""+a+e+i+"="+t}return void 0===n&&(n={from:[],to:[]}),void 0===r&&(r=[]),e?Object.keys(e).map(function(n){return e[n].constructor!=={}.constructor?t(n,"",e[n]):Object.keys(e[n]).map(function(a){return r.indexOf(n)>-1?e[n][a].constructor!=={}.constructor?t(a,"",e[n][a],n):Object.keys(e[n][a]).map(function(r){return t(a,r,e[n][a][r],n)}).join("&"):t(n,a,e[n][a])}).join("&")}).join("&"):""}function f(e,n,r){function t(e){var r=n.to.indexOf(e);return r>-1?n.from[r]:c(e)}function a(e,n,r){n||(n="eq"),"neq"===n&&(n="ne"),n="$"+n,e[n]=r}void 0===n&&(n={from:[],to:[]}),void 0===r&&(r=[]);var o={};return e=decodeURIComponent(e),e.split("&").forEach(function(e){var n=e.match(/^(.+)=(.+)$/);if(n){var i=n[2],c=n[1].split("__"),u=t(c[0]);if(o[u]||(o[u]={}),r.indexOf(u)>-1){var l=c[1];return o[u][l]||(o[u][l]={}),void a(o[u][l],c[2],i)}a(o[u],c[1],i)}}),o}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var _=e("./sdkError"),m=e("./tlvDecoder");r.asyncStyle=t,r.apiWrapper=a,r.decodeBase64=o,r.encodeInclude=i,r.snakeToCamel=c,r.camelToSnake=u,r.extractFilter=l,r.encodeFilter=s,r.decodeFilter=f}).call(this,e("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:5}],3:[function(e,n,r){"use strict";/*
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
var t=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])};return function(n,r){function t(){this.constructor=n}e(n,r),n.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}}();Object.defineProperty(r,"__esModule",{value:!0});var a=function(e){function n(n,r,t,a){var o=e.call(this,n)||this;return o.innerError=r,o.details=t,o.code=a,o}return t(n,e),n}(Error);r.SDKError=a},{}],4:[function(e,n,r){"use strict";function t(e){return(e&u)===u?2:1}function a(e){return(e&l)===_.ONE_BYTE?1:(e&l)===_.TWO_BYTE?2:(e&l)===_.TRE_BYTE?3:e&s}function o(e,n,r){if(void 0===n&&(n={}),void 0===r&&(r=""),!e||e.length<1)return n;var i=e[0],u=i&c,s=t(i),m=a(i),p=function(e){return String.fromCharCode(e)},d=function(e,n,r,t){return e+(n<<8*(t.length-r-1))},v=1,y=e.slice(v,v+s).reduce(d,0);v+=s;var E=m;if((i&l)!==_.OTR_BYTE&&(E=e.slice(v,v+m).reduce(d,0),v+=m),u===f.MULT_RESOURCE)o(e.slice(v,v+E),n,r+"/"+y);else{var T=e.slice(v,v+E),O=T.some(function(e){return 0===e}),k=O?T.reduce(d,0):T.map(p).join("");n[r+"/"+y]=k}return v+=E,o(e.slice(v),n,r),n}function i(e){return o(e.split("").map(function(e){return e.charCodeAt(0)}))}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var c=parseInt("11000000",2),u=parseInt("00100000",2),l=parseInt("00011000",2),s=parseInt("00000111",2),f={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},_={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};r.decodeTlv=i},{}],5:[function(e,n,r){},{}]},{},[1]);
//# sourceMappingURL=caseFunctions.js.map
