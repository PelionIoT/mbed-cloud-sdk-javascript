/*
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

const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

import { Observer } from "../connect/subscribe/observers/observer";

suite("testObserver", () => {

    test("subscribeFirst", () => {
        const observer = new Observer<string>();
        const a = observer.take();
        const b = observer.take();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        assert.notEqual(a, b);
        a.then(res => assert.strictEqual(res, "a"));
        b.then(res => assert.strictEqual(res, "b"));
    });

    test("subscribeFirstCallback", () => {
        const observer = new Observer<string>();
        observer.take(res => assert.strictEqual(res, "a"));
        observer.take(res => assert.strictEqual(res, "b"));
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
    });

    test("notifyFirst", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        const a = observer.take();
        const b = observer.take();
        assert.notEqual(a, b);
        a.then(res => assert.strictEqual(res, "a"));
        b.then(res => assert.strictEqual(res, "b"));
    });

    test("notifyFirstCallback", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        observer.take(res => assert.strictEqual(res, "a"));
        observer.take(res => assert.strictEqual(res, "b"));
    });

    test("interleaved", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        const a = observer.take();
        const b = observer.take();
        const c = observer.take();
        observer.notify("b");
        const d = observer.take();
        observer.notify("c");
        observer.notify("d");
        observer.notify("e");
        const e = observer.take();
        a.then(res => assert.strictEqual(res, "a"));
        b.then(res => assert.strictEqual(res, "b"));
        c.then(res => assert.strictEqual(res, "c"));
        d.then(res => assert.strictEqual(res, "d"));
        e.then(res => assert.strictEqual(res, "e"));
    });

    test("interleavedCallback", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        observer.take(res => assert.strictEqual(res, "a"));
        observer.take(res => assert.strictEqual(res, "b"));
        observer.take(res => assert.strictEqual(res, "c"));
        observer.notify("b");
        observer.take(res => assert.strictEqual(res, "d"));
        observer.notify("c");
        observer.notify("d");
        observer.notify("e");
        observer.take(res => assert.strictEqual(res, "e"));
    });

    test("callback", () => {
        const observer = new Observer<number>();
        let x = 1;
        observer.addCallback(res => x += res);
        observer.addCallback(res => x += (res * 2));
        observer.notify(3);
        assert.strictEqual(x, 10);
    });

    test("addRemoveCallbacks", () => {
        const observer = new Observer<string>();
        // tslint:disable-next-line:no-empty
        const f = () => { };
        // tslint:disable-next-line:no-empty
        const g = () => { };
        observer.addCallback(f);
        observer.addCallback(g);
        assert.sameOrderedMembers(observer.callbacks, [ f, g ]);
        observer.removeCallback(f);
        assert.sameOrderedMembers(observer.callbacks, [ g ]);
        observer.removeCallback(g);
        assert.sameOrderedMembers(observer.callbacks, []);
    });

    test("collection", () => {
        const observer = new Observer<number>();
        for (let index = 0; index < 10; index++) {
            observer.notify(index);
        }
        const items = [];
        observer.notificationQueue.forEach(item => items.push(item));
        assert.sameOrderedMembers(items, Array.apply(null, { length: 10 }).map(Function.call, Number));
    });
});
