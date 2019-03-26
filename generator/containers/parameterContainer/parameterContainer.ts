import * as ejs from "ejs";
import { Container } from "../container";

export class ParameterContainer extends Container {

    public name: string;
    public type: string;
    public description: string;
    public isRequired: boolean;
    public defaultValue: string;
    public position: number;

    constructor(name: string, type: string, options?: { isRequired?: boolean, defaultValue?: string, position?: number, description?: string }) {
        super();
        this.name = name;
        this.type = type;

        options = options || {};
        const { isRequired, defaultValue, position, description } = options;
        this.isRequired = isRequired !== false;
        this.defaultValue = defaultValue;
        this.position = position;
        this.description = description || name;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/parameterContainer/parameter.ejs", { parameter: this });
    }

}
