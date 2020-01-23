import { Entity } from "../../../common/entity";
import { LoginProfileType } from "./types";
/**
 *LoginProfile
 */
export interface LoginProfile extends Entity {
    /**
     *The ID of the user in the identity provider's service.
     */
    readonly foreignId?: string;

    /**
     *Identity provider type.
     */
    readonly loginProfileType?: LoginProfileType;

    /**
     *Name of the identity provider.
     */
    name?: string;
}
