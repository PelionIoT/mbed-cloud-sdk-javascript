import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantDarkThemeImage } from "./subtenantDarkThemeImage";
import { SubtenantDarkThemeImageAdapter } from "../../index";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *SubtenantDarkThemeImage repository
 */
export class SubtenantDarkThemeImageRepository extends Repository {
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
    ): Promise<SubtenantDarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-images/dark/{reference}/upload-multipart",
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
                done(null, SubtenantDarkThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Name of the branding images (icon or picture).
     */
    public delete(accountId: string, reference: string): Promise<SubtenantDarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-images/dark/{reference}/clear",
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
                done(null, SubtenantDarkThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * list
     * @param accountId - Account ID.
     * @param options - options
     */
    public list(accountId: string, options?: ListOptions): Paginator<SubtenantDarkThemeImage, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantDarkThemeImage>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/branding-images/dark",
                            method: "GET",
                            pathParams: {
                                account_id: accountId,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantDarkThemeImage>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantDarkThemeImageAdapter.fromApi));
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
    public read(accountId: string, reference: string): Promise<SubtenantDarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-images/dark/{reference}",
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
                done(null, SubtenantDarkThemeImageAdapter.fromApi(data));
            }
        );
    }
}
