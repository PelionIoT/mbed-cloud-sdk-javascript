import { DeviceEnrollment } from "../../../src/sdk/entities";

describe("Device Enrollment examples", () => {

    it("should enroll one device", async () => {
        try {
            const enrollment = new DeviceEnrollment();
            enrollment.enrollmentIdentity = "A-4E:63:2D:AE:14:BC:D1:09:77:21:95:44:ED:34:06:57:1E:03:B1:EF:0E:F2:59:44:71:93:23:22:15:43:23:12";
            await enrollment.create();
            expect(enrollment.claimedAt).not.toBeUndefined();
        } catch (e) {
            // expect to return 409, device already enrolled
            if (e.details && e.details.code === 409) {
                return;
            }

            throw e;
        }
    });

});
