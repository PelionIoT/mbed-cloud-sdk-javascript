import { ApiKeyRepository, UserRepository } from "../entities";
import { Config } from "../client/config";
import { instanceOfApiKey } from "../generated/Accounts/apiKey/apiKeyFunctions";
import { instanceOfUser } from "../generated/Accounts/user/userFunctions";
// import { instanceOfAccount } from "../generated/Accounts/account/accountFunctions";

describe("ApiKey crud tests", () => {

    it("should perform apiKey crud test", async () => {
        const repo = new ApiKeyRepository(new Config());

        // create
        const created = await repo.create({
            name: "alex new api key",
        });

        expect(instanceOfApiKey(created)).toBeTruthy();

        // read

        const read = await repo.get(created.id);

        expect(instanceOfApiKey(read)).toBeTruthy();
        expect(read.id).toEqual(created.id);

        // update

        const updated = await repo.update({ name: "alex api new name" }, read.id);

        expect(instanceOfApiKey(updated)).toBeTruthy();
        expect(updated.name).toEqual("alex api new name");

        // delete

        await repo.delete(updated.id);

        // list

        const first = await repo.list().first();

        // tslint:disable-next-line:no-console
        console.log(first);

        expect(instanceOfApiKey(first)).toBeTruthy();
    });

    it("should perform user crud test", async () => {
        const repo = new UserRepository(new Config());

        // create
        const created = await repo.create({
            email: "alex@alextest.co.ck",
        });

        expect(instanceOfUser(created)).toBeTruthy();

        // read
        const read = await repo.get(created.id);
        expect(instanceOfUser(read)).toBeTruthy();
        expect(read.id).toEqual(created.id);

        // update
        const updated = await repo.update(read.id, { fullName: "Alex Logan" });
        expect(instanceOfUser(updated)).toBeTruthy();
        expect(updated.fullName).toEqual("Alex Logan");

        // delete
        await repo.delete(updated.id);

        // list
        const first = await repo.list().first();
        expect(instanceOfUser(first)).toBeTruthy();
    });

    // it("should perform account crud test", async () => {
    //     const repo = new AccountRepository(new Config());

    //     // create
    //     const created = await repo.create({
    //         email: "alex@alextest.co.ck",
    //     });

    //     expect(instanceOfAccount(created)).toBeTruthy();

    //     // read
    //     const read = await repo.get(created.id);
    //     expect(instanceOfAccount(read)).toBeTruthy();
    //     expect(read.id).toEqual(created.id);

    //     // update
    //     const updated = await repo.update(read.id, { displayName: "new display name" });
    //     expect(instanceOfAccount(updated)).toBeTruthy();
    //     expect(updated.displayName).toEqual("new display name");

    //     // delete
    //     await repo.
    // });

});
