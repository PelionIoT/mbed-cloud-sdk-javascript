import { Container } from "../container";
import { Modifiers } from "../../common/types";
import { ParameterListContainer } from "../parameterListContainer/parameterListContainer";

export class MethodContainer extends Container {

    public name: string;
    public modifier: Modifiers;
    public parameterList: ParameterListContainer;
    public returns: string;
    public render(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
