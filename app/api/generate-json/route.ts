import { openai } from "@ai-sdk/openai";
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText, generateText  } from "ai";
import { Langfuse } from 'langfuse';
import { randomUUID } from "crypto";


const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_BASEURL
});

const deepSeek = createOpenAICompatible({
  name: 'deepseek',
  baseURL: process.env.DEEPSEEK_BASEURL,
  headers: {
    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY ?? ''}`,
  },
});

// Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY ?? ''}`,

export const maxDuration = 30;

export async function POST(request: Request) {
  const { code } = await request.json();
  const traceId = randomUUID();

  langfuse.trace({
    id: traceId,
    name: "scratchbridge-conversion",
  });

  console.log("begin generate-json")

  try {
    const result = await generateText({
      model: deepSeek('deepseek-chat'),
      system:
        "Convert the following JavaScript code into Scratch JSON format. Ensure the output is valid and adheres to Scratch's capabilities. Return only the scratch compatible JSON with no other formatting, suitable for using as the scratch project.json file contents.",
      messages: [
        {
          role: "user",
          content: code,
        },
      ],
      experimental_telemetry: {
        isEnabled: true,
        functionId: `generate-json-1`,
        metadata: {
          langfuseTraceId: traceId,
          langfuseUpdateParent: false, // Do not update the parent trace with execution results
        },
      },
    });

    const scratchJson = result.text;
    console.log(scratchJson)
    langfuse.trace({
      id: traceId,
      name: "scratchbridge-conversion",
      metadata: {
        success: true,
      },
    });

    return new Response(JSON.stringify({ success: true, scratchJson }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error)

    langfuse.trace({
      id: traceId,
      name: "scratchbridge-conversion",
      metadata: {
        success: false,
        error: error.message,
      },
    });

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to generate Scratch JSON",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await langfuse.flushAsync();
  }
}

await langfuse.flushAsync();