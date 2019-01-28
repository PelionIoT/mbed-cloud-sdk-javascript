
import * as express from "express";
import { getApp } from "../app";
import * as request from "supertest";

describe("Test basic server endpoints", () => {

    let app: express.Application;

    beforeAll(() => {
        app = getApp();
    });

    it("should return pong", async () => {
        return request(app)
            .get("/ping")
            .expect(200);
    });

    it("should reset", async () => {
        return request(app)
            .get("/reset")
            .expect(205);
    });

    it("should quit", async () => {
        return request(app)
            .get("/quit")
            .query("test")
            .expect(202);
    });

});
