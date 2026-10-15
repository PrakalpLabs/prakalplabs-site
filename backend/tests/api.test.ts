import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";
import mongoose from "mongoose";

const app = createApp();

describe("Prakalp Labs Backend REST API Test Suite", () => {
  beforeAll(async () => {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  describe("GET /api/v1/health", () => {
    it("should return operational status without leaking infrastructure details", async () => {
      const res = await request(app).get("/api/v1/health");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("status", "operational");
      expect(res.body.data).toHaveProperty("environment");
      expect(res.body.data).toHaveProperty("uptimeSeconds");
      expect(res.body.data).not.toHaveProperty("dbCredentials");
    });
  });

  describe("POST /api/v1/inquiries Validation", () => {
    it("should reject inquiries with invalid email format", async () => {
      const res = await request(app).post("/api/v1/inquiries").send({
        fullName: "Jane Doe",
        email: "not-a-valid-email",
        projectType: "Custom Software",
        projectDescription: "This is a comprehensive description of an operational software requirement.",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("Validation error");
    });

    it("should reject inquiries with short description (< 15 characters)", async () => {
      const res = await request(app).post("/api/v1/inquiries").send({
        fullName: "John Doe",
        email: "john@example.com",
        projectType: "Custom Software",
        projectDescription: "Too short",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("Validation error");
    });

    it("should reject bot submissions with filled honeypot", async () => {
      const res = await request(app).post("/api/v1/inquiries").send({
        fullName: "Spam Bot",
        email: "bot@spamdomain.com",
        projectType: "Custom Software",
        projectDescription: "Legitimate looking text but honeypot is populated by scraper.",
        honeypot: "http://spamlink.com",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("Automated bot detected");
    });
  });

  describe("Security & Authorization Middleware", () => {
    it("should reject unauthorized requests to admin inquiries endpoint", async () => {
      const res = await request(app).get("/api/v1/admin/inquiries");

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("Unauthorized");
    });

    it("should reject unauthorized project creation", async () => {
      const res = await request(app).post("/api/v1/projects").send({
        title: "Malicious Project Attempt",
        description: "Attempting to create a project without token",
        overview: "Overview text",
        problemStatement: "Problem text",
        solution: "Solution text",
        category: "Custom Software",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("Unauthorized");
    });

    it("should reject unauthorized service mutations", async () => {
      const res = await request(app).post("/api/v1/services").send({
        title: "Unauthorized Service",
        shortDescription: "Short text",
        description: "Description text",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain("Unauthorized");
    });
  });

  describe("Public Read Endpoints", () => {
    it("should respond to GET /api/v1/projects without authorization", async () => {
      const res = await request(app).get("/api/v1/projects");
      expect([200, 503]).toContain(res.status);
    });

    it("should respond to GET /api/v1/services without authorization", async () => {
      const res = await request(app).get("/api/v1/services");
      expect([200, 503]).toContain(res.status);
    });
  });
});
