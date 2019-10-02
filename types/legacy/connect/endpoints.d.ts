import { ConnectionOptions } from "../common/interfaces";
import { AccountApi, StatisticsApi } from "../_api/statistics";
import { EndpointsBase } from "../common/endpointsBase";
import { DeviceRequestsApi, EndpointsApi, NotificationsApi, ResourcesApi, SubscriptionsApi } from "../_api/mds";
export declare class Endpoints extends EndpointsBase {
    endpoints: EndpointsApi;
    deviceRequests: DeviceRequestsApi;
    notifications: NotificationsApi;
    resources: ResourcesApi;
    subscriptions: SubscriptionsApi;
    account: AccountApi;
    statistics: StatisticsApi;
    constructor(options?: ConnectionOptions);
}
