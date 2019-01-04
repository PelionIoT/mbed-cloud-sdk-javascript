import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEvents } from "./deviceEvents";
/**
 *DeviceEvents repository
 */
export class DeviceEventsRepository extends Repository {
    public get(id: string): Promise<DeviceEvents> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-events/{device_event_id}/",
                        method: "GET",
                        pathParams: {
                            device_event_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
