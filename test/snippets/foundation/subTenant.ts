import { Account, SubtenantUser, SubtenantTrustedCertificate, PasswordPolicy } from "../../../src/sdk/entities";

describe("subTenants", () => {
    it("should update user as subtenant", async () => {
        let myAccount: Account = null;
        try {
            const newAccount = new Account();
            newAccount.displayName = "new test account";
            newAccount.aliases = [ "alex_test_account" ];
            newAccount.endMarket = "IOT";
            // Admin user details
            newAccount.adminFullName = "Alex Logan";
            newAccount.adminEmail = "alexadmin@admin.com";

            await newAccount.create();
        } catch (e) {
            // should throw 403, subtenant account limit reached
            if (e.details && e.details.code === 403) {
                myAccount = (await new Account().list().all()).filter(a => a.displayName === "sdk_test_bob")[0];
            }
        } finally {
            expect(myAccount).toBeInstanceOf(Account);

            // get first subtenant user
            const firstUser = await myAccount.users().first();

            const phoneNumber = firstUser.phoneNumber;

            firstUser.phoneNumber = "117117";
            await firstUser.update();

            expect(firstUser.phoneNumber).not.toEqual(phoneNumber);
            expect(firstUser.phoneNumber).toEqual("117117");

            firstUser.phoneNumber = phoneNumber;
            await firstUser.update();

            expect(firstUser.phoneNumber).not.toEqual("117117");
        }
    });

    test("subTenant", async () => {
        let myAccount: Account = null;
        try {
            // an example: creating and managing a subtenant account
            const newAccount = new Account();
            newAccount.displayName = "new test account";
            newAccount.aliases = [ "alex_test_account" ];
            newAccount.endMarket = "IOT";
            // Admin user details
            newAccount.adminFullName = "Alex Logan";
            newAccount.adminEmail = "alexadmin@admin.com";

            await newAccount.create();
            // cloak
        } catch (e) {
            // should throw 403, subtenant account limit reached
            if (e.details && e.details.code === 403) {
                myAccount = (await new Account().list().all()).filter(a => a.displayName === "sdk_test_bob")[0];
            }
        } finally {
            // uncloak
            // Populate the new user details
            const user = new SubtenantUser();
            // Link this user to the account
            user.accountId = myAccount.id;
            // User details
            user.fullName = "tommi the wombat";
            user.username = "tommi_wombat";
            user.phoneNumber = "0800001066";
            user.email = "tommi_wombat@email.com";

            // create the new user
            await user.create();

            // end of example

            expect(user).toBeInstanceOf(SubtenantUser);
            expect(user.createdAt).not.toBeUndefined();

            const userInList = (await myAccount.users().all()).filter(u => u.id === user.id)[0];
            expect(userInList).toBeInstanceOf(SubtenantUser);
            expect(userInList.createdAt).toEqual(user.createdAt);

            await user.delete();
        }
    });

    it("should get account lists", async () => {
        const myAccount = await new Account().me();

        const user = await myAccount.users().first();
        if (user) {
            expect(user).toBeInstanceOf(SubtenantUser);
        }

        const trustedCert = await myAccount.trustedCertificates().first();
        if (trustedCert) {
            expect(trustedCert).toBeInstanceOf(SubtenantTrustedCertificate);
        }

        const invitation = await myAccount.userInvitations().first();
        if (invitation) {
            expect(invitation).toBeInstanceOf(SubtenantTrustedCertificate);
        }
    });

    it("should check account password policies", async () => {
        (await new Account().list().all()).forEach(a => {
            if (a.passwordPolicy) {
                expect(a.passwordPolicy).toBeInstanceOf(PasswordPolicy);
            }
        });
    });
});
