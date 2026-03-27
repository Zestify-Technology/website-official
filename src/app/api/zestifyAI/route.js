import fs from "fs/promises";
import "dotenv/config";
import Groq from "groq-sdk";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let conversationHistory = [];

export async function POST(req) {
  try {
    const body = await req.json();
    const userQuestion = body.question;

    if (!userQuestion) {
      return new Response(
        JSON.stringify({ error: "User question can't be empty!" }),
        { status: 400 }
      );
    }

    const systemPrompt = await fs.readFile(
      path.resolve("src", "data", "prompt.md"),
      "utf-8"
    );

    const companyData = await fs.readFile(
      path.resolve("src", "data", "data.md"),
      "utf-8"
    );

    conversationHistory.push({
      role: "user",
      content: userQuestion,
    });

    const messages = [
      {
        role: "system",
        content: `${systemPrompt}\n\n${companyData}`,
      },
      ...conversationHistory,
    ];

    const modelList = [
      "openai/gpt-oss-120b",
      "whisper-large-v3-turbo", // ini versi lebih ringan & stabil
    ];

    let completion;
    let modelUsed = null;
    let errorMessage = null;

    for (const model of modelList) {
      try {
        modelUsed = model;
        completion = await groq.chat.completions.create({
          model,
          messages,
          temperature: 0.8,
          seed: 100,
          max_completion_tokens: 3000,
          top_p: 0.93,
        });
        break;
      } catch (error) {
        console.warn(`⚠️ Model ${model} gagal:`, error.message);
        errorMessage = error.message;
        continue;
      }
    }

    if (!completion) {
      throw new Error("Semua model gagal diakses. Mohon coba lagi nanti.");
    }

    const modelReply = completion.choices[0].message.content;

    conversationHistory.push({
      role: "assistant",
      content: modelReply,
    });

    // Create streaming response with typing animation
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial metadata
          const metadata = {
            type: 'metadata',
            modelUsed: completion.model,
            timestamp: new Date().toISOString(),
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`));

          // Simulate typing by sending characters with delay
          const words = modelReply.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentText += (i > 0 ? ' ' : '') + word;
      
      const chunk = {
        type: 'content',
        content: currentText,
        isComplete: i === words.length - 1
      };
      
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      
      // Percepat delay antar kata (50-150ms)
      if (i < words.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 100));
      }
    }

          // Send completion signal
          const completion_signal = {
            type: 'complete',
            content: modelReply,
            modelUsed: completion.model,
            timestamp: new Date().toISOString(),
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(completion_signal)}\n\n`));
          
          controller.close();
        } catch (error) {
          const errorChunk = {
            type: 'error',
            error: error.message
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorChunk)}\n\n`));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("❌ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan sistem",
        details: process.env.NODE_ENV === 'development' ? error.message : "Internal server error",
        timestamp: new Date().toISOString(),
      }),
      { status: 500 }
    );
  }
}