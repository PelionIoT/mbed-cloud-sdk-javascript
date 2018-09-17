import { EntityBase } from "../../../common/entityBase";

/**
 * Login History
 */
export class LoginHistory extends EntityBase {
    /**
     * Date of login
     */
    public readonly date?: Date;
    /**
     * User agent used for login
     */
    public readonly userAgent?: string;
    /**
     * IP Address login from
     */
    public readonly ipAddress?: string;
    /**
     * Whether login was successful
     */
    public readonly successssssssss?: boolean;

    // tslint:disable-next-line:member-ordering
    public renames: { [key: string]: string } = {
        success: "successssssssss",
    };
}
