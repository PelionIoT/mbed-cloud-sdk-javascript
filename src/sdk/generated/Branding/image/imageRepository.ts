import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Image } from "./image";
import { ImageAdapter } from "../../index";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
/**
 *Image repository
 */
export class ImageRepository extends Repository {
    public clearDark(reference: string): Promise<Image> {
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
                done(null, ImageAdapter.fromApi(data));
            }
        );
    }
    public clearLight(reference: string): Promise<Image> {
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
                done(null, ImageAdapter.fromApi(data));
            }
        );
    }
    public getDark(reference: string): Promise<Image> {
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
                done(null, ImageAdapter.fromApi(data));
            }
        );
    }
    public getLight(reference: string): Promise<Image> {
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
                done(null, ImageAdapter.fromApi(data));
            }
        );
    }
    public listDark(options?: ListOptions): Paginator<Image, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Image>> => {
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
                (data: ListResponse<Image>, done) => {
                    done(null, new ListResponse(data, data.data, ImageAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public listLight(options?: ListOptions): Paginator<Image, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Image>> => {
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
                (data: ListResponse<Image>, done) => {
                    done(null, new ListResponse(data, data.data, ImageAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public uploadDark(reference: string): Promise<Image> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/dark/{reference}/upload",
                        method: "POST",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ImageAdapter.fromApi(data));
            }
        );
    }
    public uploadLight(reference: string): Promise<Image> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-images/light/{reference}/upload",
                        method: "POST",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ImageAdapter.fromApi(data));
            }
        );
    }
}
