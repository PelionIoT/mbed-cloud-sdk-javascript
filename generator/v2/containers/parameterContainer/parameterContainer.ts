import * as ejs from "ejs";
import { Container } from "../container";

export class ParameterContainer extends Container {

    public name: string;
    public type: string;
    public isRequired: boolean;
    public defaultValue: string;

    constructor(name: string, type: string, options?: { isRequired?: boolean, defaultValue?: string }) {
        super();
        this.name = name;
        this.type = type;

        options = options || {};
        const { isRequired, defaultValue } = options;
        this.isRequired = isRequired !== false;
        this.defaultValue = defaultValue;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/parameterContainer/parameter.ejs", { parameter: this });
    }

}
