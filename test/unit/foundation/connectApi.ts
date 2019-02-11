import { ConnectApi } from "../../../src";

describe("test configuration for connect api", () => {

    it("should set delivery method to client initiated when autostart is true", () => {

        const api = new ConnectApi({
            apiKey: "ak_1",
            autostartNotifications: true,
        });

        expect(api.autostartNotifications).toBeTruthy();
        expect(api.deliveryMethod).toEqual("CLIENT_INITIATED");
    });

    it("should throw exception if autostart is true and server initiated", () => {

        expect(() => {
            return new ConnectApi({
                apiKey: "ak_1",
                autostartNotifications: true,
                deliveryMethod: "SERVER_INITIATED",
            });
        }).toThrowError("autostartNotifications cannot be true if server initiated");

    });

    it("should default force clear to false", () => {

        const api = new ConnectApi({
            apiKey: "ak_1",
        });

        expect(api.forceClear).toBe(false);

    });

    it("should set force clear to false", () => {

        const api = new ConnectApi({
            apiKey: "ak_1",
            forceClear: false,
        });

        expect(api.forceClear).toEqual(false);

    });

    it("should set force clear to true", () => {

        const api = new ConnectApi({
            apiKey: "ak_1",
            forceClear: true,
        });

        expect(api.forceClear).toEqual(true);

    });

    it("should set autostart to true if delivery method is undefined", () => {
        const api = new ConnectApi({
            apiKey: "ak_1",
        });

        expect(api.autostartNotifications).toBeTruthy();
    });

    it("should set autostart to true if delivery method is client initiated and autostart is not defined", () => {

        const api = new ConnectApi({
            apiKey: "ak_1",
            deliveryMethod: "CLIENT_INITIATED",
        });

        expect(api.autostartNotifications).toBeTruthy();

    });

    it("should set autostart to false if delivery method is server initiated and autostart is not defined", () => {

        const api = new ConnectApi({
            apiKey: "ak_1",
            deliveryMethod: "SERVER_INITIATED",
        });

        expect(api.autostartNotifications).toBe(false);

    });

});
