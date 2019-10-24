import { Config } from "./common/config";
import { Factory } from "./foundation";
import { Client } from "./client/client";
import { Subscribe } from "./primary/subscribe/subscribe";
import { ConnectApi } from "./legacy";
import { ResourceRepository } from "./primary/resource/resourceRepository";
import { NotificationsRepository } from "./primary/notifications/notifications";

/**
 * Top level Sdk instance
 */
export class SDK {
    private _subscribe: Subscribe;
    private _resourceRepository: ResourceRepository;
    private _notificationRepository: NotificationsRepository;
    /**
     * The configuration for the Sdk
     */
    public readonly config: Config;

    /**
     * The client instance of the Sdk
     */
    public readonly client: Client;

    /**
     * The legacy connect api class. Please access functionality through top level methods provided
     */
    public readonly connectApi: ConnectApi;

    /**
     * @deprecated please use sdk.entities instead
     * Get a new instance of a foundation repository, instantiated with the Sdk configuration.
     */
    public foundation: () => Factory;

    /**
     * Get a new instance of a repository, instantiated with the Sdk configuration.
     */
    public entities: () => Factory;

    public notify: () => void;

    public unsubscribeAll: () => void;
    /**
     * Initalise a new instance of the Sdk class
     * @param config The configuration
     * @param client The client instance
     */
    constructor(config?: Config, client?: Client) {
        if (config && config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }

        this.foundation = () => new Factory(this.config);
        this.entities = this.foundation;

        this.connectApi = new ConnectApi(config);

        this.client = client || new Client(this.config);
    }

    public subscribe(): Subscribe {
        return this._subscribe;
    }

    public resource(): ResourceRepository {
        return this._resourceRepository;
    }

    public notifications(): NotificationsRepository {
        return this._notificationRepository;
    }
}
