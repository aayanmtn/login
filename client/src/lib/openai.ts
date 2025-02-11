import { apiRequest } from "./queryClient";

export async function generateIaC(
  prompt: string,
  apiKey: string,
  provider: string,
  model: string
): Promise<{ message: string; code: string }> {
  const response = await apiRequest("POST", "/api/generate", {
    prompt,
    apiKey,
    provider,
    model,
  });
  const data = await response.json();
  return data;
}