import { extractFilter } from "../../../src/common/filters";
import { Entity } from "../../../src/common/entity";

describe("Test filter encoding", () => {

    const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

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

        expect(extractFilter(filter, "name", "eq")).toMatch(DATE_REGEX);
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
        const expectedValue = null;

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

    it("should return null for missing filter", () => {
        const filter = { name: { eq: "Gopher" } };
        const expectedValue = null;

        expect(extractFilter(filter, "badger", "neq")).toBe(expectedValue);
    });

    it("should encode missing operator", () => {
        const filter = { name: new Date(2019, 3, 7) };

        expect(extractFilter(filter, "name", "eq")).toMatch(DATE_REGEX);
    });

    it("should encode entity", () => {
        const filter: { [key: string]: { [operator: string]: Entity } } = { name: { eq: { id: "123456", _discriminator: "USER" } } };
        const expectedValue = "123456";

        expect(extractFilter(filter, "name", "eq")).toBe(expectedValue);
    });

});
