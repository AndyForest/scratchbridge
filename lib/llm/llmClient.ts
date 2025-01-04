// Not used. Code in /api instead
import { OpenAI } from "openai";
import { Langfuse } from "langfuse";
import { randomUUID } from "crypto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
});

export async function convertCodeWithLLM(code: string): Promise<any> {
  const traceId = randomUUID();

  langfuse.trace({
    id: traceId,
    name: "scratchbridge-conversion",
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Convert the following JavaScript code into Scratch JSON format. Ensure the output is valid and adheres to Scratch's capabilities.",
        },
        {
          role: "user",
          content: code,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const scratchJson = JSON.parse(response.choices[0].message.content || "{}");

    langfuse.trace({
      id: traceId,
      name: "scratchbridge-conversion",
      metadata: {
        success: true,
      },
    });

    return scratchJson;
  } catch (error) {
    langfuse.trace({
      id: traceId,
      name: "scratchbridge-conversion",
      metadata: {
        success: false,
        error: error.message,
      },
    });

    throw error;
  } finally {
    await langfuse.flushAsync();
  }
}
