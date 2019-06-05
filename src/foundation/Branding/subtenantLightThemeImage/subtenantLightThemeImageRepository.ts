import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantLightThemeImage } from "./subtenantLightThemeImage";
import { SubtenantLightThemeImageAdapter } from "../../index";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *SubtenantLightThemeImage repository
 */
export class SubtenantLightThemeImageRepository extends Repository {
    /**
     * create
     * @param accountId - Account ID.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    public create(
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
                        contentTypes: [ "multipart/form-data" ],
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
     * delete
     * @param accountId - Account ID.
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
     * list
     * @param accountId - Account ID.
     * @param options - options
     */
    public list(accountId: string, options?: ListOptions): Paginator<SubtenantLightThemeImage, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantLightThemeImage>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/branding-images/light",
                            method: "GET",
                            pathParams: {
                                account_id: accountId,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantLightThemeImage>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantLightThemeImageAdapter.fromApi));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param accountId - Account ID.
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
}
