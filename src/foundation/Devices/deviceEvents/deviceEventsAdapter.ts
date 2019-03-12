import { Adapter } from "../../../common/adapter";
import { DeviceEvents } from "./deviceEvents";
/**
 *DeviceEvents adapter
 */
export class DeviceEventsAdapter extends Adapter {
    /**
     * fromApi
     * @returns DeviceEvents
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): DeviceEvents {
        if (!data) {
            return null;
        }
        const mappedEntity = DeviceEventsAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_EVENTS",
            changes: data.changes,
            createdAt: data.created_at,
            data: data.data,
            dateTime: data.date_time,
            description: data.description,
            deviceId: data.device_id,
            eventType: data.event_type,
            eventTypeCategory: data.event_type_category,
            eventTypeDescription: data.event_type_description,
            id: data.id,
            stateChange: data.state_change,
        });
        return mappedEntity;
    }
}
