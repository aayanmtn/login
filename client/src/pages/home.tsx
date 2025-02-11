import { useState } from "react";
import { Editor } from "@/components/Editor";
import { Terminal } from "@/components/Terminal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LLMSelect } from "@/components/LLMSelect";
import { FileTree } from "@/components/FileTree";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Documentation } from "@/components/Documentation"; // Assuming this component exists

const mockFiles = [
  {
    id: "1",
    name: ".gitignore",
    type: "file" as const,
  },
  {
    id: "2",
    name: "package.json",
    type: "file" as const,
  },
  {
    id: "3",
    name: "src",
    type: "folder" as const,
    children: [
      {
        id: "4",
        name: "index.ts",
        type: "file" as const,
      },
    ],
  },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();

  const handlePromptSubmit = () => {
    if (!prompt.trim()) return;
    setShowEditor(true);
  };

  if (!showEditor) {
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
                onKeyPress={(e) => e.key === "Enter" && handlePromptSubmit()}
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
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">Create Monaco Editor with GPT Integration</h2>
          </div>
          <Button variant="outline" className="border-zinc-700 hover:border-zinc-600">
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={15} minSize={10} className="bg-zinc-900">
            <ResizablePanelGroup direction="horizontal">
              {/* File Tree */}
              <ResizablePanel defaultSize={50}>
                <div className="h-full overflow-auto">
                  <FileTree items={mockFiles} onSelect={() => {}} />
                </div>
              </ResizablePanel>

              <ResizableHandle className="w-1.5 bg-zinc-800 hover:bg-emerald-500/20 transition-colors" />

              {/* Chat Input */}
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <Documentation />
                  </div>
                  <div className="p-4 border-t border-zinc-800">
                    <div className="flex gap-2">
                      <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Send a message..."
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                      <Button variant="outline" className="border-zinc-700 hover:border-zinc-600">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="w-1.5 bg-zinc-800 hover:bg-emerald-500/20 transition-colors" />

          {/* Main Editor and Terminal */}
          <ResizablePanel defaultSize={85}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor */}
              <ResizablePanel defaultSize={70}>
                <Editor value={code} onChange={setCode} />
              </ResizablePanel>

              <ResizableHandle className="h-1.5 bg-zinc-800 hover:bg-emerald-500/20 transition-colors" />

              {/* Terminal */}
              <ResizablePanel defaultSize={30}>
                <Terminal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}