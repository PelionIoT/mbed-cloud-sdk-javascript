import { EnrollmentId as ApiEnrollmentId, EnrollmentIdentity as ApiEnrollmentIdentity } from "../../_api/enrollment";
import { EnrollmentApi } from "../enrollmentApi";
import { AddEnrollmentClaim } from "../types";
import { EnrollmentClaim } from "./enrollmentClaim";
/**
 * Internal
 * @ignore
 */
export declare const map: (from: ApiEnrollmentIdentity, api: EnrollmentApi) => EnrollmentClaim;
/**
 * Internal
 * @ignore
 */
export declare const addMap: ({ claimId }: AddEnrollmentClaim) => ApiEnrollmentId;
