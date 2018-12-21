import * as ejs from "ejs";
import { Container } from "../container";
import { PropertyContainer } from "../propertyContainer/propertyContainer";

export class ClassContainer extends Container {
    public name: string;
    public description: string;
    public extendsClass: Array<string>;
    public implementsClasses: Array<string>;
    public isAbstract: boolean;
    public isInterface: boolean;
    public properties: Array<PropertyContainer>;

    constructor(name: string, options?: { description?: string, isAbstract?: boolean, extendsClass?: string | Array<string>, implementsClasses?: Array<string>, isInterface?: boolean}) {
        super();
        this.name = name;
        options = options || {};
        const { description, extendsClass, isAbstract, implementsClasses, isInterface } = options;
        this.isAbstract = isAbstract || false;
        this.description = description || this.name;
        this.extendsClass = extendsClass instanceof Array ? extendsClass : extendsClass ? [ extendsClass ] : [];
        this.implementsClasses = implementsClasses || [];
        this.isInterface = isInterface || false;

        this.properties = [];
    }

    public addProperty(property: PropertyContainer | Array<PropertyContainer>): void {
        if (property instanceof Array) {
            this.properties.concat(property);
        } else {
            this.properties.push(property);
        }
    }

    public getProperties(): Promise<Array<string>> {
        return Promise.all(this.properties.map(async p => p.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/classContainer/class.ejs", { classContainer: this, properties: await this.getProperties() });
    }
}
