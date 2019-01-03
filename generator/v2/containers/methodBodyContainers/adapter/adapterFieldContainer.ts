import * as ejs from "ejs";
import { Container } from "../../container";

export class AdapterFieldContainer extends Container {

    public entityName: string;
    public apiName: string;

    constructor(entityName: string, apiName: string) {
        super();
        this.entityName = entityName;
        this.apiName = apiName;
    }
    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/methodBodyContainers/adapter/adapterField.ejs", {
            entityName: this.entityName,
            apiName: this.apiName
        });
    }

}
