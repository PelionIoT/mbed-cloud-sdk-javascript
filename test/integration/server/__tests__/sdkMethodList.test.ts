import { getApp } from "../app";
import * as express from "express";
import * as request from "supertest";
import { TestRunnerFoundationInstance, TestRunnerMethodInfo } from "../../foundation/types";

describe("Test sdk method listing", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should list methods on sdk instance", async () => {
        // create a new user entity
        const create = await request(app)
            .post(`/foundation/sdk/instances`)
            .send({
                api_key: "ak_1",
                host: "https://api.us-east-1.mbedcloud.com"
            })
            .expect(201);

        const createBody: TestRunnerFoundationInstance = create.body;
        expect(createBody.entity).toBe("Sdk");

        const methods = await request(app)
            .get(`/foundation/instances/${createBody.id}/methods`)
            .expect(200);

        const methodsBody: Array<TestRunnerMethodInfo> = methods.body;

        expect(methodsBody.some(m => m.name === "entities")).toBeTruthy();
    });
});
