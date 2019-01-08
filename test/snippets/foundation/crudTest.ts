// import { Config } from "../../../src/sdk";

// /* tslint:disable: no-console */
// /* tslint:disable: no-string-literal */
// export class CrudTest<T, U> {
//     private list: boolean;
//     private get: boolean;
//     private create: boolean;
//     private update: boolean;
//     private firstObj: U;
//     private objectInstance: U;
//     private propsToUpdate: { [prop: string]: any };
//     private commonProperty: string;
//     private expectedFails: Array<number>;
//     private preListFunc?: (entity: T) => T;
//     private preGetFunc?: (entity: T) => T;
//     private preCreateFunc?: (entity: T) => T;
//     private preUpdateFunc?: (entity: T) => T;
//     constructor(
//         private context: { new(config: Config): T },
//         private config: Config,
//         private options?: {
//             preListFunc?: (entity: T) => T,
//             preGetFunc?: (entity: T) => T,
//             preCreateFunc?: (entity: T) => T,
//             preUpdateFunc?: (entity: T) => T,
//             expectedFails?: Array<number>,
//             commonProperty?: string,
//             propsToUpdate?: { [prop: string]: any },
//             objectInstance?: U,
//             firstObj?: U,
//             list?: boolean,
//             get?: boolean,
//             create?: boolean,
//             update?: boolean
//         }
//     ) {
//         options = options || {};
//         this.preListFunc = options.preListFunc;
//         this.preGetFunc = options.preGetFunc;
//         this.preCreateFunc = options.preCreateFunc;
//         this.preUpdateFunc = options.preUpdateFunc;
//         this.list = options.list;
//         this.get = options.get;
//         this.create = options.create;
//         this.update = options.update;
//         this.expectedFails = options.expectedFails || [];
//         this.commonProperty = options.commonProperty || "createdAt";
//         this.propsToUpdate = options.propsToUpdate;
//         this.objectInstance = options.objectInstance;
//         this.firstObj = options.firstObj;
//         if (options.list === undefined) {
//             this.list = true;
//         }
//         if (options.get === undefined) {
//             this.get = true;
//         }
//     }

//     /**
//      * test
//      */
//     public async test() {
//         try {
//             if (this.list) {
//                 const context = new this.context(this.config);

//                 if (this.preListFunc) {
//                     this.options.preListFunc(context);
//                 }

//                 const first = await context["list"]()["first"]();

//                 if (!first) {
//                     console.warn("no items retrieved!");
//                     return;
//                 }

//                 // expect(first).toBeInstanceOf(this.type);

//                 this.firstObj = first;
//             }

//             if (this.get) {
//                 const context = new this.context(this.config);

//                 if (this.preGetFunc) {
//                     this.options.preGetFunc(context);
//                 }

//                 const gotEntity = await context["get"](this.firstObj["id"]);

//                 expect(gotEntity[this.commonProperty]).toEqual(this.firstObj[this.commonProperty]);
//             }

//             if (this.create) {
//                 const context = new this.context(this.config);
//                 // if (this.preCreateFunc) {
//                 //     this.options.preGetFunc(this.objectInstance);
//                 // }

//                 await context["create"](this.objectInstance);
//                 expect(this.objectInstance["createdAt"]).not.toBeUndefined();
//             }

//             if (this.update) {
//                 const context = new this.context(this.config);
//                 // if (this.preUpdateFunc) {
//                 //     this.options.preGetFunc(this.objectInstance);
//                 // }

//                 for (const key in this.propsToUpdate) {
//                     if (this.propsToUpdate.hasOwnProperty(key)) {
//                         const element = this.propsToUpdate[key];
//                         this.objectInstance[key] = element;
//                     }
//                 }

//                 await context["update"](this.objectInstance["id"], this.objectInstance);

//                 for (const key in this.propsToUpdate) {
//                     if (this.propsToUpdate.hasOwnProperty(key)) {
//                         const updatedProp = this.objectInstance[key];
//                         expect(updatedProp).not.toBeUndefined();
//                     }
//                 }
//             }

//             if (this.create) {
//                 const context = new this.context(this.config);
//                 await context["delete"](this.objectInstance["id"]);
//             }
//         } catch (e) {
//             if (e.details && this.expectedFails.indexOf(e.details.code) > -1) {
//                 return;
//             }
//             console.log(e);
//             throw e;
//         }
//     }
// }

// // probably a better way of doing this but to use expect jest needs to see a test in the file
// describe("shut jest up", () => {
//     it("should shut jest up", () => {
//         expect(true).toBeTruthy();
//     });
// });
