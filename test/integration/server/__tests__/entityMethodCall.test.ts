import { getApp } from "../app";
import * as express from "express";
import * as request from "supertest";
import { TestRunnerFoundationInstance, TestRunnerMethodCallResult } from "../../foundation/types";

describe("Test entity method calling", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should call methods on entity instance", async () => {
        // use user as a test entity name
        const entityName = "User";

        // create a new user entity
        const createInstance = await request(app)
            .post(`/foundation/entities/${entityName}/instances`)
            .send({
                api_key: "ak_1",
                host: "https://api.us-east-1.mbedcloud.com"
            })
            .expect(201);

        const createInstanceBody: TestRunnerFoundationInstance = createInstance.body;
        expect(createInstanceBody.entity).toBe(entityName);

        const methodId = "create";
        const create = await request(app)
            .post(`/foundation/instances/${createInstanceBody.id}/methods/${methodId}/`)
            .send({
                action: "killme",
                email: "joel29+test@arm.com",
                groups:
                    [
                        "015a9e3ac86102420a01400a00000000",
                        "015a9e3ac86802420a01400a00000000"
                    ],
                username: "icook",
                phone_number: "PrEqPqVUNwSYMIIwxGAV",
                address: "305 Russell Plaza",
                full_name: "zxYrsMGPhumzIXZSqWcx",
                terms_accepted: true,
                marketing_accepted: false,
                password: "unsafe_password"
            })
            .expect(200);

        const createBody: TestRunnerMethodCallResult = create.body;

        expect(createBody).toBeUndefined();
    });
});
