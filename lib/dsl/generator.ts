import { convertCodeWithLLM } from "../llm/llmClient";

export async function generateScratchJSON(code: string): Promise<any> {
  return convertCodeWithLLM(code);
}
