import * as ejs from "ejs";
import { Container } from "../container";
import { ParameterContainer } from "../parameterContainer/parameterContainer";

export class ParameterBucketContainer extends Container {

    public name: string;
    public parameters: Array<ParameterContainer>;

    constructor(name: string, parameters?: ParameterContainer | Array<ParameterContainer>) {
        super();
        this.name = name;
        if (parameters) {
            if (parameters instanceof Array) {
                this.parameters = parameters;
            } else {
                this.parameters = [ parameters ];
            }
        } else {
            this.parameters = [];
        }
    }

    public getParameters(): Promise<Array<string>> {
        return Promise.all(this.parameters.map(async p => p.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/parameterBucketContainer/parameterBucket.ejs", { name: this.name, parameters: await this.getParameters() });
    }

}
