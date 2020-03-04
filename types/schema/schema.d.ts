import { Field, Method } from "./types";
export declare class Schema {
    name: string;
    fields: Array<Field>;
    methods: Array<Method>;
    getMethod(name: string): Method;
    getMethods(): Array<string>;
    doesMethodExist(name: string): boolean;
}
