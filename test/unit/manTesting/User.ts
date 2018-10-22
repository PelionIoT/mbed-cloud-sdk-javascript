import { User, MyAccount } from "../../../src/sdk/entities";

describe("test suntenants", () => {

    it("should get user", async () => {

        const myAccount = await new MyAccount().get();

        // tslint:disable-next-line:no-console
        console.log(myAccount);

        const newUser = new User();
        newUser.accountId = myAccount.id;
        newUser.username = "alexSubtenantTest";
        newUser.email = "alex@alexlogan.io";
        newUser.fullName = "Alex Logan";

        await newUser.createOnSubtenant();

        // tslint:disable-next-line:no-console
        console.log(newUser);

        await newUser.delete();

        const user = await new User().list().first();

        // tslint:disable-next-line:no-console
        console.log(await user.getOnSubtenant());

    }, 10000);

});
