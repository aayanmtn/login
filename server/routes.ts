import type { Express } from "express";
import { createServer } from "http";
import OpenAI from "openai";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, apiKey } = req.body;

      if (!apiKey) {
        return res.status(400).json({ message: "API key is required" });
      }

      const openai = new OpenAI({ apiKey });

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert in Infrastructure as Code. Generate Terraform code based on the user's requirements.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content);
      res.json({
        message: result.explanation,
        code: result.code,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate IaC" });
    }
  });

  return httpServer;
}