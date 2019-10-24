import { AsyncIDResponse, EndpointData, ResourcesData, NotificationData as MdsNotificationData, NotificationMessage as MdsNotificationMessage } from "../../legacy/_api/mds";
import { TlvValue } from "../../common/tlv";

export interface NotificationMessage {
    notifications?: Array<NotificationData>;
    registrations?: Array<DeviceData>;
    registrationUpdates?: Array<DeviceData>;
    deRegistrations?: Array<string>;
    registrationsExpired?: Array<string>;
    asyncResponses?: Array<AsyncResponse>;
}

export const notificationMessageAdapter = (from: MdsNotificationMessage): NotificationMessage => {
    return {
        notifications: from.notifications.map(n => notificationDataAdapter(n)),
        registrations: from.registrations.map(r => deviceDataAdapter(r)),
        registrationUpdates: from["reg-updates"].map(r => deviceDataAdapter(r)),
        deRegistrations: from["de-registrations"],
        registrationsExpired: from["registrations-expired"],
        asyncResponses: from["async-responses"].map(a => asyncResponseAdapter(a)),
    };
};

export interface NotificationData {
    deviceId?: string;
    path?: string;
    contentType?: string;
    payload?: string | number | IterableIterator<TlvValue>;
    maxAge?: string;
}

export const notificationDataAdapter = (from: MdsNotificationData): NotificationData => {
    return {
        deviceId: from.ep,
        path: from.path,
        contentType: from.ct,
        payload: from.payload,
        maxAge: from["max-age"],
    };
};

export interface DeviceData {
    deviceId?: string;
    endpointType?: string;
    queueMode?: boolean;
    resources?: Array<ResourceData>;
}

export const deviceDataAdapter = (from: EndpointData): DeviceData => {
    return {
        deviceId: from.ep,
        endpointType: from.ept,
        queueMode: from.q,
        resources: from.resources.map(r => resourceDataAdapter(r)),
    };
};

export interface ResourceData {
    path?: string;
    interfaceDescription?: string;
    resourceType?: string;
    contentType?: string;
    observable?: boolean;
}

export const resourceDataAdapter = (from: ResourcesData): ResourceData => {
    return {
        path: from.path,
        interfaceDescription: from.if,
        resourceType: from.rt,
        contentType: from.ct,
        observable: from.obs,
    };
};

export interface AsyncResponse {
    id?: string;
    status?: AsyncResponseStatus;
    error?: string;
    payload?: string;
    contentType?: string;
    maxAge?: string;
}

export const asyncResponseAdapter = (from: AsyncIDResponse): AsyncResponse => {
    return {
        id: from.id,
        status: from.status,
        error: from.error,
        payload: from.payload,
        contentType: from.ct,
        maxAge: from["max-age"],
    };
};

export enum AsyncResponseStatus {
    SUCCEEDED = 200,
    NOT_FOUND = 404,
    PRECONDITION_FAILED = 412,
    ENTITY_TOO_LARGE = 413,
    UNSUPORTED_MEDIA = 415,
    REQUEST_EXPIRED = 429,
    REQUEST_FAILED = 502,
    NOT_CONNECTED = 503,
    TIMEOUT = 504,
}
