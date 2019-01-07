import * as ejs from "ejs";
import { MethodBodyContainer } from "../methodBodyContainer";
import { AdapterFieldContainer } from "./adapterFieldContainer";
import { AdapterMapperContainer } from "./adapterMapperContainer";
import { AdapterCustomFunctionCallContainer } from "./adapterCustomFunctionCallContainer";

export class AdapterMethodBody extends MethodBodyContainer {

    public returns: string;
    public discriminator: string;
    public enclosingClass: string;
    public mapperMethods: Array<AdapterMapperContainer>;
    public fields: Array<AdapterFieldContainer>;
    public customFunctionCalls: Array<AdapterCustomFunctionCallContainer>;

    constructor(
        returns: string,
        discriminator: string,
        enclosingClass: string,
        options: {
            fields?: AdapterFieldContainer | Array<AdapterFieldContainer>,
            mapperMethods?: AdapterMapperContainer | Array<AdapterMapperContainer>,
            customFunctionCalls?: Array<AdapterCustomFunctionCallContainer>
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

        this.customFunctionCalls = [];
        if (options.customFunctionCalls) {
            if (options.customFunctionCalls instanceof Array) {
                this.customFunctionCalls = options.customFunctionCalls;
            } else {
                this.customFunctionCalls.push(options.customFunctionCalls);
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

    public addMapper(mapper: AdapterMapperContainer | Array<AdapterMapperContainer>): void {
        if (mapper instanceof Array) {
            this.mapperMethods = this.mapperMethods.concat(mapper);
        } else {
            this.mapperMethods.push(mapper);
        }
    }

    public addCustomFunctionCall(customCall: AdapterCustomFunctionCallContainer | Array<AdapterCustomFunctionCallContainer>): void {
        if (customCall instanceof Array) {
            this.customFunctionCalls = this.customFunctionCalls.concat(customCall);
        } else {
            this.customFunctionCalls.push(customCall);
        }
    }

    public getFields(): Promise<Array<string>> {
        return Promise.all(this.fields.map(async f => f.render()));
    }

    public getMappers(): Promise<Array<string>> {
        return Promise.all(this.mapperMethods.map(async m => m.render()));
    }

    public getCustomFunctionCalls(): Promise<Array<string>> {
        return Promise.all(this.customFunctionCalls.map(async c => c.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/adapter/adapter.ejs", {
            returns: this.returns,
            discriminator: this.discriminator,
            enclosingClass: this.enclosingClass,
            fields: this.fields ? await this.getFields() : "",
            mapperMethods: this.mapperMethods ? await this.getMappers() : "",
            customFunctionCalls: this.customFunctionCalls ? await this.getCustomFunctionCalls() : ""
        });
    }

}
