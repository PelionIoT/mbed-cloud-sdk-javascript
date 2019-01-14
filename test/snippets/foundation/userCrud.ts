import { User, LoginHistory, UserRepository, ApiKey } from "../../../src/sdk/entities";
import { instanceOf } from "../../functions";
import { SDK } from "../../../src/sdk";

describe("userCrud", () => {

    test("user get", async () => {
        try {
            const userContext = new UserRepository();

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
            const userContext = new UserRepository();

            const user = await userContext.list().first();
            expect(instanceOf<User>(user, "USER")).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

    test("phone demo", async () => {
        try {
            const userContext = new UserRepository();

            const user: User = {
                username: "alexjs",
                email: "alex@alex.alex",
                phoneNumber: "01638742452",
                fullName: "Alex Logan",
            };

            await userContext.create(user);

            // TODO reenable when IAM issue is fixed
            // user.phoneNumber = "118118";
            // await userContext.update(user, user.id);

            // expect(user.phoneNumber).toEqual("118118");

            await userContext.delete(user.id);
        } catch (e) {
            throw e;
        }
    });

    test("apiKey", () => {
        const sdk = new SDK();

        const apiKey: ApiKey = {
            name: "my api key",
            createdAt: new Date(),
        };

        sdk.entities.apiKeyRepository().create(apiKey);
    });
});
