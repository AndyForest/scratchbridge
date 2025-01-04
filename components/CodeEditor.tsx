import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from '@uiw/codemirror-themes';
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      value={code}
      height="300px"
      extensions={[javascript()]}
      onChange={(value) => onChange(value)}
      theme="dark"
    />
  );
}
