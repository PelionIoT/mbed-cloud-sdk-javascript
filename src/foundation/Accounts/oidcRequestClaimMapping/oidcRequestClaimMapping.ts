import { Entity } from "../../../common/entity";
/**
 *OidcRequestClaimMapping
 */
export interface OidcRequestClaimMapping extends Entity {
    /**
     *Custom claim name for 'email'.
     *@example email_address
     */
    readonly email?: string;

    /**
     *Custom claim name for 'email_verified'.
     */
    readonly emailVerified?: string;

    /**
     *Custom claim name for 'family_name'.
     */
    readonly familyName?: string;

    /**
     *Custom claim name for 'given_name'.
     */
    readonly givenName?: string;

    /**
     *Custom claim name for 'name'.
     */
    readonly name?: string;

    /**
     *Custom claim name for 'phone_number'.
     */
    readonly phoneNumber?: string;

    /**
     *Custom claim name for 'sub'.
     */
    readonly sub?: string;

    /**
     *Custom claim name for 'updated_at'.
     */
    readonly updatedAt?: string;

    /**
     *Custom pattern for claim 'updated_at' as defined by the Java SimpleDateFormat class.
     *@example yyyy-MM-dd'T'HH:mm:ssXXX
     */
    readonly updatedAtPattern?: string;
}
