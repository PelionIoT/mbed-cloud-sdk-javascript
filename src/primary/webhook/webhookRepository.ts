import { Repository } from "../../common";
import { Webhook } from "./webhook";
import { ConnectApi } from "../../legacy";
import { Config } from "../../common/config";

export class WebhookRepository extends Repository {

    private connectApi: ConnectApi;

    constructor(config: Config, connectApi?: ConnectApi) {
        super(config);

        this.connectApi = connectApi || new ConnectApi(config);
    }

    public async get(): Promise<Webhook> {
        return await this.connectApi.getWebhook();
    }

    public async update(webhook: Webhook): Promise<void> {
        await this.connectApi.updateWebhook(webhook.url, webhook.headers);
    }

    public async delete(): Promise<void> {
        await this.connectApi.deleteWebhook();
    }

}
