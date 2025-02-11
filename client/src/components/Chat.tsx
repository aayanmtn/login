import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateIaC } from "@/lib/openai";
import { motion } from "framer-motion";

interface ChatProps {
  onGenerate: (code: string) => void;
  apiKey: string | null;
  provider: string;
  model: string;
}

export function Chat({ onGenerate, apiKey, provider, model }: ChatProps) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please provide your API key to use the chat feature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await generateIaC(input, apiKey, provider, model);
      setMessages([...newMessages, { role: "assistant", content: response.message }]);
      onGenerate(response.code);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate IaC. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="p-4 border-b border-sidebar-border bg-gradient-to-r from-sidebar via-sidebar/50 to-sidebar">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Chat
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg shadow-md transition-colors ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-sidebar-accent text-sidebar-accent-foreground"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
            </div>
          </motion.div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border bg-gradient-to-r from-sidebar via-sidebar/50 to-sidebar">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Describe your infrastructure..."
            disabled={isLoading || !apiKey}
            className="bg-background border-sidebar-border focus:border-primary transition-colors"
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !apiKey}
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}