import * as ejs from "ejs";
import { Container } from "../../container";

export class AdapterFieldContainer extends Container {

    public entityName: string;
    public apiName: string;
    public mapsForeignKeyArray: boolean;
    public mapsForeignKey: boolean;
    public foreignKeyAdapter: string;
    public defaultValue: unknown;

    constructor(entityName: string, apiName: string, options?: { mapsForeignKeyArray?: boolean, mapsForeignKey?: boolean, foreignKeyAdapter?: string, defaultValue?: unknown}) {
        super();
        this.entityName = entityName;
        this.apiName = apiName;

        options = options || {};
        this.mapsForeignKeyArray = options.mapsForeignKeyArray || false;
        this.mapsForeignKey = options.mapsForeignKey || false;
        this.foreignKeyAdapter = options.foreignKeyAdapter;
        this.defaultValue = options.defaultValue;
    }
    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/containers/methodBodyContainers/adapter/adapterField.ejs", {
            entityName: this.entityName,
            apiName: this.apiName,
            mapsForeignKeyArray: this.mapsForeignKeyArray,
            mapsForeignKey: this.mapsForeignKey,
            foreignKeyAdapter: this.foreignKeyAdapter,
            defaultValue: this.defaultValue,
        });
    }

}
