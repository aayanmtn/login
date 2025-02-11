import { useState } from "react";
import { Editor } from "@/components/Editor";
import { Terminal } from "@/components/Terminal";
import { Chat } from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Download, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { FileTree } from "@/components/FileTree";
import { LLMSelect } from "@/components/LLMSelect";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const mockFiles = [
  {
    id: "1",
    name: "Project",
    type: "folder" as const,
    children: [
      {
        id: "2",
        name: "main.tf",
        type: "file" as const,
      },
      {
        id: "3",
        name: "variables.tf",
        type: "file" as const,
      },
    ],
  },
];

export default function Home() {
  const [code, setCode] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const { toast } = useToast();

  const downloadProject = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.tf";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Project Downloaded",
      description: "Your project has been downloaded successfully.",
    });
  };

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved for this session.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen flex flex-col">
        <header className="border-b p-4 bg-gradient-to-r from-background via-sidebar to-background">
          <div className="flex justify-between items-center max-w-[2000px] mx-auto">
            <h1 className="text-3xl font-bold text-primary">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Infrastructure as Code Generator
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <LLMSelect
                selectedProvider={selectedProvider}
                selectedModel={selectedModel}
                onProviderChange={setSelectedProvider}
                onModelChange={setSelectedModel}
              />
              <Button variant="outline" size="icon" className="hover:border-primary transition-colors">
                <Settings className="h-4 w-4" />
              </Button>
              <Button onClick={downloadProject} className="bg-primary hover:bg-primary/90 transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15} className="bg-sidebar border-r border-sidebar-border">
            <div className="h-full">
              <FileTree items={mockFiles} onSelect={() => {}} />
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1.5 bg-sidebar-border hover:bg-primary/50 transition-colors" />

          <ResizablePanel defaultSize={50}>
            <div className="h-full">
              <Editor value={code} onChange={setCode} />
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1.5 bg-sidebar-border hover:bg-primary/50 transition-colors" />

          <ResizablePanel defaultSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <Chat
                  onGenerate={setCode}
                  apiKey={apiKey}
                  provider={selectedProvider}
                  model={selectedModel}
                />
              </ResizablePanel>
              <ResizableHandle className="h-1.5 bg-sidebar-border hover:bg-primary/50 transition-colors" />
              <ResizablePanel defaultSize={40}>
                <Terminal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <ApiKeyModal
        open={showApiKeyModal && !apiKey}
        onOpenChange={setShowApiKeyModal}
        onSubmit={handleApiKeySubmit}
      />
    </div>
  );
}