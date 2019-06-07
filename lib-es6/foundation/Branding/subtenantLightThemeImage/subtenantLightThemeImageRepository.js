import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantLightThemeImageAdapter } from "../../index";
/**
 *SubtenantLightThemeImage repository
 */
export class SubtenantLightThemeImageRepository extends Repository {
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/light/{reference}/clear",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantLightThemeImageAdapter.fromApi(data));
        });
    }
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Name of the image.
     */
    read(accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/light/{reference}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantLightThemeImageAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param accountId - Account ID.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(accountId, image, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-images/light/{reference}/upload-multipart",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
                formParams: {
                    image: image,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantLightThemeImageAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=subtenantLightThemeImageRepository.js.map