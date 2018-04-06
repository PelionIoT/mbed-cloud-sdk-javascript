!function(){function e(t,r,n){function o(c,i){if(!r[c]){if(!t[c]){var a="function"==typeof require&&require;if(!i&&a)return a(c,!0);if(u)return u(c,!0);var l=new Error("Cannot find module '"+c+"'");throw l.code="MODULE_NOT_FOUND",l}var f=r[c]={exports:{}};t[c][0].call(f.exports,function(e){return o(t[c][1][e]||e)},f,f.exports,e,t,r,n)}return r[c].exports}for(var u="function"==typeof require&&require,c=0;c<n.length;c++)o(n[c]);return o}return e}()({1:[function(e,t,r){"use strict";/*
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
Object.defineProperty(r,"__esModule",{value:!0});var n=intern.getInterface("tdd"),o=n.suite,u=n.test,c=intern.getPlugin("chai").assert,i=e("../common/functions");o("extractFilter",function(){u("should return default",function(){var e=i.extractFilter(null,null,"dee folt");c.strictEqual(e,"dee folt")}),u("should extract from eq",function(){var e={filter:{$eq:"coffee"}},t=i.extractFilter(e,"filter");c.strictEqual(t,"coffee")}),u("should extract without eq",function(){var e={filter:"coffee"},t=i.extractFilter(e,"filter");c.strictEqual(t,"coffee")})}),o("encodeFilter",function(){u("should return empty",function(){var e=i.encodeFilter(null);c.strictEqual(e,"")}),u("should still return empty",function(){var e=i.encodeFilter({});c.strictEqual(e,"")}),u("should encode filter",function(){var e=i.encodeFilter({key:{$eq:"value"},error:{$ne:"found"},range:{$lte:10,$gte:2}});c.strictEqual(e,"key=value&error__neq=found&range__lte=10&range__gte=2")}),u("should encode camel filter",function(){var e=i.encodeFilter({key:{$eq:"value"},error:{$ne:"found"},theRange:{$lte:10,$gte:2}});c.strictEqual(e,"key=value&error__neq=found&the_range__lte=10&the_range__gte=2")}),u("should encode bare filter",function(){var e=i.encodeFilter({key:"value",error:{$ne:"found"},range:{$lte:10,$gte:2}});c.strictEqual(e,"key=value&error__neq=found&range__lte=10&range__gte=2")}),u("should encode filter with map",function(){var e=i.encodeFilter({key:{$eq:"value"},error:{$ne:"found"},range:{$lte:10,$gte:2}},{from:["key"],to:["switch"]});c.strictEqual(e,"switch=value&error__neq=found&range__lte=10&range__gte=2")}),u("should encode filter with nest",function(){var e=i.encodeFilter({key:{$eq:"value"},error:{$ne:"found"},range:{$lte:10,$gte:2},custom:{custom_1:{$eq:"custom_value_1"},custom_2:{$ne:"custom_value_2"}}},{from:["key"],to:["switch"]},["custom"]);c.strictEqual(e,"switch=value&error__neq=found&range__lte=10&range__gte=2&custom__custom_1=custom_value_1&custom__custom_2__neq=custom_value_2")})}),o("decodeFilter",function(){u("should return object",function(){var e=i.decodeFilter(null);c.deepEqual(e,{})}),u("should decode string",function(){var e=i.decodeFilter("key=value&error__neq=found&range__lte=10&range__gte=2");c.deepEqual(e,{key:{$eq:"value"},error:{$ne:"found"},range:{$lte:"10",$gte:"2"}})}),u("should decode snake string",function(){var e=i.decodeFilter("key=value&error__neq=found&the_range__lte=10&the_range__gte=2");c.deepEqual(e,{key:{$eq:"value"},error:{$ne:"found"},theRange:{$lte:"10",$gte:"2"}})}),u("should decode with map",function(){var e=i.decodeFilter("switch=value&error__neq=found&range__lte=10&range__gte=2",{from:["key"],to:["switch"]});c.deepEqual(e,{key:{$eq:"value"},error:{$ne:"found"},range:{$lte:"10",$gte:"2"}})}),u("should decode with nest",function(){var e=i.decodeFilter("switch=value&error__neq=found&range__lte=10&range__gte=2&custom__custom_1=custom_value_1&custom__custom_2__neq=custom_value_2",{from:["key"],to:["switch"]},["custom"]);c.deepEqual(e,{key:{$eq:"value"},error:{$ne:"found"},range:{$lte:"10",$gte:"2"},custom:{custom_1:{$eq:"custom_value_1"},custom_2:{$ne:"custom_value_2"}}})})})},{"../common/functions":2}],2:[function(e,t,r){(function(t){"use strict";function n(e,t){if(!t)return new Promise(function(t,r){try{e(function(e,n){e?r(e):t(n)})}catch(e){r(new d.SDKError(e.message,e))}});try{e(t)}catch(e){t(new d.SDKError(e.message,e))}}function o(e,t,r,o){return void 0===o&&(o=!1),n(function(r){try{e(function(e,n){if(e)return o||404!==e.code?r(e):r(null,null);if(!t)return r(null,n);try{t(n,r)}catch(e){r(new d.SDKError(e.message,e))}})}catch(e){r(new d.SDKError(e.message,e))}},r)}function u(e,r){var n="";if(n="function"==typeof atob?atob(e):new t(e,"base64").toString("binary"),r&&r.indexOf("tlv")>-1)try{return v.decodeTlv(n)}catch(e){}return n}function c(e){return e&&e.length?e.map(a).join(","):null}function i(e){return e.replace(/(\_\w)/g,function(e){return e[1].toUpperCase()})}function a(e){return e.replace(/([A-Z]+?)/g,function(e){return"_"+e.toLowerCase()})}function l(e,t,r){if(void 0===r&&(r=null),e&&e[t]){var n=e[t];if(n.constructor!=={}.constructor)return n;if(n.$eq)return n.$eq}return r}function f(e,t,r){function n(e,r,n,o){if(void 0===o&&(o=""),n instanceof Date&&(n=n.toISOString()),"boolean"==typeof n&&(n=n.toString()),o)o=a(o),o+="__";else{var u=t.from.indexOf(e);e=u>-1?t.to[u]:a(e)}var c=r.replace("$","");return"ne"===c&&(c="neq"),"eq"===c&&(c=""),c&&(c="__"+c),""+o+e+c+"="+n}return void 0===t&&(t={from:[],to:[]}),void 0===r&&(r=[]),e?Object.keys(e).map(function(t){return e[t].constructor!=={}.constructor?n(t,"",e[t]):Object.keys(e[t]).map(function(o){return r.indexOf(t)>-1?e[t][o].constructor!=={}.constructor?n(o,"",e[t][o],t):Object.keys(e[t][o]).map(function(r){return n(o,r,e[t][o][r],t)}).join("&"):n(t,o,e[t][o])}).join("&")}).join("&"):""}function s(e,t,r){function n(e){var r=t.to.indexOf(e);return r>-1?t.from[r]:i(e)}function o(e,t,r){t||(t="eq"),"neq"===t&&(t="ne"),t="$"+t,e[t]=r}void 0===t&&(t={from:[],to:[]}),void 0===r&&(r=[]);var u={};return e=decodeURIComponent(e),e.split("&").forEach(function(e){var t=e.match(/^(.+)=(.+)$/);if(t){var c=t[2],i=t[1].split("__"),a=n(i[0]);if(u[a]||(u[a]={}),r.indexOf(a)>-1){var l=i[1];return u[a][l]||(u[a][l]={}),void o(u[a][l],i[2],c)}o(u[a],i[1],c)}}),u}function _(e){return e instanceof Array?e:[e]}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var d=e("./sdkError"),v=e("./tlvDecoder");r.asyncStyle=n,r.apiWrapper=o,r.decodeBase64=u,r.encodeInclude=c,r.snakeToCamel=i,r.camelToSnake=a,r.extractFilter=l,r.encodeFilter=f,r.decodeFilter=s,r.ensureArray=_}).call(this,e("buffer").Buffer)},{"./sdkError":3,"./tlvDecoder":4,buffer:5}],3:[function(e,t,r){"use strict";/*
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
var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(r,"__esModule",{value:!0});var o=function(e){function t(t,r,n,o){var u=e.call(this,t)||this;return u.innerError=r,u.details=n,u.code=o,u}return n(t,e),t}(Error);r.SDKError=o},{}],4:[function(e,t,r){"use strict";function n(e){return(e&a)===a?2:1}function o(e){return(e&l)===_.ONE_BYTE?1:(e&l)===_.TWO_BYTE?2:(e&l)===_.TRE_BYTE?3:e&f}function u(e,t,r){if(void 0===t&&(t={}),void 0===r&&(r=""),!e||e.length<1)return t;var c=e[0],a=c&i,f=n(c),d=o(c),v=function(e){return String.fromCharCode(e)},g=function(e,t,r,n){return e+(t<<8*(n.length-r-1))},p=1,m=e.slice(p,p+f).reduce(g,0);p+=f;var h=d;if((c&l)!==_.OTR_BYTE&&(h=e.slice(p,p+d).reduce(g,0),p+=d),a===s.MULT_RESOURCE)u(e.slice(p,p+h),t,r+"/"+m);else{var q=e.slice(p,p+h),E=q.some(function(e){return 0===e}),y=E?q.reduce(g,0):q.map(v).join("");t[r+"/"+m]=y}return p+=h,u(e.slice(p),t,r),t}function c(e){return u(e.split("").map(function(e){return e.charCodeAt(0)}))}/*
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
Object.defineProperty(r,"__esModule",{value:!0});var i=parseInt("11000000",2),a=parseInt("00100000",2),l=parseInt("00011000",2),f=parseInt("00000111",2),s={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},_={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};r.decodeTlv=c},{}],5:[function(e,t,r){},{}]},{},[1]);
//# sourceMappingURL=filterFunctions.js.map
