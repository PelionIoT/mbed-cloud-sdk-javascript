import { getApp } from "../app";
import * as express from "express";
import * as request from "supertest";
import { TestRunnerFoundationInstance } from "../../foundation/types";

describe("test entity instance endpoints", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should create and list entity instances", async () => {
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

        // list all entity instances
        const list = await request(app)
            .get("/foundation/entities")
            .expect(200);

        const listBody: Array<TestRunnerFoundationInstance> = list.body;

        expect(listBody.filter(l => l.id === createBody.id).length).toBe(1);

        // list entities by entity id
        const listSpecific = await request(app)
            .get(`/foundation/entities/${entityName}/instances`)
            .expect(200);

        const listSpecificBody: Array<TestRunnerFoundationInstance> = listSpecific.body;

        expect(listSpecificBody.filter(l => l.id === createBody.id).length).toBe(1);
    });

});
