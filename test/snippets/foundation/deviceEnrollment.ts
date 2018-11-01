import { DeviceEnrollment, DeviceEnrollmentBulkCreate } from "../../../src/sdk/entities";
import { createReadStream } from "fs";

describe("Device Enrollment examples", () => {

    it("should enroll one device", async () => {
        try {
            // an example: device enrollment single
            const enrollment = new DeviceEnrollment();
            enrollment.enrollmentIdentity = "A-4E:63:2D:AE:14:BC:D1:09:77:21:95:44:ED:34:06:57:1E:03:B1:EF:0E:F2:59:44:71:93:23:22:15:43:23:12";
            await enrollment.create();
            // end of example
            expect(enrollment.claimedAt).not.toBeUndefined();
        } catch (e) {
            // expect to return 409, device already enrolled
            if (e.details && e.details.code === 409) {
                return;
            }

            throw e;
        }
    });

    it("should bulk enroll devices", async () => {
        try {
            const pathToCsv = "/Users/alelog01/git/mbed-cloud-sdk-javascript/test/snippets/foundation/test.csv";
            // an example: device enrollment bulk
            const bulk = new DeviceEnrollmentBulkCreate();
            // use fs readStream
            const csv = createReadStream(pathToCsv);
            await bulk.create(csv);
            // cloak
            expect(bulk.status).toBe("new");
            // uncloak

            // call get to see current state of bule enrollment
            await bulk.get();
            // end of example
            expect(bulk.status === "completed" || bulk.status === "processing").toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

});
