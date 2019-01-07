// import { CrudTest } from "./crudTest";
// import { CertificateIssuer, Account, ApiKey, User, Device, DeviceEnrollment, DeviceEvents, CertificateEnrollment, CertificateIssuerConfig, TrustedCertificate, UserInvitation, SubtenantUser, SubtenantTrustedCertificate, DeveloperCertificate } from "../../../src/sdk/entities";

// describe("generic crud tests", () => {
//     it("should crud account", async () => {
//         const myAccount = await new Account().me();
//         const propsToUpdate = {
//             phoneNumber: "118118"
//         };
//         const crudTest = new CrudTest<Account>(Account, {
//             objectInstance: myAccount,
//             propsToUpdate: propsToUpdate,
//             update: true,
//         });
//         await crudTest.test();
//     });

//     it("should crud apiKey", async () => {
//         const newApiKey = new ApiKey();
//         newApiKey.name = "alex new api key";

//         const propsToUpdate = {
//             name: "updated api key",
//         };

//         const crudTest = new CrudTest<ApiKey>(ApiKey, {
//             objectInstance: newApiKey,
//             propsToUpdate: propsToUpdate,
//             create: true,
//             update: true,
//         });
//         await crudTest.test();

//         const myApiKey = await new ApiKey().me();
//         expect(myApiKey).toBeInstanceOf(ApiKey);
//     });

//     it("should crud user", async () => {
//         const newUser = new User();
//         newUser.username = "alexnewuser";
//         newUser.fullName = "Dan Dan";
//         newUser.email = "dan@dan.com";
//         newUser.phoneNumber = "0800001066";

//         const propsToUpdate = {
//             phoneNumber: "118118",
//         };

//         const crudTest = new CrudTest<User>(User, {
//             objectInstance: newUser,
//             propsToUpdate: propsToUpdate,
//             create: true,
//             update: true,
//         });
//         await crudTest.test();
//     });

//     it("should crud subtenantUser", async () => {
//         const myAccount = await new Account().me();
//         const firstSubUser = await myAccount.users().first();

//         const newSubUser = new SubtenantUser();
//         newSubUser.accountId = myAccount.id;
//         newSubUser.username = "alexnewuser";
//         newSubUser.fullName = "Dan Dan";
//         newSubUser.email = "dan@dan.com";
//         newSubUser.phoneNumber = "0800001066";

//         const propsToUpdate = {
//             phoneNumber: "118118",
//         };

//         const preFunc = (entity: SubtenantUser) => {
//             entity.accountId = myAccount.id;
//             return entity;
//         };

//         const crudTest = new CrudTest<SubtenantUser>(SubtenantUser, {
//             list: false,
//             preGetFunc: preFunc,
//             firstObj: firstSubUser,
//             objectInstance: newSubUser,
//             propsToUpdate: propsToUpdate,
//             create: true,
//             update: true,
//         });
//         await crudTest.test();
//     });

//     it("should crud userInvitation", async () => {
//         const crudTest = new CrudTest<UserInvitation>(UserInvitation);
//         await crudTest.test();
//     });

//     it("should crud device", async () => {
//         const crudTest = new CrudTest<Device>(Device);
//         await crudTest.test();
//     });

//     it("should crud deviceEnrollment", async () => {
//         const crudTest = new CrudTest<DeviceEnrollment>(DeviceEnrollment);
//         await crudTest.test();
//     });

//     it("should crud deviceEvents", async () => {
//         const crudTest = new CrudTest<DeviceEvents>(DeviceEvents);
//         await crudTest.test();
//     });

//     it("should crud certificateEnrollment", async () => {
//         const crudTest = new CrudTest<CertificateEnrollment>(CertificateEnrollment);
//         await crudTest.test();
//     });

//     it("should crud certificateIssuer", async () => {
//         const crudTest = new CrudTest<CertificateIssuer>(CertificateIssuer, {
//             expectedFails: [ 403 ]
//         });
//         await crudTest.test();
//     });

//     it("should crud certificateIssuerConfig", async () => {
//         const crudTest = new CrudTest<CertificateIssuerConfig>(CertificateIssuerConfig);
//         await crudTest.test();
//     });

//     it("should crud trustedCertificate", async () => {
//         const trustedCertificate = (await new TrustedCertificate().list().all()).filter(t => t.isDeveloperCertificate === false)[0];

//         const propsToUpdate = {
//             description: "updated description",
//         };

//         const crudTest = new CrudTest<TrustedCertificate>(TrustedCertificate, {
//             objectInstance: trustedCertificate,
//             propsToUpdate: propsToUpdate,
//             update: true,
//         });
//         await crudTest.test();
//     });

//     it("should crud subtenantTrustedCertificate", async () => {
//         const myAccount = await new Account().me();
//         const trustedCertificate = (await myAccount.trustedCertificates().all()).filter(t => t.isDeveloperCertificate === false)[0];

//         const propsToUpdate = {
//             description: "updated description",
//         };

//         const preFunc = (entity: SubtenantTrustedCertificate) => {
//             entity.accountId = myAccount.id;
//             return entity;
//         };

//         const crudTest = new CrudTest<SubtenantTrustedCertificate>(SubtenantTrustedCertificate, {
//             list: false,
//             firstObj: trustedCertificate,
//             preGetFunc: preFunc,
//             objectInstance: trustedCertificate,
//             propsToUpdate: propsToUpdate,
//             update: true,
//         });
//         await crudTest.test();
//     });

//     it("should crud developer certificate", async () => {
//         const firstDevCert = await (await new TrustedCertificate().list().all()).filter(d => d.isDeveloperCertificate === true)[0].developerCertificateInfo();

//         const devCert = new DeveloperCertificate();
//         devCert.name = "Alex new dev cert";
//         devCert.description = "this is a new developer certificate";

//         const crudTest = new CrudTest<DeveloperCertificate>(DeveloperCertificate, {
//             list: false,
//             firstObj: firstDevCert,
//             objectInstance: devCert,
//             create: true,
//         });
//         await crudTest.test();
//     });
// });
