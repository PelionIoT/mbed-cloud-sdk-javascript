import { extractFilter } from "../../../src/common/filters";

describe("Test filter encoding", () => {

    it("should encode string", () => {
        const filter = { name: { eq: "Badger" } };
        const expectedValue = "Badger";

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

    it("should encode number", () => {
        const filter = { name: { eq: -50 } };
        const expectedValue = -50;

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

    it("should encode bool", () => {
        const filter = { name: { eq: true } };
        const expectedValue = "true";

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

    it("should encode date", () => {
        const filter = { name: { eq: new Date(2019, 3, 7, 13, 33, 47) } };
        const expectedValue = "2019-04-07T12:33:47.000Z";

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

    it("should encode list", () => {
        const filter = { name: { in: [ "Badger", "Gopher" ] } };
        const expectedValue = "Badger,Gopher";

        expect(extractFilter(filter, "name", "in")).toBe(expectedValue);
    });

    it("should encode dictionary", () => {
        const filter = { name: { nin: { Animal: "Badger" } } };
        const expectedValue = '{"Animal":"Badger"}';

        expect(extractFilter(filter, "name", "nin")).toBe(expectedValue);
    });

    it("should encode null", () => {
        const filter = { name: { eq: null } };
        const expectedValue = "null";

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

    it("should encode missing operator", () => {
        const filter = { name: new Date(2019, 3, 7) };
        const expectedValue = "2019-04-06T23:00:00.000Z";

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

});
