import { Entity } from "../../../common/entity";
import { LoginProfileType } from "./types";
/**
 *LoginProfile
 */
export interface LoginProfile extends Entity {
    /**
     *Identity provider type.
     */
    readonly loginProfileType?: LoginProfileType;

    /**
     *Name of the identity provider.
     */
    name?: string;
}
