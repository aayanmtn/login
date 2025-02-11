import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value,
        language: "hcl",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        padding: { top: 16, bottom: 16 },
        overviewRulerBorder: false,
        renderLineHighlight: "all",
        guides: {
          indentation: true,
          bracketPairs: true,
        },
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
          verticalScrollbarSize: 12,
          horizontalScrollbarSize: 12,
          useShadows: true,
        },
      });

      editorInstance.current.onDidChangeModelContent(() => {
        onChange(editorInstance.current?.getValue() || "");
      });

      return () => {
        editorInstance.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (editorInstance.current && value !== editorInstance.current.getValue()) {
      editorInstance.current.setValue(value);
    }
  }, [value]);

  return (
    <div className="h-full w-full bg-zinc-950 border-l border-r border-zinc-800">
      <div ref={editorRef} className="h-full w-full" />
    </div>
  );
}