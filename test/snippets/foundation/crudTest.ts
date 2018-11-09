import { CrudEntity } from "../../../src/sdk/common/crudEntity";

export class CrudTest<T extends CrudEntity<T>> {
    constructor(
        private type: { new(): T },
        private commonProperty: string = "createdAt",
        private options?: {
            preListFunc?: (entity: T) => T,
            preGetFunc?: (entity: T) => T,
            expectedFails?: Array<number>
        }
    ) {
    }

    /**
     * test
     */
    public async test() {
        try {
            const entity = new this.type();

            if (this.options && this.options.preListFunc) {
                this.options.preListFunc(entity);
            }

            const first = await entity.list().first();

            if (!first) {
                // tslint:disable-next-line:no-console
                console.warn("no items retrieved!");
                return;
            }

            expect(first).toBeInstanceOf(this.type);

            const gotEntity = new this.type();

            if (this.options && this.options.preGetFunc) {
                this.options.preGetFunc(gotEntity);
            }

            gotEntity.id = first.id;
            await gotEntity.get();

            expect(gotEntity[this.commonProperty]).toEqual(first[this.commonProperty]);
        } catch (e) {
            if (e.details && this.options && this.options.expectedFails.indexOf(e.details.code) > -1) {
                return;
            }
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
