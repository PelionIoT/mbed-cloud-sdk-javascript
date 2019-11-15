import { ReadStream } from "fs";
import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { LightThemeImageAdapter } from "../../index";
import { LightThemeImage } from "./lightThemeImage";
/**
 *LightThemeImage repository
 */
export class LightThemeImageRepository extends Repository {
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
                            reference,
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
        const pageFunc = (pageOptions: ListOptions): Promise<Page<LightThemeImage>> => {
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
                (data: Page<LightThemeImage>, done) => {
                    done(null, new Page(data, data.data, LightThemeImageAdapter.fromApi, pageOptions));
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
                            reference,
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
     * update
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    public update(image: ReadStream | Buffer | File | Blob, reference: string): Promise<LightThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/light/{reference}/upload-multipart",
                        method: "POST",
                        pathParams: {
                            reference,
                        },
                        formParams: {
                            image,
                        },
                        contentTypes: ["multipart/form-data"],
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
