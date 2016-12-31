import { connectionOptions } from "../helpers/connectionOptions";
import { AccountAdminApi } from "../_api/iam";
/**
* Root Account object
*/
export declare class Access {
    private _apis;
    /**
    * @param options Options object
    */
    constructor(options: connectionOptions);
    getUsers(options?: Access.UsersOptions): Promise<Access.User[]>;
    getUsers(options?: Access.UsersOptions, callback?: (err: any, data?: Access.User[]) => void): any;
}
export declare namespace Access {
    class APIContainer {
        adAPI: AccountAdminApi;
        constructor(options: connectionOptions);
    }
    interface UsersOptions {
        limit?: number;
        order?: string;
        after?: string;
        include?: string;
        filter?: string;
    }
    interface UserOptions {
        account_id: string;
        status: string;
        username: string;
        full_name: string;
        id: string;
    }
    class User {
        private _apis;
        constructor(_apis: APIContainer, options: UserOptions);
    }
    interface User extends UserOptions {
    }
}
