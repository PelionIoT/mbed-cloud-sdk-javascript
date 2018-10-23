import { ApiKey } from "../../src/sdk/entities";

describe("Api Keys", () => {

    it("should crud ApiKeys", async () => {
        const apiKeys = await new ApiKey().list().all();

        expect(apiKeys[0] instanceof ApiKey).toBeTruthy();

        const first = apiKeys[0];

        await first.get();

        expect(first.createdAt).not.toBeUndefined();

        const newName = `crudApiKey-${new Date().toUTCString()}`;
        first.name = newName;
        await first.update();
        expect(first.name).toEqual(newName);

        const newKey = new ApiKey();
        newKey.name = "CrudApiKey";
        newKey.status = "ACTIVE";
        await newKey.create();

        expect(newKey.createdAt).not.toBeUndefined();

        await newKey.delete();
    });
});
