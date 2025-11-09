import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBusinessUnitSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/business-units", async (req, res) => {
    try {
      const units = await storage.getAllBusinessUnits();
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business units" });
    }
  });

  app.get("/api/business-units/:id", async (req, res) => {
    try {
      const unit = await storage.getBusinessUnit(req.params.id);
      if (!unit) {
        return res.status(404).json({ error: "Business unit not found" });
      }
      res.json(unit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business unit" });
    }
  });

  app.post("/api/business-units", async (req, res) => {
    try {
      const validated = insertBusinessUnitSchema.parse(req.body);
      const unit = await storage.createBusinessUnit(validated);
      res.status(201).json(unit);
    } catch (error) {
      res.status(400).json({ error: "Invalid business unit data" });
    }
  });

  app.patch("/api/business-units/:id", async (req, res) => {
    try {
      const unit = await storage.updateBusinessUnit(req.params.id, req.body);
      if (!unit) {
        return res.status(404).json({ error: "Business unit not found" });
      }
      res.json(unit);
    } catch (error) {
      res.status(400).json({ error: "Failed to update business unit" });
    }
  });

  app.delete("/api/business-units/:id", async (req, res) => {
    try {
      const success = await storage.deleteBusinessUnit(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Business unit not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete business unit" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
