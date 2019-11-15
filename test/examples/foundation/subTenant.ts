/* tslint:disable: no-console */
import {
    Account,
    SubtenantUser,
    SubtenantTrustedCertificate,
    PasswordPolicy,
    AccountRepository,
    SubtenantUserRepository,
    SubtenantUserInvitation,
} from "../../../src";
import { instanceOf } from "../../functions";

describe("examples of subtenant management", () => {
    test("creating and managing a subtenant account", async () => {
        const accountContext = new AccountRepository();
        let myAccount: Account = null;
        try {
            // an example: creating and managing a subtenant account
            (async () => {
                const newAccount: Account = {
                    displayName: "new test account",
                    aliases: ["alex_test_account"],
                    endMarket: "IOT",
                    // Admin user details
                    adminFullName: "Alex Logan",
                    adminEmail: "alexadmin@admin.com",
                };

                myAccount = await accountContext.create(newAccount);
            })();
            // cloak
        } catch (e) {
            // should throw 403, subtenant account limit reached
            if (e.details && e.details.code === 403) {
                (async () =>
                    (myAccount = (await accountContext.list().all()).filter(
                        a => a.displayName === "sdk test bob"
                    )[0]))();
            }
        } finally {
            // uncloak
            (async () => {
                const subtenantUserContext = new SubtenantUserRepository();
                // Populate the new user details
                const user: SubtenantUser = {
                    // Link this user to the account
                    accountId: myAccount.id,
                    // User details
                    fullName: "tommi the wombat",
                    username: "tommi_wombat",
                    phoneNumber: "0800001066",
                    email: "tommi_the_wombat@email.com",
                };

                // create the new user
                await subtenantUserContext.create(user, myAccount.id);

                // cloak
                expect(instanceOf<SubtenantUser>(user, "SUBTENANT_USER")).toBeTruthy();
                expect(user.createdAt).not.toBeUndefined();

                const userInList = (await accountContext.users(myAccount.id).all()).filter(u => u.id === user.id)[0];
                expect(instanceOf<SubtenantUser>(userInList, "SUBTENANT_USER")).toBeTruthy();
                expect(userInList.createdAt).toEqual(user.createdAt);

                await subtenantUserContext.delete(myAccount.id, user.id);
                // uncloak
            })();
            // end of example
        }
    });
});
