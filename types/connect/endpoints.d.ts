import { ConnectionOptions } from "../common/interfaces";
import { AccountApi, StatisticsApi } from "../_api/statistics";
import { DefaultApi as WebhookApi, EndpointsApi, NotificationsApi, ResourcesApi, SubscriptionsApi } from "../_api/mds";
export declare class Endpoints {
    webhooks: WebhookApi;
    endpoints: EndpointsApi;
    notifications: NotificationsApi;
    resources: ResourcesApi;
    subscriptions: SubscriptionsApi;
    account: AccountApi;
    statistics: StatisticsApi;
    constructor(options: ConnectionOptions);
}
