import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";
import { AdapterFieldContainer } from "./adapterFieldContainer";
import { AdapterMapperContainer } from "./adapterMapperContainer";

export class AdapterMethodBody extends MethodBodyContainer {

    public returns: string;
    public discriminator: string;
    public enclosingClass: string;
    public mapperMethods: Array<AdapterMapperContainer>;
    public fields: Array<AdapterFieldContainer>;

    constructor(
        returns: string,
        discriminator: string,
        enclosingClass: string,
        options: {
            fields?: AdapterFieldContainer | Array<AdapterFieldContainer>,
            mapperMethods?: AdapterMapperContainer | Array<AdapterMapperContainer>
        }) {
        super();
        this.returns = returns;
        this.discriminator = discriminator;
        this.enclosingClass = enclosingClass;

        options = options || {};

        this.fields = [];
        if (options.fields) {
            if (options.fields instanceof Array) {
                this.fields = options.fields;
            } else {
                this.fields.push(options.fields);
            }
        }

        this.mapperMethods = [];
        if (options.mapperMethods) {
            if (options.mapperMethods instanceof Array) {
                this.mapperMethods = options.mapperMethods;
            } else {
                this.mapperMethods.push(options.mapperMethods);
            }
        }
    }

    public addField(fields: AdapterFieldContainer | Array<AdapterFieldContainer>): void {
        if (fields instanceof Array) {
            this.fields = this.fields.concat(fields);
        } else {
            this.fields.push(fields);
        }
    }

    public getFields(): Promise<Array<string>> {
        return Promise.all(this.fields.map(async f => f.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/adapter/adapter.ejs", {
            returns: this.returns,
            discriminator: this.discriminator,
            enclosingClass: this.enclosingClass,
            fields: this.fields ? await this.getFields() : ""
        });
    }

}
