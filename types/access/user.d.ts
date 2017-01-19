import { UserType } from "./types";
import { UserInfoResp as apiUser } from "../_api/iam";
export declare class User {
    constructor(options: UserType);
    static map(from: apiUser): User;
}
export interface User extends UserType {
}
