import { Repository } from "../../common/repository";
import ConnectApi from "../../legacy/connect";
import { Config } from "../../common/config";
import { Resource } from "./resource";

export class ResourceRepository extends Repository {
    private connectApi: ConnectApi;

    constructor(config: Config, connectApi?: ConnectApi) {
        super(config);

        this.connectApi = connectApi || new ConnectApi(config);
    }

    public read(): Resource {
        return null;
    }

    public update(): Resource {
        return null;
    }

    public execute(): Resource {
        return null;
    }
}
