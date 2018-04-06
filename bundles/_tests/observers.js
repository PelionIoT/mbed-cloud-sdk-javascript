!function(){function t(n,e,r){function i(c,o){if(!e[c]){if(!n[c]){var u="function"==typeof require&&require;if(!o&&u)return u(c,!0);if(a)return a(c,!0);var s=new Error("Cannot find module '"+c+"'");throw s.code="MODULE_NOT_FOUND",s}var f=e[c]={exports:{}};n[c][0].call(f.exports,function(t){return i(n[c][1][t]||t)},f,f.exports,t,n,e,r)}return e[c].exports}for(var a="function"==typeof require&&require,c=0;c<r.length;c++)i(r[c]);return i}return t}()({1:[function(t,n,e){"use strict";/*
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
Object.defineProperty(e,"__esModule",{value:!0});var r=intern.getInterface("tdd"),i=r.suite,a=r.test,c=intern.getPlugin("chai").assert,o=t("../connect/subscribe/observers/observer");i("testObserver",function(){a("subscribeFirst",function(){var t=new o.Observer,n=t.take(),e=t.take();t.notify("a"),t.notify("b"),t.notify("c"),c.notEqual(n,e),n.then(function(t){return c.strictEqual(t,"a")}),e.then(function(t){return c.strictEqual(t,"b")})}),a("subscribeFirstCallback",function(){var t=new o.Observer;t.take(function(t){return c.strictEqual(t,"a")}),t.take(function(t){return c.strictEqual(t,"b")}),t.notify("a"),t.notify("b"),t.notify("c")}),a("notifyFirst",function(){var t=new o.Observer;t.notify("a"),t.notify("b"),t.notify("c");var n=t.take(),e=t.take();c.notEqual(n,e),n.then(function(t){return c.strictEqual(t,"a")}),e.then(function(t){return c.strictEqual(t,"b")})}),a("notifyFirstCallback",function(){var t=new o.Observer;t.notify("a"),t.notify("b"),t.notify("c"),t.take(function(t){return c.strictEqual(t,"a")}),t.take(function(t){return c.strictEqual(t,"b")})}),a("interleaved",function(){var t=new o.Observer;t.notify("a");var n=t.take(),e=t.take(),r=t.take();t.notify("b");var i=t.take();t.notify("c"),t.notify("d"),t.notify("e");var a=t.take();n.then(function(t){return c.strictEqual(t,"a")}),e.then(function(t){return c.strictEqual(t,"b")}),r.then(function(t){return c.strictEqual(t,"c")}),i.then(function(t){return c.strictEqual(t,"d")}),a.then(function(t){return c.strictEqual(t,"e")})}),a("interleavedCallback",function(){var t=new o.Observer;t.notify("a"),t.take(function(t){return c.strictEqual(t,"a")}),t.take(function(t){return c.strictEqual(t,"b")}),t.take(function(t){return c.strictEqual(t,"c")}),t.notify("b"),t.take(function(t){return c.strictEqual(t,"d")}),t.notify("c"),t.notify("d"),t.notify("e"),t.take(function(t){return c.strictEqual(t,"e")})}),a("callback",function(){var t=new o.Observer,n=1;t.addCallback(function(t){return n+=t}),t.addCallback(function(t){return n+=2*t}),t.notify(3),c.strictEqual(n,10)}),a("addRemoveCallbacks",function(){var t=new o.Observer,n=function(){},e=function(){};t.addCallback(n),t.addCallback(e),c.sameOrderedMembers(t.callbacks,[n,e]),t.removeCallback(n),c.sameOrderedMembers(t.callbacks,[e]),t.removeCallback(e),c.sameOrderedMembers(t.callbacks,[])}),a("collection",function(){for(var t=new o.Observer,n=0;n<10;n++)t.notify(n);var e=[];t.notificationQueue.forEach(function(t){return e.push(t)}),c.sameOrderedMembers(e,Array.apply(null,{length:10}).map(Function.call,Number))})})},{"../connect/subscribe/observers/observer":2}],2:[function(t,n,e){"use strict";/*
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
Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.notificationQueue=new Array,this.callbacks=new Array,this._waiting=new Array}return t.prototype.notify=function(t){this._notifyCallbacks(t),this._waiting.length>0?this._waiting.shift()(t):this.notificationQueue.push(t)},t.prototype.take=function(t){var n=this;if(this.notificationQueue.length>0){var e=this.notificationQueue.shift();if(!t)return new Promise(function(t,n){t(e)});t(e)}else{if(!t){return new Promise(function(t,e){var r=function(n){t(n)};n._waiting.push(r)})}this._waiting.push(t)}},t.prototype.addCallback=function(t){this.callbacks.push(t)},t.prototype.removeCallback=function(t){var n=this.callbacks.indexOf(t,0);n>-1&&this.callbacks.splice(n,1)},t.prototype.clearCallbacks=function(){this.callbacks=new Array},t.prototype._notifyCallbacks=function(t){this.callbacks.forEach(function(n){return n(t)})},t}();e.Observer=r},{}]},{},[1]);
//# sourceMappingURL=observers.js.map
