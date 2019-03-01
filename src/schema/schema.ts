import { Field, Method } from "./types";

export class Schema {
    public name: string;
    public fields: Array<Field>;
    public methods: Array<Method>;

    public getMethod(name: string): Method {
        return this.methods.filter(m => m.name === name).pop();
    }

    public getMethods(): Array<string> {
        return this.methods.map(m => m.name);
    }

    public doesMethodExist(name: string): boolean {
        return this.methods.some(m => m.name === name);
    }
}
