import { Container } from "../container";

export class MethodBodyContainer extends Container {
    public async render(): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
