import { useState } from "react";
import { Editor } from "@/components/Editor";
import { Terminal } from "@/components/Terminal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LLMSelect } from "@/components/LLMSelect";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-white mb-2">What do you want to build?</h1>
        <p className="text-zinc-400 mb-8">Prompt, run, edit, and deploy full-stack web apps.</p>

        <div className="w-full max-w-2xl space-y-4">
          <div className="relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How can Bolt help you today?"
              className="w-full h-[56px] bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 px-4 text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center text-sm text-zinc-400">
            <div>
              <Button variant="link" className="text-zinc-400 hover:text-white">
                Build a mobile app with NativeScript
              </Button>
            </div>
            <div>
              <Button variant="link" className="text-zinc-400 hover:text-white">
                Create a docs site with VitePress
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex gap-4 items-center">
          <LLMSelect
            selectedProvider={selectedProvider}
            selectedModel={selectedModel}
            onProviderChange={setSelectedProvider}
            onModelChange={setSelectedModel}
          />
        </div>
      </div>

      {code && (
        <div className="flex-1 grid grid-cols-2 gap-4 p-4 bg-zinc-900">
          <div className="rounded-lg overflow-hidden border border-zinc-800">
            <Editor value={code} onChange={setCode} />
          </div>
          <div className="rounded-lg overflow-hidden border border-zinc-800">
            <Terminal />
          </div>
        </div>
      )}
    </div>
  );
}