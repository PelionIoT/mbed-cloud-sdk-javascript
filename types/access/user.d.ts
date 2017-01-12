import { Api } from "./api";
export interface UserOptions {
    account_id: string;
    status: string;
    username: string;
    full_name: string;
    id: string;
}
export declare class User {
    private _api;
    constructor(_api: Api, options: UserOptions);
}
export interface User extends UserOptions {
}
