import { Schema } from "../../../schema/schema";

export const deviceSchema = (): Schema => {
    return Object.assign(new Schema(), {
        name: "Device",

        fields: [
            {
                name: "accountId",
                apiName: "account_id",
                type: "string",
            },

            {
                name: "autoUpdate",
                apiName: "auto_update",
                type: "boolean",
            },

            {
                name: "bootstrapExpirationDate",
                apiName: "bootstrap_expiration_date",
                type: "Date",
            },

            {
                name: "bootstrappedTimestamp",
                apiName: "bootstrapped_timestamp",
                type: "Date",
            },

            {
                name: "caId",
                apiName: "ca_id",
                type: "string",
            },

            {
                name: "connectorExpirationDate",
                apiName: "connector_expiration_date",
                type: "Date",
            },

            {
                name: "createdAt",
                apiName: "created_at",
                type: "Date",
            },

            {
                name: "customAttributes",
                apiName: "custom_attributes",
                type: "{ [key: string]: string }",
            },

            {
                name: "deployedState",
                apiName: "deployed_state",
                type: "DeviceDeployedStateEnum",
            },

            {
                name: "deployment",
                apiName: "deployment",
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
                name: "deviceExecutionMode",
                apiName: "device_execution_mode",
                type: "number",
            },

            {
                name: "deviceKey",
                apiName: "device_key",
                type: "string",
            },

            {
                name: "endpointName",
                apiName: "endpoint_name",
                type: "string",
            },

            {
                name: "endpointType",
                apiName: "endpoint_type",
                type: "string",
            },

            {
                name: "enrolmentListTimestamp",
                apiName: "enrolment_list_timestamp",
                type: "Date",
            },

            {
                name: "firmwareChecksum",
                apiName: "firmware_checksum",
                type: "string",
            },

            {
                name: "hostGateway",
                apiName: "host_gateway",
                type: "string",
            },

            {
                name: "manifest",
                apiName: "manifest",
                type: "string",
            },

            {
                name: "manifestTimestamp",
                apiName: "manifest_timestamp",
                type: "Date",
            },

            {
                name: "mechanism",
                apiName: "mechanism",
                type: "DeviceMechanismEnum",
            },

            {
                name: "mechanismUrl",
                apiName: "mechanism_url",
                type: "string",
            },

            {
                name: "name",
                apiName: "name",
                type: "string",
            },

            {
                name: "serialNumber",
                apiName: "serial_number",
                type: "string",
            },

            {
                name: "state",
                apiName: "state",
                type: "DeviceStateEnum",
            },

            {
                name: "updatedAt",
                apiName: "updated_at",
                type: "Date",
            },

            {
                name: "vendorId",
                apiName: "vendor_id",
                type: "string",
            },
        ],

        methods: [
            {
                name: "create",
                returnType: "Promise<Device>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",

                        subParams: [
                            {
                                name: "autoUpdate",
                                type: "boolean",
                            },

                            {
                                name: "bootstrapExpirationDate",
                                type: "Date",
                            },

                            {
                                name: "bootstrappedTimestamp",
                                type: "Date",
                            },

                            {
                                name: "caId",
                                type: "string",
                            },

                            {
                                name: "connectorExpirationDate",
                                type: "Date",
                            },

                            {
                                name: "customAttributes",
                                type: "{ [key: string]: string }",
                            },

                            {
                                name: "deployment",
                                type: "string",
                            },

                            {
                                name: "description",
                                type: "string",
                            },

                            {
                                name: "deviceClass",
                                type: "string",
                            },

                            {
                                name: "deviceExecutionMode",
                                type: "number",
                            },

                            {
                                name: "deviceKey",
                                type: "string",
                            },

                            {
                                name: "endpointName",
                                type: "string",
                            },

                            {
                                name: "endpointType",
                                type: "string",
                            },

                            {
                                name: "firmwareChecksum",
                                type: "string",
                            },

                            {
                                name: "hostGateway",
                                type: "string",
                            },

                            {
                                name: "manifest",
                                type: "string",
                            },

                            {
                                name: "mechanism",
                                type: "DeviceMechanismEnum",
                            },

                            {
                                name: "mechanismUrl",
                                type: "string",
                            },

                            {
                                name: "name",
                                type: "string",
                            },

                            {
                                name: "serialNumber",
                                type: "string",
                            },

                            {
                                name: "state",
                                type: "DeviceStateEnum",
                            },

                            {
                                name: "vendorId",
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
                        name: "id",
                        position: 0,
                        type: "string",
                    },
                ],
            },

            {
                name: "get",
                returnType: "Promise<Device>",
                parameters: [
                    {
                        name: "id",
                        position: 0,
                        type: "string",
                    },
                ],
            },

            {
                name: "list",
                returnType: "Paginator<Device, ListOptions>",
                parameters: [
                    {
                        name: "options",
                        position: 0,
                        type: "ListOptions",
                    },
                ],
            },

            {
                name: "renewCertificate",
                returnType: "Promise<CertificateEnrollment>",
                parameters: [
                    {
                        name: "certificateName",
                        position: 0,
                        type: "string",
                    },

                    {
                        name: "id",
                        position: 1,
                        type: "string",
                    },
                ],
            },

            {
                name: "update",
                returnType: "Promise<Device>",
                parameters: [
                    {
                        name: "request",
                        position: 0,
                        type: "Object",

                        subParams: [
                            {
                                name: "autoUpdate",
                                type: "boolean",
                            },

                            {
                                name: "caId",
                                type: "string",
                            },

                            {
                                name: "customAttributes",
                                type: "{ [key: string]: string }",
                            },

                            {
                                name: "description",
                                type: "string",
                            },

                            {
                                name: "deviceKey",
                                type: "string",
                            },

                            {
                                name: "endpointName",
                                type: "string",
                            },

                            {
                                name: "endpointType",
                                type: "string",
                            },

                            {
                                name: "hostGateway",
                                type: "string",
                            },

                            {
                                name: "name",
                                type: "string",
                            },
                        ],
                    },

                    {
                        name: "id",
                        position: 1,
                        type: "string",
                    },
                ],
            },
        ],
    });
};