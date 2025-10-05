import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve the static color converter HTML file
  app.get("/static-color-converter.html", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "static-color-converter.html"));
  });

  const httpServer = createServer(app);

  return httpServer;
}
