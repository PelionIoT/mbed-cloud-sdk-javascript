import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { Color } from "./color";
import { ColorAdapter } from "../../index";
import { ColorUpdateDarkRequest } from "./types";
import { ColorUpdateLightRequest } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
/**
 *Color repository
 */
export class ColorRepository extends Repository {
    public deleteDark(reference: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "DELETE",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public deleteLight(reference: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/light/{reference}",
                        method: "DELETE",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public getDark(reference: string): Promise<Color> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "GET",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ColorAdapter.fromApi(data));
            }
        );
    }
    public getLight(reference: string): Promise<Color> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/light/{reference}",
                        method: "GET",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ColorAdapter.fromApi(data));
            }
        );
    }
    public listDark(options?: ListOptions): Paginator<Color, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Color>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/branding-colors/dark",
                            method: "GET",
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<Color>, done) => {
                    done(null, new ListResponse(data, data.data, ColorAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public listLight(options?: ListOptions): Paginator<Color, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<Color>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/branding-colors/light",
                            method: "GET",
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<Color>, done) => {
                    done(null, new ListResponse(data, data.data, ColorAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public updateDark(request: ColorUpdateDarkRequest, reference: string): Promise<Color> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "PUT",
                        pathParams: {
                            reference: reference,
                        },
                        body: {
                            color: request.color,
                            updated_at: request.updatedAt,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ColorAdapter.fromApi(data, request));
            }
        );
    }
    public updateLight(request: ColorUpdateLightRequest, reference: string): Promise<Color> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/light/{reference}",
                        method: "PUT",
                        pathParams: {
                            reference: reference,
                        },
                        body: {
                            color: request.color,
                            updated_at: request.updatedAt,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ColorAdapter.fromApi(data, request));
            }
        );
    }
}
