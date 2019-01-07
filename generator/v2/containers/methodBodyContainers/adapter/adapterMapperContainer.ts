import * as ejs from "ejs";
import { Container } from "../../container";

export class AdapterMapperContainer extends Container {

    public from: string;
    public to: string;
    public toAdapter: string;

    constructor(from: string, to: string, toAdapter: string) {
        super();
        this.from = from;
        this.to = to;
        this.toAdapter = toAdapter;
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/adapter/adapterMapper.ejs", {
            from: this.from,
            to: this.to,
            toAdapter: this.toAdapter,
        });
    }

}
