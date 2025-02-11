import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LLMProvider {
  id: string;
  name: string;
  models: string[];
}

const providers: LLMProvider[] = [
  {
    id: "openai",
    name: "OpenAI",
    models: ["gpt-4o", "gpt-3.5-turbo"],
  },
  {
    id: "groq",
    name: "Groq",
    models: ["mixtral-8x7b", "llama2-70b"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: ["claude-3-opus", "claude-3-sonnet"],
  },
  {
    id: "ollama",
    name: "Ollama",
    models: ["llama2", "mistral", "codellama"],
  },
];

interface LLMSelectProps {
  selectedProvider: string;
  selectedModel: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
}

export function LLMSelect({
  selectedProvider,
  selectedModel,
  onProviderChange,
  onModelChange,
}: LLMSelectProps) {
  const currentProvider = providers.find((p) => p.id === selectedProvider);

  return (
    <div className="flex gap-2">
      <Select value={selectedProvider} onValueChange={onProviderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select provider" />
        </SelectTrigger>
        <SelectContent>
          {providers.map((provider) => (
            <SelectItem key={provider.id} value={provider.id}>
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedModel}
        onValueChange={onModelChange}
        disabled={!currentProvider}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {currentProvider?.models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
