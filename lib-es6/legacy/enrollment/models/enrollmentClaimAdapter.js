import { EnrollmentClaim } from "./enrollmentClaim";
/**
 * Internal
 * @ignore
 */
export const map = (from, api) => {
    return new EnrollmentClaim({
        accountId: from.account_id,
        claimId: from.enrollment_identity,
        createdAt: from.created_at,
        deviceId: from.enrolled_device_id,
        expiresAt: from.expires_at,
        id: from.id,
    }, api);
};
/**
 * Internal
 * @ignore
 */
export const addMap = ({ claimId }) => ({ enrollment_identity: claimId });
//# sourceMappingURL=enrollmentClaimAdapter.js.map