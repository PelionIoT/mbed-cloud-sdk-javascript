import * as ejs from "ejs";
import { Container } from "../container";
import { Field, Method } from "../../../src/schema/types";

export class SchemaContainer extends Container {
    public pascalKey: string;
    public fields: Array<Field>;
    public methods: Array<Method>;
    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/schemaContainer/schema.ejs", { key: this.key, pascalKey: this.pascalKey, fields: this.fields, methods: this.methods });
    }
}
