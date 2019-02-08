import { SDK } from "../../../src";
import { Repository } from "../../../src/sdk/common/repository";

/**
 * Instance class. Can derrive from Repository or SDK
 */
export class Instance<T extends Repository | SDK> {
    /**
     * The id of the instance
     */
    public id: string;

    /**
     * Time this instance was created
     */
    public createdAt: Date;

    /**
     * The object held in the instance
     */
    public instance: T;

    constructor(instance: T) {
        this.instance = instance;
        this.id = this.uuidv4();
        this.createdAt = new Date();
    }

    /**
     * True if there is an instance object
     */
    public isValid(): boolean {
        return this.instance !== undefined;
    }

    /**
     * Generate a UUID
     */
    private uuidv4(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
