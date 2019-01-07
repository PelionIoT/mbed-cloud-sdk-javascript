import { ApiKeyRepository, UserRepository, ApiKey, User } from "../entities";
import { Config } from "../client/config";
import { Entity } from "../common/entity";
// import { instanceOfAccount } from "../generated/Accounts/account/accountFunctions";

describe("ApiKey crud tests", () => {

    it("should perform apiKey crud test", async () => {
        const repo = new ApiKeyRepository(new Config());

        // create
        const created = await repo.create({
            name: "alex new api key",
        });

        expect(instanceOf<ApiKey>(created, "API_KEY")).toBeTruthy();

        // read

        const read = await repo.get(created.id);

        expect(instanceOf<ApiKey>(read, "API_KEY")).toBeTruthy();
        expect(read.id).toEqual(created.id);

        // update

        const updated = await repo.update({ name: "alex api new name" }, read.id);

        expect(instanceOf<ApiKey>(updated, "API_KEY")).toBeTruthy();
        expect(updated.name).toEqual("alex api new name");

        // delete

        await repo.delete(updated.id);

        // list

        const first = await repo.list().first();

        // tslint:disable-next-line:no-console
        console.log(first);

        // tslint:disable-next-line:no-console
        console.log(first);

        expect(instanceOf<ApiKey>(first, "API_KEY")).toBeTruthy();
    });

    it("should perform user crud test", async () => {
        const repo = new UserRepository(new Config());

        // create
        const created = await repo.create({
            email: "alex@alextest.co.ck",
        });

        expect(instanceOf<User>(created, "USER")).toBeTruthy();

        // read
        const read = await repo.get(created.id);
        expect(instanceOf<User>(read, "USER")).toBeTruthy();
        expect(read.id).toEqual(created.id);

        // update
        const updated = await repo.update({ fullName: "Alex Logan" }, read.id);
        expect(instanceOf<User>(updated, "USER")).toBeTruthy();
        expect(updated.fullName).toEqual("Alex Logan");

        // tslint:disable-next-line:no-console
        console.log(created);
        expect(false).toBeTruthy();

        // delete
        await repo.delete(updated.id);

        // list
        const first = await repo.list().first();
        expect(instanceOf<User>(first, "USER")).toBeTruthy();
    });
});

function instanceOf<T extends Entity>(object: any, discriminator: string): object is T {
    return object._discriminator === discriminator;
}
