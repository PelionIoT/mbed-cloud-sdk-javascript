!function(){function t(n,e,r){function i(u,c){if(!e[u]){if(!n[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(o)return o(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var f=e[u]={exports:{}};n[u][0].call(f.exports,function(t){return i(n[u][1][t]||t)},f,f.exports,t,n,e,r)}return e[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}return t}()({1:[function(t,n,e){"use strict";/*
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
Object.defineProperty(e,"__esModule",{value:!0});var r=intern.getInterface("tdd"),i=r.suite,o=r.test,u=intern.getPlugin("chai").assert,c=t("../subscribe/observers/observer");i("testObserver",function(){o("subscribeFirst",function(){var t=new c.Observer,n=t.once(),e=t.once();t.notify("a"),t.notify("b"),t.notify("c"),u.notEqual(n,e),n.then(function(t){return u.strictEqual(t,"a")}),e.then(function(t){return u.strictEqual(t,"b")})}),o("subscribeFirstCallback",function(){var t=new c.Observer;t.once(function(t){return u.strictEqual(t,"a")}),t.once(function(t){return u.strictEqual(t,"b")}),t.notify("a"),t.notify("b"),t.notify("c")}),o("notifyFirst",function(){var t=new c.Observer;t.notify("a"),t.notify("b"),t.notify("c");var n=t.once(),e=t.once();u.notEqual(n,e),n.then(function(t){return u.strictEqual(t,"a")}),e.then(function(t){return u.strictEqual(t,"b")})}),o("notifyFirstCallback",function(){var t=new c.Observer;t.notify("a"),t.notify("b"),t.notify("c"),t.once(function(t){return u.strictEqual(t,"a")}),t.once(function(t){return u.strictEqual(t,"b")})}),o("interleaved",function(){var t=new c.Observer;t.notify("a");var n=t.once(),e=t.once(),r=t.once();t.notify("b");var i=t.once();t.notify("c"),t.notify("d"),t.notify("e");var o=t.once();n.then(function(t){return u.strictEqual(t,"a")}),e.then(function(t){return u.strictEqual(t,"b")}),r.then(function(t){return u.strictEqual(t,"c")}),i.then(function(t){return u.strictEqual(t,"d")}),o.then(function(t){return u.strictEqual(t,"e")})}),o("interleavedCallback",function(){var t=new c.Observer;t.notify("a"),t.once(function(t){return u.strictEqual(t,"a")}),t.once(function(t){return u.strictEqual(t,"b")}),t.once(function(t){return u.strictEqual(t,"c")}),t.notify("b"),t.once(function(t){return u.strictEqual(t,"d")}),t.notify("c"),t.notify("d"),t.notify("e"),t.once(function(t){return u.strictEqual(t,"e")})}),o("callback",function(){var t=new c.Observer,n=1;t.addListener(function(t){return n+=t}),t.addListener(function(t){return n+=2*t}),t.notify(3),u.strictEqual(n,10)}),o("addRemoveCallbacks",function(){var t=new c.Observer,n=function(){},e=function(){};t.addListener(n),t.addListener(e),u.sameOrderedMembers(t.listeners(),[n,e]),t.removeListener(n),u.sameOrderedMembers(t.listeners(),[e]),t.removeListener(e),u.sameOrderedMembers(t.listeners(),[])}),o("collection",function(){for(var t=new c.Observer,n=0;n<10;n++)t.notify(n);var e=[];t.getNotificationQueue().forEach(function(t){return e.push(t)}),u.sameOrderedMembers(e,Array.apply(null,{length:10}).map(Function.call,Number))}),o("localFilter",function(){var t=0,n=(new c.Observer).addLocalFilter(function(t){return t>=5}).addListener(function(n){return t+=n});n.notify(4),n.notify(5),u.strictEqual(t,5)})})},{"../subscribe/observers/observer":2}],2:[function(t,n,e){"use strict";/*
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
Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.subscribed=!0,this.notificationQueue=new Array,this.callbacks=new Array,this._waiting=new Array,this.filters=new Array}return t.prototype.notify=function(t){this.runLocalFilter(t)&&(this._notifyCallbacks(t),this._waiting.length>0?this._waiting.shift()(t):this.notificationQueue.push(t))},t.prototype.once=function(t){var n=this;if(this.notificationQueue.length>0){var e=this.notificationQueue.shift();if(!t)return new Promise(function(t,n){t(e)});t(e)}else{if(!t){return new Promise(function(t,e){var r=function(n){t(n)};n._waiting.push(r)})}this._waiting.push(t)}},t.prototype.addListener=function(t){return this.callbacks.push(t),this},t.prototype.removeListener=function(t){var n=this.callbacks.indexOf(t,0);return n>-1&&this.callbacks.splice(n,1),this},t.prototype.clearListeners=function(){return this.callbacks=new Array,this},t.prototype.listeners=function(){return this.callbacks},t.prototype.getNotificationQueue=function(){return this.notificationQueue},t.prototype.addLocalFilter=function(t){return this.filters.push(t),this},t.prototype.runLocalFilter=function(t){return!(this.filters.length>0)||this.filters.some(function(n){return n(t)})},t.prototype._notifyCallbacks=function(t){this.callbacks.forEach(function(n){return n(t)})},t}();e.Observer=r},{}]},{},[1]);
//# sourceMappingURL=observers.js.map
