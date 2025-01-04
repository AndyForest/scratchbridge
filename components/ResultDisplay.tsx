import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

interface ResultDisplayProps {
  result: string;
  error?: string;
  isLoading: boolean;
}

export default function ResultDisplay({
  result,
  error,
  isLoading,
}: ResultDisplayProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Generated Scratch JSON:</h2>
      <CodeMirror
        value={result}
        height="300px"
        extensions={[json()]}
        readOnly
        theme="dark"
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          const blob = new Blob([result], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "project.json";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download Scratch JSON
      </button>
    </div>
  );
}
