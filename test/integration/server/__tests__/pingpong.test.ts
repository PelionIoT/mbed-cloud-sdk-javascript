
import * as express from "express";
import { getApp } from "../app";
import * as request from "supertest";

describe("Test basic server endpoints", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should return pong", async () => {
        request(app)
            .get("/ping")
            .expect(200);
        // const res = await request(app).get("/ping");
        // expect(res.status).toBe(200);
    });

    it("should reset", async () => {
        request(app)
            .get("/reset")
            .expect(205);
        // const res = await request(app).get("/reset");
        // expect(res.status).toBe(205);
    });

    it("should quit", async () => {
        request(app)
            .get("/quit")
            .query("test")
            .expect(202);
        // const res = await request(app).get("/quit").query("test");
        // expect(res.status).toBe(202);
    });

});
