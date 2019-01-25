import * as express from "express";
import { getApp } from "../app";
import * as request from "supertest";
import { TestRunnerFoundationInstance } from "../../foundation/types";

describe("test sdk instance endpoints", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should create and list sdk instances", async () => {
        const create = await request(app)
            .post("/foundation/sdk/instances")
            .send({
                api_key: "ak_1",
                host: "https://api.us-east-1.mbedcloud.com"
            })
            .expect(201);

        const createBody: TestRunnerFoundationInstance = create.body;
        expect(createBody.entity).toBe("Sdk");

        const list = await request(app)
            .get("/foundation/sdk/instances")
            .expect(200);

        const listBody: Array<TestRunnerFoundationInstance> = list.body;

        expect(listBody.filter(l => l.id === createBody.id).length).toBe(1);
    });

});
