import { EnrollmentIdentity as ApiEnrollmentIdentity, EnrollmentId as ApiEnrollmentId } from "../../_api/enrollment";
import { EnrollmentApi } from "../enrollmentApi";
import { EnrollmentClaim } from "./enrollmentClaim";
import { AddEnrollmentClaim } from "../types";
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
