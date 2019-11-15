import { TlvDataType } from "../../..";

export interface Resource {
    /**
     * Related device ID
     */
    readonly deviceId?: string;
    /**
     * Resource's URL
     */
    readonly path?: string;
    /**
     * Resource's type
     */
    readonly type?: TlvDataType;
    /**
     * The content type of the resource
     */
    readonly contentType?: string;
    /**
     * Whether you can subscribe to changes for this resource
     */
    readonly observable?: boolean;
}
