import { CrudTest } from "./crudTest";
import { CertificateIssuer, Account, ApiKey, User, Device, DeviceEnrollment, DeviceEvents, CertificateEnrollment, CertificateIssuerConfig, TrustedCertificate } from "../../../src/sdk/entities";

describe("generic crud tests", () => {
    it("should crud account", async () => {
        const crudTest = new CrudTest<Account>(Account);
        await crudTest.test();
    });

    it("should crud apiKey", async () => {
        const crudTest = new CrudTest<ApiKey>(ApiKey);
        await crudTest.test();
    });

    it("should crud user", async () => {
        const myAccount = await new Account().me();
        const accountFunc = (entity: User) => {
            entity.accountId = myAccount.id;
            return entity;
        };
        const crudTest = new CrudTest<User>(User, null, {
            preListFunc: accountFunc,
            preGetFunc: accountFunc
        });
        await crudTest.test();
    });

    it("should crud device", async () => {
        const crudTest = new CrudTest<Device>(Device);
        await crudTest.test();
    });

    it("should crud deviceEnrollment", async () => {
        const crudTest = new CrudTest<DeviceEnrollment>(DeviceEnrollment);
        await crudTest.test();
    });

    it("should crud deviceEvents", async () => {
        const crudTest = new CrudTest<DeviceEvents>(DeviceEvents);
        await crudTest.test();
    });

    it("should crud certificateEnrollment", async () => {
        const crudTest = new CrudTest<CertificateEnrollment>(CertificateEnrollment);
        await crudTest.test();
    });

    it("should crud certificateIssuer", async () => {
        const crudTest = new CrudTest<CertificateIssuer>(CertificateIssuer, null, {
            expectedFails: [ 403 ]
        });
        await crudTest.test();
    });

    it("should crud certificateIssuerConfig", async () => {
        const crudTest = new CrudTest<CertificateIssuerConfig>(CertificateIssuerConfig);
        await crudTest.test();
    });

    it("should crud trustedCertificate", async () => {
        const crudTest = new CrudTest<TrustedCertificate>(TrustedCertificate);
        await crudTest.test();
    });
});
