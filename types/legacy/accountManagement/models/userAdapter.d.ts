import { UserInfoReq as apiUserAdd, UserUpdateReq as apiUserUpdate, UserInfoResp as apiUser } from "../../_api/iam";
import { AddUserObject, UpdateUserObject } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { User } from "./user";
/**
 * User Adapter
 */
export declare class UserAdapter {
    static map(from: apiUser, api: AccountManagementApi): User;
    static addMap(from: AddUserObject): apiUserAdd;
    static updateMap(from: UpdateUserObject): apiUserUpdate;
}
