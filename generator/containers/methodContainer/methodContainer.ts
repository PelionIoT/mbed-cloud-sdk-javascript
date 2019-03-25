import * as ejs from "ejs";
import { Container } from "../container";
import { Modifiers } from "../../common/types";
import { ParameterListContainer } from "../parameterListContainer/parameterListContainer";
import { MethodBodyContainer } from "../methodBodyContainers/methodBodyContainer";

export class MethodContainer extends Container {

    public name: string;
    public modifier: Modifiers;
    public parameterList: ParameterListContainer;
    public returns: string;
    public promise: boolean;
    public methodBody: MethodBodyContainer;
    public isStatic: boolean;

    constructor(name: string, options?: {
        modifier?: Modifiers,
        parameterList?: ParameterListContainer,
        returns?: string,
        promise?: boolean
        methodBody?: MethodBodyContainer,
        isStatic?: boolean,
    }) {
        super();
        this.name = name;

        options = options || {};
        const { parameterList, returns, modifier, methodBody, isStatic, promise } = options;
        this.promise = promise || false;
        this.modifier = modifier || "public";
        this.returns = returns ? this.promise ? `Promise<${returns}>` : returns : "void";
        this.parameterList = parameterList;
        this.methodBody = methodBody;
        this.isStatic = isStatic || false;
    }
    public async render(): Promise<string> {
        const parameterList = this.parameterList ? await this.parameterList.render() : "";
        return await ejs.renderFile<string>("generator/containers/methodContainer/method.ejs", {
            name: this.name,
            modifier: this.modifier,
            isStatic: this.isStatic,
            params: this.parameterList ? this.parameterList.parameters : [],
            returns: this.returns, parameterList,
            methodBody: this.methodBody ? await this.methodBody.render() : ""
        });
    }

}
