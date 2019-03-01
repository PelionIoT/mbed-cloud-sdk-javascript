import { websocketStatus } from "../types";

export class Websocket {
    public status?: websocketStatus;
    public channelId?: string;
    public queueSize?: number;
}
