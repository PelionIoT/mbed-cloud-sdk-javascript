!function e(r,n,t){function A(u,i){if(!n[u]){if(!r[u]){var c="function"==typeof require&&require;if(!i&&c)return c(u,!0);if(o)return o(u,!0);var d=new Error("Cannot find module '"+u+"'");throw d.code="MODULE_NOT_FOUND",d}var a=n[u]={exports:{}};r[u][0].call(a.exports,function(e){var n=r[u][1][e];return A(n||e)},a,a.exports,e,r,n,t)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<t.length;u++)A(t[u]);return A}({1:[function(e,r,n){(function(r){"use strict";/*
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
Object.defineProperty(n,"__esModule",{value:!0});var t=intern.getInterface("tdd"),A=t.suite,o=t.test,u=intern.getPlugin("chai").assert,i=e("../common/tlvDecoder");A("decodeTlv",function(){function e(e){return"function"==typeof atob?atob(e):new r(e,"base64").toString("binary")}o("should decode nothing",function(){var e=i.decodeTlv("");u.deepEqual(e,{})}),o("should decode simple",function(){var r=e("AAA="),n=i.decodeTlv(r);u.deepEqual(n,{"/0":""})}),o("should decode complex",function(){var r=e("iAsLSAAIAAAAAAAAAADBEFXIABAAAAAAAAAAAAAAAAAAAAAAyAEQAAAAAAAAAAAAAAAAAAAAAMECMMgRD2Rldl9kZXZpY2VfdHlwZcgSFGRldl9oYXJkd2FyZV92ZXJzaW9uyBUIAAAAAAAAAADIDQgAAAAAWdH0Bw=="),n=i.decodeTlv(r);u.deepEqual(n,{"/0":0,"/1":0,"/11/0":0,"/13":1506931719,"/16":"U","/17":"dev_device_type","/18":"dev_hardware_version","/2":"0","/21":0})})})}).call(this,e("buffer").Buffer)},{"../common/tlvDecoder":2,buffer:3}],2:[function(e,r,n){"use strict";function t(e){return(e&c)===c?2:1}function A(e){return(e&d)===s.ONE_BYTE?1:(e&d)===s.TWO_BYTE?2:(e&d)===s.TRE_BYTE?3:e&a}function o(e,r,n){if(void 0===r&&(r={}),void 0===n&&(n=""),!e||e.length<1)return r;var u=e[0],c=u&i,a=t(u),l=A(u),p=function(e){return String.fromCharCode(e)},E=function(e,r,n,t){return e+(r<<8*(t.length-n-1))},v=1,T=e.slice(v,v+a).reduce(E,0);v+=a;var _=l;if((u&d)!==s.OTR_BYTE&&(_=e.slice(v,v+l).reduce(E,0),v+=l),c===f.MULT_RESOURCE)o(e.slice(v,v+_),r,n+"/"+T);else{var I=e.slice(v,v+_),O=I.some(function(e){return 0===e}),R=O?I.reduce(E,0):I.map(p).join("");r[n+"/"+T]=R}return v+=_,o(e.slice(v),r,n),r}function u(e){return o(e.split("").map(function(e){return e.charCodeAt(0)}))}/*
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
Object.defineProperty(n,"__esModule",{value:!0});var i=parseInt("11000000",2),c=parseInt("00100000",2),d=parseInt("00011000",2),a=parseInt("00000111",2),f={OBJECT_INSTAN:parseInt("00000000",2),RESOURCE_INST:parseInt("01000000",2),MULT_RESOURCE:parseInt("10000000",2),RESOURCE_VALU:parseInt("11000000",2)},s={ONE_BYTE:parseInt("00001000",2),TWO_BYTE:parseInt("00010000",2),TRE_BYTE:parseInt("00011000",2),OTR_BYTE:parseInt("00000000",2)};n.decodeTlv=u},{}],3:[function(e,r,n){},{}]},{},[1]);
//# sourceMappingURL=tlvDecode.js.map
