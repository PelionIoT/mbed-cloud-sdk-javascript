import * as ejs from "ejs";
import { Container } from "../container";

export class FileContainer extends Container {
    public containers: Array<Container>;

    constructor(container?: Container | Array<Container>) {
        super();

        if (container) {
            if (container instanceof Array) {
                this.containers = container;
            } else {
                this.containers = [ container ];
            }
        } else {
            this.containers = [];
        }
    }

    public addContainer(container: Container | Array<Container>): void {
        if (container instanceof Array) {
            this.containers = this.containers.concat(container);
        } else {
            this.containers.push(container);
        }
    }

    public getContainers(): Promise<Array<string>> {
        return Promise.all(this.containers.map(async c => c.render()));
    }

    public async render(): Promise<string> {
        return await ejs.renderFile<string>("generator/v2/containers/fileContainer/fileContainer.ejs", { containers: await this.getContainers() });
    }
}
