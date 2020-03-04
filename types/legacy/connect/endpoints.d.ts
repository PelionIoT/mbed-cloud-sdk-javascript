import { ConfigOptions } from "../../common/config";
import { DeviceRequestsApi, EndpointsApi, NotificationsApi, ResourcesApi, SubscriptionsApi } from "../_api/mds";
import { AccountApi, StatisticsApi } from "../_api/statistics";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    endpoints: EndpointsApi;
    deviceRequests: DeviceRequestsApi;
    notifications: NotificationsApi;
    resources: ResourcesApi;
    subscriptions: SubscriptionsApi;
    account: AccountApi;
    statistics: StatisticsApi;
    constructor(options?: ConfigOptions);
}
