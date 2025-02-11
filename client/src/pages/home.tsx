import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Editor } from "@/components/Editor";
import { Terminal } from "@/components/Terminal";
import { Chat } from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyModal } from "@/components/ApiKeyModal";

export default function Home() {
  const [code, setCode] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(true);
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
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            IaC Generator
          </h1>
          <Button onClick={downloadProject}>
            <Download className="mr-2 h-4 w-4" />
            Export Project
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Card className="h-[calc(100vh-12rem)]">
              <Editor value={code} onChange={setCode} />
            </Card>
          </div>

          <div className="col-span-4 space-y-4">
            <Card className="h-[calc(50vh-8rem)]">
              <Chat onGenerate={setCode} apiKey={apiKey} />
            </Card>

            <Card className="h-[calc(50vh-8rem)]">
              <Terminal />
            </Card>
          </div>
        </div>
      </div>

      <ApiKeyModal
        open={showApiKeyModal && !apiKey}
        onOpenChange={setShowApiKeyModal}
        onSubmit={handleApiKeySubmit}
      />
    </div>
  );
}