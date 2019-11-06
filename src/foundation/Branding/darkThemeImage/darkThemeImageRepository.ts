import { ReadStream } from "fs";
import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { DarkThemeImageAdapter } from "../../index";
import { DarkThemeImage } from "./darkThemeImage";
/**
 *DarkThemeImage repository
 */
export class DarkThemeImageRepository extends Repository {
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
                            reference,
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
        const pageFunc = (pageOptions: ListOptions): Promise<Page<DarkThemeImage>> => {
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
                (data: Page<DarkThemeImage>, done) => {
                    done(null, new Page(data, data.data, DarkThemeImageAdapter.fromApi, pageOptions));
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
    public read(reference: string): Promise<DarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/dark/{reference}",
                        method: "GET",
                        pathParams: {
                            reference,
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
     * update
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    public update(image: ReadStream | Buffer | File | Blob, reference: string): Promise<DarkThemeImage> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/dark/{reference}/upload-multipart",
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
                done(null, DarkThemeImageAdapter.fromApi(data));
            }
        );
    }
}
