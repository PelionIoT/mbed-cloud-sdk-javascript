import { Schema } from "../../../schema/schema";
export const firmwareImageSchema = () => {
    return Object.assign(new Schema(), {
        name: "FirmwareImage",
        fields: [
            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },
            {
                name: "datafileChecksum",
                apiName: "datafile_checksum",
                type: "string",
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
                name: "name",
                apiName: "name",
                type: "string",
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
                returnType: "Promise<FirmwareImage>",
                parameters: [
                    {
                        name: "firmwareImageFile",
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
                        name: "firmwareImageId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
            {
                name: "list",
                returnType: "Paginator<FirmwareImage, ListOptions>",
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
                                type: "FirmwareImageFilter",
                            },
                        ],
                    },
                ],
            },
            {
                name: "read",
                returnType: "Promise<FirmwareImage>",
                parameters: [
                    {
                        name: "firmwareImageId",
                        position: 0,
                        type: "string",
                    },
                ],
            },
        ],
    });
};
//# sourceMappingURL=firmwareImageSchema.js.map