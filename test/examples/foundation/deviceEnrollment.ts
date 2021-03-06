/* tslint:disable: no-console */
import { DeviceEnrollment, DeviceEnrollmentRepository, DeviceEnrollmentBulkCreateRepository, DeviceEnrollmentBulkDeleteRepository } from "../../../src";
import { createReadStream, ReadStream } from "fs";

describe("examples of device enrollment", () => {

    test("device enrollment single", async () => {
        try {
            // an example: device enrollment single
            const enrollmentContext = new DeviceEnrollmentRepository();
            const enrollment: DeviceEnrollment = {
                enrollmentIdentity: "A-4E:63:2D:AE:14:BC:D1:09:77:21:95:44:ED:34:06:57:1E:03:B1:EF:0E:F2:59:44:71:93:23:22:15:43:23:12",
            };
            await enrollmentContext.create(enrollment);
            // end of example
            expect(enrollment.claimedAt).not.toBeUndefined();

            await enrollmentContext.delete(enrollment.id);
        } catch (e) {
            // expect to return 409, device already enrolled
            if (e.details && e.details.code === 409) {
                return;
            }

            throw e;
        }
    });

    test("device enrollment bulk", async () => {
        try {
            const pathToCsv = "/Users/alelog01/git/mbed-cloud-sdk-javascript/test/snippets/foundation/test.csv";
            // an example: device enrollment bulk
            const bulkCreateContext = new DeviceEnrollmentBulkCreateRepository();
            // uses fs readStream so this is a node only example.
            const csv = createReadStream(pathToCsv);
            let createTask = await bulkCreateContext.create(csv);
            // cloak
            expect(createTask.status).toBe("new");
            // uncloak

            // call get to see current state of bulk enrollment
            createTask = await bulkCreateContext.read(createTask.id);

            // cloak
            expect(createTask.status === "completed" || createTask.status === "processing").toBeTruthy();
            // uncloak

            const reportFile = await bulkCreateContext.downloadFullReportFile(createTask) as ReadStream;
            // cloak
            if (reportFile) {
                expect(reportFile.readable).toBeTruthy();
            }
            // uncloak
            // stream report file into string and print it
            printFile(reportFile);

            const errorFile = await bulkCreateContext.downloadErrorsReportFile(createTask) as ReadStream;
            // cloak
            if (errorFile) {
                expect(errorFile.readable).toBeTruthy();
            }
            // uncloak
            printFile(errorFile);

            // end of example
        } catch (e) {
            throw e;
        }
    });

    function printFile(file) {
        let data = "";
        file.on("data", chunk => {
            data += chunk;
        }).on("end", () => {
            console.log(data);
        });
    }

});
