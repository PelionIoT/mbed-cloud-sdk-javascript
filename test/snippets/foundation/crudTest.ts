/* tslint:disable: no-console */
/* tslint:disable: no-string-literal */
export class CrudTest<T> {
    private list: boolean;
    private get: boolean;
    private create: boolean;
    private update: boolean;
    private firstObj: T;
    private objectInstance: T;
    private propsToUpdate: { [prop: string]: any };
    private commonProperty: string;
    private expectedFails: Array<number>;
    private preListFunc?: (entity: T) => T;
    private preGetFunc?: (entity: T) => T;
    private preCreateFunc?: (entity: T) => T;
    private preUpdateFunc?: (entity: T) => T;
    constructor(
        private type: { new(): T },
        private options?: {
            preListFunc?: (entity: T) => T,
            preGetFunc?: (entity: T) => T,
            preCreateFunc?: (entity: T) => T,
            preUpdateFunc?: (entity: T) => T,
            expectedFails?: Array<number>,
            commonProperty?: string,
            propsToUpdate?: { [prop: string]: any },
            objectInstance?: T,
            firstObj?: T,
            list?: boolean,
            get?: boolean,
            create?: boolean,
            update?: boolean
        }
    ) {
        options = options || {};
        this.preListFunc = options.preListFunc;
        this.preGetFunc = options.preGetFunc;
        this.preCreateFunc = options.preCreateFunc;
        this.preUpdateFunc = options.preUpdateFunc;
        this.list = options.list;
        this.get = options.get;
        this.create = options.create;
        this.update = options.update;
        this.expectedFails = options.expectedFails || [];
        this.commonProperty = options.commonProperty || "createdAt";
        this.propsToUpdate = options.propsToUpdate;
        this.objectInstance = options.objectInstance;
        this.firstObj = options.firstObj;
        if (options.list === undefined) {
            this.list = true;
        }
        if (options.get === undefined) {
            this.get = true;
        }
    }

    /**
     * test
     */
    public async test() {
        try {
            if (this.list) {
                const entity = new this.type();

                if (this.preListFunc) {
                    this.options.preListFunc(entity);
                }

                const first = await entity["list"]()["first"]();

                if (!first) {
                    console.warn("no items retrieved!");
                    return;
                }

                expect(first).toBeInstanceOf(this.type);

                this.firstObj = first;
            }

            if (this.get) {
                const gotEntity = new this.type();

                if (this.preGetFunc) {
                    this.options.preGetFunc(gotEntity);
                }

                gotEntity["id"] = this.firstObj["id"];
                await gotEntity["get"]();

                expect(gotEntity[this.commonProperty]).toEqual(this.firstObj[this.commonProperty]);
            }

            if (this.create) {
                if (this.preCreateFunc) {
                    this.options.preGetFunc(this.objectInstance);
                }

                await this.objectInstance["create"]();
                expect(this.objectInstance["createdAt"]).not.toBeUndefined();
            }

            if (this.update) {
                if (this.preUpdateFunc) {
                    this.options.preGetFunc(this.objectInstance);
                }

                for (const key in this.propsToUpdate) {
                    if (this.propsToUpdate.hasOwnProperty(key)) {
                        const element = this.propsToUpdate[key];
                        this.objectInstance[key] = element;
                    }
                }

                await this.objectInstance["update"]();

                for (const key in this.propsToUpdate) {
                    if (this.propsToUpdate.hasOwnProperty(key)) {
                        const updatedProp = this.objectInstance[key];
                        expect(updatedProp).not.toBeUndefined();
                    }
                }
            }

            if (this.create) {
                await this.objectInstance["delete"]();
            }
        } catch (e) {
            if (e.details && this.expectedFails.indexOf(e.details.code) > -1) {
                return;
            }
            console.log(e);
            throw e;
        }
    }
}

// probably a better way of doing this but to use expect jest needs to see a test in the file
describe("shut jest up", () => {
    it("should shut jest up", () => {
        expect(true).toBeTruthy();
    });
});
