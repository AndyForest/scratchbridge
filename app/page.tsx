"use client";

import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ResultDisplay from "../components/ResultDisplay";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/generate-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate Scratch JSON");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to read response stream");
      }

      let resultText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        resultText += new TextDecoder().decode(value);
        setResult(resultText);
      }
    } catch (err) {
      setError("Failed to process the request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ScratchBridge PoC</h1>
      <CodeEditor code={code} onChange={setCode} />
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Convert to Scratch JSON"}
      </button>
      <ResultDisplay result={result} error={error} isLoading={isLoading} />
    </div>
  );
}
