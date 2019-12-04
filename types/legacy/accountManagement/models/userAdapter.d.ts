import { UserInfoReq as apiUserAdd, UserInfoResp as apiUser, UserUpdateReq as apiUserUpdate } from "../../_api/iam";
import { AccountManagementApi } from "../accountManagementApi";
import { AddUserObject, UpdateUserObject } from "../types";
import { User } from "./user";
/**
 * User Adapter
 */
export declare class UserAdapter {
    static map(from: apiUser, api: AccountManagementApi): User;
    static addMap(from: AddUserObject): apiUserAdd;
    static updateMap(from: UpdateUserObject): apiUserUpdate;
}
