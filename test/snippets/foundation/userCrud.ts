import { User, LoginHistory } from "../../../src/sdk/entities";

describe("userCrud", () => {

    test("user get", async () => {
        try {
            const user = await new User().list().first();

            const gotUser = new User();
            gotUser.id = user.id;
            gotUser.accountId = user.accountId;
            await gotUser.get();

            expect(gotUser).toBeInstanceOf(User);
            expect(gotUser.createdAt).toEqual(user.createdAt);

            const loginHistory = gotUser.loginHistory[0];
            expect(loginHistory).toBeInstanceOf(LoginHistory);
        } catch (e) {
            throw e;
        }
    });

    test("user list", async () => {
        try {
            const user = await new User().list().first();
            expect(user).toBeInstanceOf(User);
        } catch (e) {
            throw e;
        }
    });

    test("phone demo", async () => {
        try {
            const user = new User();
            user.username = "alexjs";
            user.email = "alex@alex.alex";
            user.phoneNumber = "01638742452";
            user.fullName = "Alex Logan";
            await user.create();

            user.phoneNumber = "118118";

            await user.update();
            expect(user.phoneNumber).toEqual("118118");

            await user.delete();
        } catch (e) {
            throw e;
        }
    });
});
