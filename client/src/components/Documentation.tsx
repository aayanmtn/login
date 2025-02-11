import { FC } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Documentation: FC = () => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Adding and Using Agents</h3>
            
            <div className="space-y-6 text-zinc-400">
              <section>
                <h4 className="text-sm font-medium text-white mb-2">1. Setting Up an Agent</h4>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Enter your requirements in the chat input on the left</li>
                  <li>Select your preferred LLM provider and model from the dropdown</li>
                  <li>The agent will analyze your requirements and generate initial code</li>
                </ul>
              </section>

              <section>
                <h4 className="text-sm font-medium text-white mb-2">2. Code Generation</h4>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Generated code appears in the Monaco editor</li>
                  <li>Code is automatically syntax-highlighted and formatted</li>
                  <li>You can edit the code directly in the editor</li>
                </ul>
              </section>

              <section>
                <h4 className="text-sm font-medium text-white mb-2">3. Terminal Integration</h4>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>The terminal automatically executes your code</li>
                  <li>View real-time output and error messages</li>
                  <li>Use standard terminal commands to interact with your code</li>
                </ul>
              </section>

              <section>
                <h4 className="text-sm font-medium text-white mb-2">4. Workflow</h4>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Type a prompt describing what you want to build</li>
                  <li>Agent generates code and displays it in the editor</li>
                  <li>Code is automatically executed in the terminal</li>
                  <li>View results and refine through the chat interface</li>
                </ul>
              </section>

              <section>
                <h4 className="text-sm font-medium text-white mb-2">5. Best Practices</h4>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Be specific in your requirements</li>
                  <li>Review generated code before execution</li>
                  <li>Use the chat to request modifications or improvements</li>
                  <li>Save important changes using the Export button</li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
