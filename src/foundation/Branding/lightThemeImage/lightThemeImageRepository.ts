import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { LightThemeImage } from "./lightThemeImage";
import { LightThemeImageAdapter } from "../../index";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *LightThemeImage repository
 */
export class LightThemeImageRepository extends Repository {
    /**
     * create
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    public create(image: ReadStream | Buffer | File | Blob, reference: string): Promise<LightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/light/{reference}/upload-multipart",
                        method: "POST",
                        pathParams: {
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
                done(null, LightThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * delete
     * @param reference - Name of the branding images (icon or picture).
     */
    public delete(reference: string): Promise<LightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/light/{reference}/clear",
                        method: "POST",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, LightThemeImageAdapter.fromApi(data));
            }
        );
    }
    /**
     * list
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<LightThemeImage, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<LightThemeImage>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/branding-images/light",
                            method: "GET",
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<LightThemeImage>, done) => {
                    done(null, new ListResponse(data, data.data, LightThemeImageAdapter.fromApi));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param reference - Name of the image.
     */
    public read(reference: string): Promise<LightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/light/{reference}",
                        method: "GET",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, LightThemeImageAdapter.fromApi(data));
            }
        );
    }
}
