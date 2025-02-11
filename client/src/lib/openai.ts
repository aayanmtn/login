import { apiRequest } from "./queryClient";

export async function generateIaC(prompt: string, apiKey: string): Promise<{ message: string; code: string }> {
  const response = await apiRequest("POST", "/api/generate", { prompt, apiKey });
  const data = await response.json();
  return data;
}