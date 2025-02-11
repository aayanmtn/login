import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm>();

  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      const term = new XTerm({
        theme: {
          background: "#1a1b1e",
          foreground: "#ffffff",
        },
        fontSize: 14,
        fontFamily: "monospace",
        cursorBlink: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      xtermRef.current = term;
      term.write("Welcome to IaC Generator Terminal\r\n$ ");

      term.onData((data) => {
        term.write(data);
        if (data === "\r") {
          term.write("\n$ ");
        }
      });

      return () => {
        term.dispose();
      };
    }
  }, []);

  return <div ref={terminalRef} className="h-full w-full p-2" />;
}
