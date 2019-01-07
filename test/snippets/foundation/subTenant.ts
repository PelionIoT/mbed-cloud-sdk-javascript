import { Account, SubtenantUser, SubtenantTrustedCertificate, PasswordPolicy, AccountRepository, UserRepository, SubtenantUserRepository } from "../../../src/sdk/entities";
import { Config } from "../../../src/sdk/client/config";

describe("subTenants", () => {
    it("should update user as subtenant", async () => {
        const accountContext = new AccountRepository(new Config());
        let myAccount: Account = null;
        try {
            const newAccount: Account = {
                displayName: "new test account",
                aliases: [
                    "alex_test_account"
                ],
                endMarket: "IOT",
                // Admin user details
                adminFullName: "Alex Logan",
                adminEmail: "alexadmin@admin.com",
            };

            await accountContext.create(newAccount);
        } catch (e) {
            // should throw 403, subtenant account limit reached
            if (e.details && e.details.code === 403) {
                myAccount = (await accountContext.list({}).all()).filter(a => a.displayName === "sdk_test_bob")[0];
            }
        } finally {
            // expect(myAccount).toBeInstanceOf(Account);

            // get first subtenant user
            const firstUser = await accountContext.users(myAccount.id).first();
            const userContext = new UserRepository(new Config());

            const phoneNumber = firstUser.phoneNumber;

            firstUser.phoneNumber = "117117";
            await userContext.update(firstUser, firstUser.id);

            expect(firstUser.phoneNumber).not.toEqual(phoneNumber);
            expect(firstUser.phoneNumber).toEqual("117117");

            firstUser.phoneNumber = phoneNumber;
            await userContext.update(firstUser, firstUser.id);

            expect(firstUser.phoneNumber).not.toEqual("117117");
        }
    });

    test("subTenant", async () => {
        const accountContext = new AccountRepository(new Config());
        let myAccount: Account = null;
        try {
            // an example: creating and managing a subtenant account
            const newAccount: Account = {
                displayName: "new test account",
                aliases: [
                    "alex_test_account"
                ],
                endMarket: "IOT",
                // Admin user details
                adminFullName: "Alex Logan",
                adminEmail: "alexadmin@admin.com",
            };

            await accountContext.create(newAccount);
            // cloak
        } catch (e) {
            // should throw 403, subtenant account limit reached
            if (e.details && e.details.code === 403) {
                myAccount = (await accountContext.list({}).all()).filter(a => a.displayName === "sdk_test_bob")[0];
            }
        } finally {
            // uncloak
            const subtenantUserContext = new SubtenantUserRepository(new Config());
            // Populate the new user details
            const user: SubtenantUser = {
                // Link this user to the account
                accountId: myAccount.id,
                // User details
                fullName: "tommi the wombat",
                username: "tommi_wombat",
                phoneNumber: "0800001066",
                email: "tommi_wombat@email.com",
            };

            // create the new user
            await subtenantUserContext.create(user, myAccount.id);

            // end of example

            // expect(user).toBeInstanceOf(SubtenantUser);
            expect(user.createdAt).not.toBeUndefined();

            const userInList = (await accountContext.users(myAccount.id).all()).filter(u => u.id === user.id)[0];
            // expect(userInList).toBeInstanceOf(SubtenantUser);
            expect(userInList.createdAt).toEqual(user.createdAt);

            await subtenantUserContext.delete(myAccount.id, user.id);
        }
    });

    it("should get account lists", async () => {
        const accountContext = new AccountRepository(new Config());
        const myAccount = await accountContext.me();

        const user = await accountContext.users(myAccount.id).first();
        if (user) {
            // expect(user).toBeInstanceOf(SubtenantUser);
        }

        const trustedCert = await accountContext.trustedCertificates(myAccount.id).first();
        if (trustedCert) {
            // expect(trustedCert).toBeInstanceOf(SubtenantTrustedCertificate);
        }

        const invitation = await accountContext.userInvitations(myAccount.id).first();
        if (invitation) {
            // expect(invitation).toBeInstanceOf(SubtenantTrustedCertificate);
        }
    });

    it("should check account password policies", async () => {
        const accountContext = new AccountRepository(new Config());
        (await accountContext.list({}).all()).forEach(a => {
            if (a.passwordPolicy) {
                // expect(a.passwordPolicy).toBeInstanceOf(PasswordPolicy);
            }
        });
    });
});
