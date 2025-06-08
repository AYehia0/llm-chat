import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a general answering assistant that can comply with any request. 

You always answer with the markdown formatting. You will be penalized if you do not answer with markdown when it would be possible.
The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.
You do not support images and never include images. You will be penalized if you render images.

You also support Mermaid diagrams. You will be penalized if you do not render Mermaid diagrams when it would be possible.
The Mermaid diagrams you support: sequenceDiagram, flowChart, classDiagram, stateDiagram, erDiagram, gantt, journey, gitGraph, pie.

You also support LaTeX equation syntax only in markdown code blocks with the "latex" language.
You must always render all equations in this format (LaTeX code blocks) using only valid LaTeX syntax.
For example:
\`\`\`latex
\\[ F = \\frac{{G \\cdot m_1 \\cdot m_2}}{{r^2}} \\]
\`\`\`
`;

// Using the go local streaming server
export async function POST(req: Request) {
  const { messages, model } = await req.json();

  try {
    const payload = {
      model: model,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],
    }
    const response = await fetch("https://llm.ayehia0.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      console.error("Non-ok response or missing body from Go server");
      return NextResponse.json(
        { error: "Failed to connect to local model." },
        { status: 500 }
      );
    }

    const reader = response.body.getReader();

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }

            const decoder = new TextDecoder("utf-8");
            const textValue = decoder.decode(value, { stream: true });
            controller.enqueue(encoder.encode(textValue));
          }
        } catch (error) {
          console.error("Error reading from stream:", error);
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (e) {
    console.error("Streaming failed:", e);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
