import { Schema } from "../../../schema/schema";
export const firmwareManifestSchema = () => {
    return Object.assign(new Schema(), {
        name: "FirmwareManifest",
        fields: [
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "datafileSize",
                apiName: "datafile_size",
                type: "number",
            },
            {
                name: "datafileUrl",
                apiName: "datafile",
                type: "string",
            },
            {
                name: "description",
                apiName: "description",
                type: "string",
            },
            {
                name: "deviceClass",
                apiName: "device_class",
                type: "string",
            },
            {
                name: "keyTableUrl",
                apiName: "key_table",
                type: "string",
            },
            {
                name: "name",
                apiName: "name",
                type: "string",
            },
            {
                name: "timestamp",
                apiName: "timestamp",
                type: "Date",
            },
            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },
        ],
        methods: [
            {
                name: "create",
                returnType: "Promise<FirmwareManifest>",
                parameters: [
                    {
                        name: "firmwareManifestFile",
                        position: 0,
                        type: "ReadStream | Buffer | File | Blob",
                    },
                    {
                        name: "options",
                        position: 1,
                        type: "Object",
                        subParams: [
                            {
                                name: "description",
                                type: "string",
                            },
                            {
                                name: "keyTableFile",
                                type: "ReadStream | Buffer | File | Blob",
                            },
                            {
                                name: "name",
                                type: "string",
                            },
                        ],
                    },
                ],
            },
            {
                name: "delete",
                returnType: "Promise<void>",
                parameters: [
                    {
                        name: "firmwareManifestId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<FirmwareManifest, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "Object",
                        subParams: [
                            {
                                name: "after",
                                type: "string",
                            },
                            {
                                name: "limit",
                                type: "number",
                            },
                            {
                                name: "order",
                                type: "string",
                            },
                            {
                                name: "include",
                                type: "string",
                            },
                            {
                                name: "maxResults",
                                type: "string",
                            },
                            {
                                name: "filter",
                                type: "FirmwareManifestFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<FirmwareManifest>",
                parameters: [
                    {
                        name: "firmwareManifestId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=firmwareManifestSchema.js.map