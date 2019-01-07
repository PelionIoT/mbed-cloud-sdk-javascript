import { User, LoginHistory, UserRepository } from "../../../src/sdk/entities";
import { Config } from "../../../src/sdk/client/config";
import { instanceOf } from "./functions";

describe("userCrud", () => {

    test("user get", async () => {
        try {
            const userContext = new UserRepository(new Config());

            const user = await userContext.list().first();

            const gotUser = await userContext.get(user.id);

            expect(instanceOf<User>(gotUser, "USER")).toBeTruthy();
            expect(gotUser.createdAt).toEqual(user.createdAt);

            const loginHistory = gotUser.loginHistory[0];
            expect(instanceOf<LoginHistory>(loginHistory, "LOGIN_HISTORY")).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

    test("user list", async () => {
        try {
            const userContext = new UserRepository(new Config());

            const user = await userContext.list().first();
            expect(instanceOf<User>(user, "USER")).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

    test("phone demo", async () => {
        try {
            const userContext = new UserRepository(new Config());

            const user: User = {
                username: "alexjs",
                email: "alex@alex.alex",
                phoneNumber: "01638742452",
                fullName: "Alex Logan",
            };

            await userContext.create(user);

            user.phoneNumber = "118118";
            await userContext.update(user, user.id);

            expect(user.phoneNumber).toEqual("118118");

            await userContext.delete(user.id);
        } catch (e) {
            throw e;
        }
    });
});
