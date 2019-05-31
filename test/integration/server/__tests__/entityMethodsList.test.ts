import { getApp } from "../app";
import * as express from "express";
import * as request from "supertest";
import { TestRunnerFoundationInstance, TestRunnerMethodInfo } from "../../foundation/types";

describe("Test entity method listing", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should list methods on entity instance", async () => {
        // use user as a test entity name
        const entityName = "User";

        // create a new user entity
        const create = await request(app)
            .post(`/foundation/entities/${entityName}/instances`)
            .send({
                api_key: "ak_1",
                host: "https://api.us-east-1.mbedcloud.com"
            })
            .expect(201);

        const createBody: TestRunnerFoundationInstance = create.body;
        expect(createBody.entity).toBe(entityName);

        const methods = await request(app)
            .get(`/foundation/instances/${createBody.id}/methods`)
            .expect(200);

        const methodsBody: Array<TestRunnerMethodInfo> = methods.body;

        expect(methodsBody.some(m => m.name === "list")).toBeTruthy();
    });
});
