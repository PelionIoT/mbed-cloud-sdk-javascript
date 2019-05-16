import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DarkThemeImage } from "./darkThemeImage";
import { DarkThemeImageAdapter } from "../../index";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DarkThemeImage repository
 */
export class DarkThemeImageRepository extends Repository {
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
    ): Promise<DarkThemeImage> {
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
                done(null, DarkThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * delete
     * @param reference - Name of the branding images (icon or picture).
     */
    public delete(reference: string): Promise<DarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/dark/{reference}/clear",
                        method: "POST",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DarkThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * get
     * @param reference - Name of the image.
     */
    public get(reference: string): Promise<DarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/dark/{reference}",
                        method: "GET",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DarkThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * list
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<DarkThemeImage, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DarkThemeImage>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/branding-images/dark",
                            method: "GET",
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<DarkThemeImage>, done) => {
                    done(null, new ListResponse(data, data.data, DarkThemeImageAdapter.fromApi));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
}
