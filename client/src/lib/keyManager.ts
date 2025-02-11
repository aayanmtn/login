import { z } from "zod";

const keysSchema = z.object({
  openai: z.string().optional(),
  groq: z.string().optional(),
  anthropic: z.string().optional(),
  ollama: z.string().optional(),
});

export type Keys = z.infer<typeof keysSchema>;

export function saveKeys(keys: Keys): void {
  try {
    localStorage.setItem('api_keys', JSON.stringify(keys));
  } catch (error) {
    console.error('Failed to save API keys:', error);
  }
}

export function loadKeys(): Keys {
  try {
    const stored = localStorage.getItem('api_keys');
    if (!stored) return {};
    
    const parsed = JSON.parse(stored);
    return keysSchema.parse(parsed);
  } catch (error) {
    console.error('Failed to load API keys:', error);
    return {};
  }
}

export function getKeyForProvider(provider: string): string | null {
  const keys = loadKeys();
  return keys[provider as keyof Keys] || null;
}

export function saveKeyForProvider(provider: string, key: string): void {
  const keys = loadKeys();
  saveKeys({ ...keys, [provider]: key });
}
