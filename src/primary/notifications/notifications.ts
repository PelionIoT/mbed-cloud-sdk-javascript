import { Repository } from "../../common";
import ConnectApi from "../../legacy/connect";
import { Config } from "../../common/config";
import { WebhookRepository } from "../webhook/webhookRepository";
import { NotificationObject } from "../../legacy/connect/types";

export class NotificationsRepository extends Repository {
    private connectApi: ConnectApi;

    constructor(config: Config, connectApi?: ConnectApi) {
        super(config);

        this.connectApi = connectApi || new ConnectApi(config);
    }

    public async start(): Promise<void> {
        await this.connectApi.startNotifications();
    }

    public async stop(): Promise<void> {
        await this.connectApi.stopNotifications();
    }

    public webhook(): WebhookRepository {
        return new WebhookRepository(this.config);
    }

    public notify(message: NotificationObject): void {
        this.connectApi.notify(message);
    }
}
