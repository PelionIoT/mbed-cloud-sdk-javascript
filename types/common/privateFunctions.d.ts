/// <reference types="node" />
import { ReadStream } from "fs";
import { DeviceEnrollmentBulkCreate, DeviceEnrollmentBulkDelete, DeviceEnrollmentBulkCreateRepository, DeviceEnrollmentBulkDeleteRepository, UpdateCampaign } from "../foundation";
/**
 * Internal function
 * @ignore
 */
export declare function isDeveloperCertificateGetter(self: any): void;
export declare function preSharedKeyIdSetter(self: any): void;
/**
 * Internal function
 * @ignore
 */
export declare function downloadErrorsReportFile(self: DeviceEnrollmentBulkCreateRepository | DeviceEnrollmentBulkDeleteRepository, model: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob>;
/**
 * Internal function
 * @ignore
 */
export declare function downloadFullReportFile(self: DeviceEnrollmentBulkCreateRepository | DeviceEnrollmentBulkDeleteRepository, model: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob>;
export declare function deviceFilterHelperSetter(self: UpdateCampaign): void;
