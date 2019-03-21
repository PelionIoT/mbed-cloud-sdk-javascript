import { ServerCredentials, ServerCredentialsRepository } from "../../../src/foundation";
import { instanceOf } from "../../functions";

describe("ServerCredentials tests", () => {
    it("should get lwm2m credentials", async () => {
        const serverCredentialsContext = new ServerCredentialsRepository();
        const credentials = await serverCredentialsContext.getLwm2m();
        expect(instanceOf<ServerCredentials>(credentials, "SERVER_CREDENTIALS")).toBeTruthy();
    });

    it("should get bootstrap credentials", async () => {
        const serverCredentialsContext = new ServerCredentialsRepository();
        const credentials = await serverCredentialsContext.getBootstrap();
        expect(instanceOf<ServerCredentials>(credentials, "SERVER_CREDENTIALS")).toBeTruthy();
    });
});
