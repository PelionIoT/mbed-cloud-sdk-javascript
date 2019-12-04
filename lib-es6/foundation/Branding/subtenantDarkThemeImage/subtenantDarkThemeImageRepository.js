import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantDarkThemeImageAdapter } from "../../index";
/**
 *SubtenantDarkThemeImage repository
 */
export class SubtenantDarkThemeImageRepository extends Repository {
    /**
     * delete
     * @param accountId - The ID of the account.
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/dark/{reference}/clear",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantDarkThemeImageAdapter.fromApi(data));
        });
    }
    /**
     * read
     * @param accountId - The ID of the account.
     * @param reference - Name of the image.
     */
    read(accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/dark/{reference}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantDarkThemeImageAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param accountId - The ID of the account.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(accountId, image, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/dark/{reference}/upload-multipart",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    reference,
                },
                formParams: {
                    image,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantDarkThemeImageAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=subtenantDarkThemeImageRepository.js.map