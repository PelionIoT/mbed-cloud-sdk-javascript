!function e(t,r,n){function l(c,o){if(!r[c]){if(!t[c]){var i="function"==typeof require&&require;if(!o&&i)return i(c,!0);if(u)return u(c,!0);var s=new Error("Cannot find module '"+c+"'");throw s.code="MODULE_NOT_FOUND",s}var a=r[c]={exports:{}};t[c][0].call(a.exports,function(e){var r=t[c][1][e];return l(r||e)},a,a.exports,e,t,r,n)}return r[c].exports}for(var u="function"==typeof require&&require,c=0;c<n.length;c++)l(n[c]);return l}({1:[function(e,t,r){"use strict";/*
 * Mbed Cloud JavaScript SDK
 * Copyright Arm Limited 2018
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
Object.defineProperty(r,"__esModule",{value:!0});var n=e("../common/pagination"),l=intern.getInterface("tdd"),u=l.suite,c=l.test,o=intern.getPlugin("chai").assert,i=function(){return new Promise(function(e){setTimeout(e,1)})},s=function(){var e=[];return{calls:e,mock:function(){var t={resolve:null,reject:null,promise:null};return t.promise=new Promise(function(e,r){t.resolve=function(t){return e(t),i()},t.reject=function(){return r(),i()}}),e.push(t),t.promise}}},a=function(e){var t={resolved:!1,rejected:!1};return e.then(function(){t.resolved=!0},function(){t.rejected=!0}),t};u("executeForAll",function(){c("never runs execute if there are no items",function(){var e=s(),t=e.calls,r=e.mock,l=s(),u=l.calls,c=l.mock,i=a(n.executeForAll(c,r));return o.strictEqual(u.length,1),u[0].resolve({data:[],hasMore:!1}).then(function(){o.strictEqual(t.length,0),o.strictEqual(i.resolved,!0),o.strictEqual(i.rejected,!1)})}),c("runs execute once per item if there is only one page",function(){var e=s(),t=e.calls,r=e.mock,l=s(),u=l.calls,c=l.mock,i=a(n.executeForAll(c,r));return o.strictEqual(u.length,1),u[0].resolve({data:[{id:"1"},{id:"2"}],hasMore:!1}).then(function(){return o.strictEqual(t.length,2),Promise.all(t.map(function(e){return(0,e.resolve)(null)})).then(function(){o.strictEqual(i.resolved,!0),o.strictEqual(i.rejected,!1)})})}),c("runs execute once per item if there are two pages",function(){var e=s(),t=e.calls,r=e.mock,l=s(),u=l.calls,c=l.mock,i=a(n.executeForAll(c,r));return o.strictEqual(u.length,1),u[0].resolve({data:[{id:"1"},{id:"2"}],hasMore:!0}).then(function(){return o.strictEqual(t.length,2),Promise.all(t.map(function(e){return(0,e.resolve)(null)})).then(function(){return u[1].resolve({data:[{id:"3"},{id:"4"}],hasMore:!1}).then(function(){return o.strictEqual(t.length,4),Promise.all([t[2].resolve(null),t[3].resolve(null)]).then(function(){o.strictEqual(i.resolved,!0),o.strictEqual(i.rejected,!1)})})})})}),c("rejects the promise if the first getPage fails",function(){var e=s(),t=e.calls,r=e.mock,l=s(),u=l.calls,c=l.mock,i=a(n.executeForAll(c,r));return o.strictEqual(u.length,1),u[0].reject().then(function(){o.strictEqual(t.length,0),o.strictEqual(i.resolved,!1),o.strictEqual(i.rejected,!0)})}),c("rejects the promise if an execute call fails",function(){var e=s(),t=e.calls,r=e.mock,l=s(),u=l.calls,c=l.mock,i=a(n.executeForAll(c,r));return o.strictEqual(u.length,1),u[0].resolve({data:[{id:"1"},{id:"2"}],hasMore:!0}).then(function(){return o.strictEqual(t.length,2),Promise.all([t[0].resolve(null),t[1].reject()]).then(function(){o.strictEqual(i.resolved,!1),o.strictEqual(i.rejected,!0)})})}),c("rejects the promise if the second getPage fails",function(){var e=s(),t=e.calls,r=e.mock,l=s(),u=l.calls,c=l.mock,i=a(n.executeForAll(c,r));return o.strictEqual(u.length,1),u[0].resolve({data:[{id:"1"},{id:"2"}],hasMore:!0}).then(function(){return o.strictEqual(t.length,2),Promise.all([t[0].resolve(null),t[1].resolve(null)]).then(function(){return o.strictEqual(u.length,2),u[1].reject().then(function(){o.strictEqual(t.length,2),o.strictEqual(i.resolved,!1),o.strictEqual(i.rejected,!0)})})})})})},{"../common/pagination":2}],2:[function(e,t,r){"use strict";/*
 * Mbed Cloud JavaScript SDK
 * Copyright Arm Limited 2018
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
Object.defineProperty(r,"__esModule",{value:!0}),r.executeForAll=function(e,t){var r=function(n){return e({after:n}).then(function(e){var n=e.data,l=e.hasMore,u=n.map(function(e){var r=e.id;return t(r)});return Promise.all(u).then(function(){return l?r(n[n.length-1].id):null})})};return r()}},{}]},{},[1]);
//# sourceMappingURL=pagination.js.map
