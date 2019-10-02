import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantLightThemeImage } from "./subtenantLightThemeImage";
import { SubtenantLightThemeImageAdapter } from "../../index";
import { ReadStream } from "fs";
/**
 *SubtenantLightThemeImage repository
 */
export class SubtenantLightThemeImageRepository extends Repository {
    /**
     * delete
     * @param accountId - The ID of the account.
     * @param reference - Name of the branding images (icon or picture).
     */
    public delete(accountId: string, reference: string): Promise<SubtenantLightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-images/light/{reference}/clear",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantLightThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * read
     * @param accountId - The ID of the account.
     * @param reference - Name of the image.
     */
    public read(accountId: string, reference: string): Promise<SubtenantLightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-images/light/{reference}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantLightThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param accountId - The ID of the account.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    public update(
        accountId: string,
        image: ReadStream | Buffer | File | Blob,
        reference: string
    ): Promise<SubtenantLightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantLightThemeImageAdapter.fromApi(data));
            }
        );
    }
}
