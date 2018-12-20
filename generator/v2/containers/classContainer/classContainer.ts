import * as ejs from "ejs";
import { Container } from "../container";
import { PropertyContainer } from "../propertyContainer/propertyContainer";
import { Modifiers } from "../../common/types";

export class ClassContainer extends Container {
    public name: string;
    public description: string;
    public modifier: Modifiers;
    public extendsClass: string;
    public implementsClasses: Array<string>;
    public isInterface: boolean;
    public properties: Array<PropertyContainer>;

    constructor(name: string, options?: { description?: string, modifier?: Modifiers, extendsClass?: string, implementsClasses?: Array<string>, isInterface?: boolean}) {
        super();
        this.name = name;
        options = options || {};
        const { description, modifier, extendsClass, implementsClasses, isInterface } = options;
        this.description = description || this.name;
        this.modifier = modifier || "public";
        this.extendsClass = extendsClass;
        this.implementsClasses = implementsClasses || [];
        this.isInterface = isInterface || false;

        this.properties = [];
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/classContainer/class.ejs", { classContainer: this, properties: this.properties.map(p => p.render()) });
    }
}
