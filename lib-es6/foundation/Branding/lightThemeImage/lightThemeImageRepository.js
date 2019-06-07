import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { LightThemeImageAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *LightThemeImage repository
 */
export class LightThemeImageRepository extends Repository {
    /**
     * delete
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-images/light/{reference}/clear",
                method: "POST",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, LightThemeImageAdapter.fromApi(data));
        });
    }
    /**
     * list
     * @param options - options
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/branding-images/light",
                    method: "GET",
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, LightThemeImageAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param reference - Name of the image.
     */
    read(reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-images/light/{reference}",
                method: "GET",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, LightThemeImageAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(image, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-images/light/{reference}/upload-multipart",
                method: "POST",
                pathParams: {
                    reference: reference,
                },
                formParams: {
                    image: image,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, (data, done) => {
            done(null, LightThemeImageAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=lightThemeImageRepository.js.map