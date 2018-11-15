import { ServerCredentials } from "../../../src/sdk/entities";

describe("ServerCredentials tests", () => {
    it("should get lwm2m credentials", async () => {
        const credentials = await new ServerCredentials().getLwm2m();
        expect(credentials).toBeInstanceOf(ServerCredentials);
    });

    it("should get bootstrap credentials", async () => {
        const credentials = await new ServerCredentials().getBootstrap();
        expect(credentials).toBeInstanceOf(ServerCredentials);
    });
});
