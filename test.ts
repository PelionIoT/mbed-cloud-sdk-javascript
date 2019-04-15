import { DeviceEventsRepository } from "./src";

const repo = new DeviceEventsRepository();

repo.list({
    filter: {
        eventType: "update.device.device-created",
    }
}).executeForAll(e => console.log(e.eventType));
