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

import { Observer } from "../../src/primary/subscribe/observers/observer";

describe("testObserver", () => {

    test("subscribeFirst", () => {
        const observer = new Observer<string>();
        const a = observer.once();
        const b = observer.once();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        a.then( res => expect(res).toEqual( "a"));
        b.then( res => expect(res).toEqual( "b"));
    });

    test("subscribeFirstCallback", () => {
        const observer = new Observer<string>();
        observer.once( res => expect(res).toEqual( "a"));
        observer.once( res => expect(res).toEqual( "b"));
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
    });

    test("notifyFirst", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        const a = observer.once();
        const b = observer.once();
        a.then( res => expect(res).toEqual( "a"));
        b.then( res => expect(res).toEqual( "b"));
    });

    test("notifyFirstCallback", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        observer.notify("b");
        observer.notify("c");
        observer.once( res => expect(res).toEqual( "a"));
        observer.once( res => expect(res).toEqual( "b"));
    });

    test("interleaved", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        const a = observer.once();
        const b = observer.once();
        const c = observer.once();
        observer.notify("b");
        const d = observer.once();
        observer.notify("c");
        observer.notify("d");
        observer.notify("e");
        const e = observer.once();
        a.then( res => expect(res).toEqual( "a"));
        b.then( res => expect(res).toEqual( "b"));
        c.then( res => expect(res).toEqual( "c"));
        d.then( res => expect(res).toEqual( "d"));
        e.then( res => expect(res).toEqual( "e"));
    });

    test("interleavedCallback", () => {
        const observer = new Observer<string>();
        observer.notify("a");
        observer.once( res => expect(res).toEqual( "a"));
        observer.once( res => expect(res).toEqual( "b"));
        observer.once( res => expect(res).toEqual( "c"));
        observer.notify("b");
        observer.once( res => expect(res).toEqual( "d"));
        observer.notify("c");
        observer.notify("d");
        observer.notify("e");
        observer.once( res => expect(res).toEqual( "e"));
    });

    test("callback", () => {
        const observer = new Observer<number>();
        let x = 1;
        observer.addListener( res => x += res);
        observer.addListener( res => x += (res * 2));
        observer.notify(3);
        expect(x).toEqual( 10);
    });

    test("addRemoveCallbacks", () => {
        const observer = new Observer<string>();
        // tslint:disable-next-line:no-empty
        const f = () => { };
        // tslint:disable-next-line:no-empty
        const g = () => { };
        observer.addListener(f);
        observer.addListener(g);
        expect(observer.listeners()).toEqual([ f, g ]);
        observer.removeListener(f);
        expect(observer.listeners()).toEqual([ g ]);
        observer.removeListener(g);
        expect(observer.listeners()).toEqual([]);
    });

    test("collection", () => {
        const observer = new Observer<number>();
        for (let index = 0; index < 10; index++) {
            observer.notify(index);
        }
        const items = [];
        observer.getNotificationQueue().forEach(item => items.push(item));
        expect(items).toEqual(Array.apply(null, { length: 10 }).map(Function.call, Number));
    });

    test("localFilter", () => {
        let x = 0;
        const observer = new Observer<number>()
            .addLocalFilter( num => num >= 5)
            .addListener( res => x += res);
        observer.notify(4);
        observer.notify(5);
        expect(x).toEqual( 5);
    });
});
