import { User, MyAccount } from "../../../src/sdk/entities";

describe("test suntenants", () => {

    it("should get user", async () => {

        try {
            const myAccount = await new MyAccount().get();
            // myAccount.id = "";

            const user = new User();
            user.accountId = myAccount.id;
            // user.id = "0160220bab144212f02c240e00000000";
            // await user.get();
            // tslint:disable-next-line:no-console
            // console.log(user);
            // user.accountId = myAccount.id;

            // const allUsers = await user.list().all();
            const allAggUsers = await user.listSubtenant().all();
            // tslint:disable-next-line:no-console
            console.log(allAggUsers);

            // expect(allAggUsers).toEqual(allUsers);
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }

        // const myAccount = await new MyAccount().get();

        // // tslint:disable-next-line:no-console
        // console.log(myAccount);

        // const newUser = new User();
        // newUser.accountId = myAccount.id;
        // newUser.username = "alexSubtenantTest";
        // newUser.email = "alex@alexlogan.io";
        // newUser.fullName = "Alex Logan";

        // await newUser.createOnSubtenant();

        // // tslint:disable-next-line:no-console
        // console.log(newUser);

        // await newUser.delete();

        // const user = await new User().list().first();

        // // tslint:disable-next-line:no-console
        // console.log(await user.getOnSubtenant());

    }, 100000);

});
