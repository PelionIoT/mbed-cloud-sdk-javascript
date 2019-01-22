
export class Instance<T> {
    public id: string;
    public createdAt: Date;
    public instance: T;

    constructor(instance: T) {
        this.instance = instance;
        this.id = this.uuidv4();
        this.createdAt = new Date();
    }

    public isValid(): boolean {
        return this.instance !== undefined;
    }

    private uuidv4(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
