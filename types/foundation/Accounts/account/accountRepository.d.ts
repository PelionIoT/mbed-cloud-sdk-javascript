import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { SubtenantUser } from "../../index";
import { SubtenantDarkThemeColor } from "../../index";
import { SubtenantDarkThemeImage } from "../../index";
import { SubtenantLightThemeColor } from "../../index";
import { SubtenantApiKey } from "../../index";
import { SubtenantTrustedCertificate } from "../../index";
import { SubtenantUserInvitation } from "../../index";
import { SubtenantLightThemeImage } from "../../index";
import { Account } from "./account";
import { AccountUpdateRequest } from "./types";
import { AccountSubtenantTrustedCertificateListOptions } from "./types";
import { AccountListOptions } from "./types";
import { AccountSubtenantUserInvitationListOptions } from "./types";
import { AccountCreateRequest } from "./types";
import { AccountSubtenantApiKeyListOptions } from "./types";
import { AccountSubtenantUserListOptions } from "./types";
/**
 *Account repository
 */
export declare class AccountRepository extends Repository {
    /**
     * apiKeys
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    apiKeys(id: string, options?: AccountSubtenantApiKeyListOptions): Paginator<SubtenantApiKey, ListOptions>;
    /**
* create
* @param request - The entity to perform action on.
* @param action - Action, either `create` or `enroll`.
<ul>
<li>`create` creates the account where its admin user has ACTIVE status if `admin_password` was defined in the request, or RESET status if no `admin_password` was defined. If the user already exists, its status is not modified. </li>
<li>`enroll` creates the account where its admin user has ENROLLING status. If the user already exists, its status is not modified. Email to finish enrollment or notify the existing user about the new account is sent to the `admin_email` defined in the request. </li></ul>
*/
    create(request: AccountCreateRequest, action?: string): Promise<Account>;
    /**
     * darkThemeBrandingColors
     * @param id - The ID of the account.
     * @param options - options
     */
    darkThemeBrandingColors(id: string, options?: ListOptions): Paginator<SubtenantDarkThemeColor, ListOptions>;
    /**
     * darkThemeBrandingImages
     * @param id - The ID of the account.
     * @param options - options
     */
    darkThemeBrandingImages(id: string, options?: ListOptions): Paginator<SubtenantDarkThemeImage, ListOptions>;
    /**
     * lightThemeBrandingColors
     * @param id - The ID of the account.
     * @param options - options
     */
    lightThemeBrandingColors(id: string, options?: ListOptions): Paginator<SubtenantLightThemeColor, ListOptions>;
    /**
     * lightThemeBrandingImages
     * @param id - The ID of the account.
     * @param options - options
     */
    lightThemeBrandingImages(id: string, options?: ListOptions): Paginator<SubtenantLightThemeImage, ListOptions>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: AccountListOptions): Paginator<Account, ListOptions>;
    /**
     * me
     */
    me(options?: {
        include?: string;
        properties?: string;
    }): Promise<Account>;
    /**
     * read
     * @param id - Account ID.
     */
    read(id: string, options?: {
        include?: string;
        properties?: string;
    }): Promise<Account>;
    /**
     * trustedCertificates
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    trustedCertificates(id: string, options?: AccountSubtenantTrustedCertificateListOptions): Paginator<SubtenantTrustedCertificate, ListOptions>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Account ID.
     */
    update(request: AccountUpdateRequest, id: string): Promise<Account>;
    /**
     * userInvitations
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    userInvitations(id: string, options?: AccountSubtenantUserInvitationListOptions): Paginator<SubtenantUserInvitation, ListOptions>;
    /**
     * users
     * @param id - Account ID.
     * @param options - Options to use for the List
     */
    users(id: string, options?: AccountSubtenantUserListOptions): Paginator<SubtenantUser, ListOptions>;
}
