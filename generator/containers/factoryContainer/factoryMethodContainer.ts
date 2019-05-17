import * as ejs from "ejs";
import { Container } from "../container";

export class FactoryMethodContainer extends Container {

    public camelKey: string;
    public pascalKey: string;

    constructor(camelKey: string, pascalKey: string) {
        super();
        this.camelKey = camelKey;
        this.pascalKey = pascalKey;
    }
    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/factoryContainer/factoryMethod.ejs", {
            camelKey: this.camelKey,
            pascalKey: this.pascalKey,
        });
    }

}
