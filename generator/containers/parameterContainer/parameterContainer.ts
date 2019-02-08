import * as ejs from "ejs";
import { Container } from "../container";

export class ParameterContainer extends Container {

    public name: string;
    public type: string;
    public isRequired: boolean;
    public defaultValue: string;
    public position: number;

    constructor(name: string, type: string, options?: { isRequired?: boolean, defaultValue?: string, position?: number }) {
        super();
        this.name = name;
        this.type = type;

        options = options || {};
        const { isRequired, defaultValue, position } = options;
        this.isRequired = isRequired !== false;
        this.defaultValue = defaultValue;
        this.position = position;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/parameterContainer/parameter.ejs", { parameter: this });
    }

}
