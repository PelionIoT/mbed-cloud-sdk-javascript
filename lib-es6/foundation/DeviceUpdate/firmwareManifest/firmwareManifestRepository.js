import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { FirmwareManifestAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *FirmwareManifest repository
 */
export class FirmwareManifestRepository extends Repository {
    /**
     * create
     * @param firmwareManifestFile - The manifest file to create. The API gateway enforces the account-specific file size.
     */
    create(firmwareManifestFile, options) {
        options = options || {};
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/firmware-manifests/",
                method: "POST",
                formParams: {
                    description: options.description,
                    datafile: firmwareManifestFile,
                    key_table: options.keyTableFile,
                    name: options.name,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.fromApi(data));
        });
    }
    /**
     * delete
     * @param id - The firmware manifest ID
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/firmware-manifests/{manifest_id}/",
                method: "DELETE",
                pathParams: {
                    manifest_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/firmware-manifests/",
                    method: "GET",
                    query: {
                        created_at__in: extractFilter(pageOptions.filter, "createdAt", "in"),
                        created_at__nin: extractFilter(pageOptions.filter, "createdAt", "nin"),
                        created_at__lte: extractFilter(pageOptions.filter, "createdAt", "lte"),
                        created_at__gte: extractFilter(pageOptions.filter, "createdAt", "gte"),
                        datafile__eq: extractFilter(pageOptions.filter, "datafileUrl", "eq"),
                        datafile__neq: extractFilter(pageOptions.filter, "datafileUrl", "neq"),
                        datafile__in: extractFilter(pageOptions.filter, "datafileUrl", "in"),
                        datafile__nin: extractFilter(pageOptions.filter, "datafileUrl", "nin"),
                        datafile_size__eq: extractFilter(pageOptions.filter, "datafileSize", "eq"),
                        datafile_size__neq: extractFilter(pageOptions.filter, "datafileSize", "neq"),
                        datafile_size__in: extractFilter(pageOptions.filter, "datafileSize", "in"),
                        datafile_size__nin: extractFilter(pageOptions.filter, "datafileSize", "nin"),
                        description__eq: extractFilter(pageOptions.filter, "description", "eq"),
                        description__neq: extractFilter(pageOptions.filter, "description", "neq"),
                        description__in: extractFilter(pageOptions.filter, "description", "in"),
                        description__nin: extractFilter(pageOptions.filter, "description", "nin"),
                        device_class__eq: extractFilter(pageOptions.filter, "deviceClass", "eq"),
                        device_class__neq: extractFilter(pageOptions.filter, "deviceClass", "neq"),
                        device_class__in: extractFilter(pageOptions.filter, "deviceClass", "in"),
                        device_class__nin: extractFilter(pageOptions.filter, "deviceClass", "nin"),
                        id__eq: extractFilter(pageOptions.filter, "id", "eq"),
                        id__neq: extractFilter(pageOptions.filter, "id", "neq"),
                        id__in: extractFilter(pageOptions.filter, "id", "in"),
                        id__nin: extractFilter(pageOptions.filter, "id", "nin"),
                        name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                        name__neq: extractFilter(pageOptions.filter, "name", "neq"),
                        name__in: extractFilter(pageOptions.filter, "name", "in"),
                        name__nin: extractFilter(pageOptions.filter, "name", "nin"),
                        timestamp__in: extractFilter(pageOptions.filter, "timestamp", "in"),
                        timestamp__nin: extractFilter(pageOptions.filter, "timestamp", "nin"),
                        timestamp__lte: extractFilter(pageOptions.filter, "timestamp", "lte"),
                        timestamp__gte: extractFilter(pageOptions.filter, "timestamp", "gte"),
                        updated_at__in: extractFilter(pageOptions.filter, "updatedAt", "in"),
                        updated_at__nin: extractFilter(pageOptions.filter, "updatedAt", "nin"),
                        updated_at__lte: extractFilter(pageOptions.filter, "updatedAt", "lte"),
                        updated_at__gte: extractFilter(pageOptions.filter, "updatedAt", "gte"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, FirmwareManifestAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The firmware manifest ID
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/firmware-manifests/{manifest_id}/",
                method: "GET",
                pathParams: {
                    manifest_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=firmwareManifestRepository.js.map