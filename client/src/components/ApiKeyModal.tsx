import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveKeyForProvider } from "@/lib/keyManager";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (key: string) => void;
  provider: string;
}

export function ApiKeyModal({ open, onOpenChange, onSubmit, provider }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    saveKeyForProvider(provider, apiKey);
    onSubmit(apiKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Enter {provider} API Key</DialogTitle>
          <DialogDescription className="text-zinc-400">
            To use the IaC Generator with {provider}, please provide your API key. 
            This key will be stored securely in your browser's local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-emerald-500"
          />
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            Save API Key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}