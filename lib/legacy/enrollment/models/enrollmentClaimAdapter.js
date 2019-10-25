"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enrollmentClaim_1 = require("./enrollmentClaim");
/**
 * Internal
 * @ignore
 */
exports.map = function (from, api) {
    return new enrollmentClaim_1.EnrollmentClaim({
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
exports.addMap = function (_a) {
    var claimId = _a.claimId;
    return ({ enrollment_identity: claimId });
};
//# sourceMappingURL=enrollmentClaimAdapter.js.map