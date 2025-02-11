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
          background: "#121212",
          foreground: "#ffffff",
          cursor: "#00ff00",
          black: "#000000",
          blue: "#5c5cff",
          cyan: "#00ffff",
          green: "#00ff00",
          magenta: "#ff00ff",
          red: "#ff0000",
          white: "#ffffff",
          yellow: "#ffff00",
          brightBlack: "#808080",
          brightBlue: "#0000ff",
          brightCyan: "#00ffff",
          brightGreen: "#00ff00",
          brightMagenta: "#ff00ff",
          brightRed: "#ff0000",
          brightWhite: "#ffffff",
          brightYellow: "#ffff00",
        },
        fontSize: 14,
        fontFamily: "monospace",
        cursorBlink: true,
        cursorStyle: "bar",
        allowTransparency: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      xtermRef.current = term;
      term.write("\x1b[32mWelcome to IaC Generator Terminal\x1b[0m\r\n$ ");

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

  return (
    <div className="h-full w-full p-4 bg-zinc-900">
      <div ref={terminalRef} className="h-full w-full rounded-lg overflow-hidden border border-zinc-800" />
    </div>
  );
}