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

import { User, LoginHistory, PolicyGroup } from "../../../sdk/entities";
import { Config } from "../../../sdk";
import { AccountManagementApi } from "../../../accountManagement/accountManagementApi";
const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

suite("userCrud", () => {

    test("user get", () => {
        const iam = new AccountManagementApi(new Config());

        return iam.listUsers()
            .then( users => {
                const firstUserId = users.data[0].id;

                const user = new User();
                user.id = firstUserId;

                user.get()
                .then( u => {

                    assert.instanceOf(u, User);

                    const l = u.loginHistory[0];
                    assert.instanceOf(l, LoginHistory);
                });
            })
            .catch( e => {
                throw e;
            });
    });

    test("user list", () => {
        const user = new User();

        return user.list()
            .first()
            .then( first => {
                assert.instanceOf(first, User);
            })
            .catch( e => {
                throw e;
            });
    });

    test("user list foreignKey", () => {
        return Promise.resolve()
            .then( _ => {
                const group = new PolicyGroup();

                return group.list().all();
            })
            .then( groups => {
                const user = new User();

                return user.list()
                    .first()
                    .then( first => {
                        const groupId = groups[0].id;
                        if (first.groupIds.indexOf(groupId) === -1) {
                            first.groupIds.push(groupId);
                        }
                        return first.update();
                    });
            })
            .then( user => {
                return user.groups().all();
            }).then( groups => {
                const firstGroup = groups[0];

                assert.instanceOf(firstGroup, PolicyGroup);
            })
            .catch( e => {
                throw e;
            });
    });

    test("phone demo", () => {
        return Promise.resolve()
            .then( _ => {
                const user = new User();

                user.username = "alexjs";
                user.email = "alex@alex.alex";
                user.phoneNumber = "01638742452";
                user.fullName = "Alex Logan";

                return user.create();
            })
            .then( user => {
                user.phoneNumber = "118118";

                return user.update();
            })
            .then( user => {
                assert.strictEqual("118118", user.phoneNumber);

                return user.delete();
            })
            .catch( e => {
                throw e;
            });
    });
});
