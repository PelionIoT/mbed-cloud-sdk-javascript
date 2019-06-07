import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DarkThemeImageAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *DarkThemeImage repository
 */
export class DarkThemeImageRepository extends Repository {
    /**
     * delete
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/branding-images/dark/{reference}/clear",
                method: "POST",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DarkThemeImageAdapter.fromApi(data));
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
                    url: "/v3/branding-images/dark",
                    method: "GET",
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, DarkThemeImageAdapter.fromApi));
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
                url: "/v3/branding-images/dark/{reference}",
                method: "GET",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DarkThemeImageAdapter.fromApi(data));
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
                url: "/v3/branding-images/dark/{reference}/upload-multipart",
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
            done(null, DarkThemeImageAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=darkThemeImageRepository.js.map