import type { Express } from "express";
import { createServer } from "http";
import OpenAI from "openai";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, apiKey, provider, model } = req.body;

      if (!apiKey) {
        return res.status(400).json({ message: "API key is required" });
      }

      let result;
      switch (provider) {
        case "openai": {
          const openai = new OpenAI({ apiKey });
          const response = await openai.chat.completions.create({
            model: model || "gpt-4o", 
            messages: [
              {
                role: "system",
                content: "You are an expert in Infrastructure as Code. Generate Terraform code based on the user's requirements.",
              },
              { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
          });
          result = JSON.parse(response.choices[0].message.content || "{}");
          break;
        }

        // Add support for other providers here
        default:
          return res.status(400).json({ message: "Unsupported provider" });
      }

      res.json({
        message: result.explanation || "Generated IaC code",
        code: result.code || "",
      });
    } catch (error) {
      console.error("Error generating IaC:", error);
      res.status(500).json({ message: "Failed to generate IaC" });
    }
  });

  return httpServer;
}