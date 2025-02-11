import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateIaC } from "@/lib/openai";

interface ChatProps {
  onGenerate: (code: string) => void;
  apiKey: string | null;
}

export function Chat({ onGenerate, apiKey }: ChatProps) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please provide your OpenAI API key to use the chat feature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await generateIaC(input, apiKey);
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
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Describe your infrastructure..."
            disabled={isLoading || !apiKey}
          />
          <Button onClick={sendMessage} disabled={isLoading || !apiKey}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}