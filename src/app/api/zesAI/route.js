import fs from "fs/promises";
import "dotenv/config";
import Groq from "groq-sdk";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const userQuestion = body.question;

    if (!userQuestion) {
      return new Response(
        JSON.stringify({ error: "Pertanyaan tidak boleh kosong" }),
        { status: 400 },
      );
    }

    // Load system dan data files
    const systemPrompt = await fs.readFile(
      path.resolve("src", "data", "systemPrompt.md"),
      "utf-8" // Tambahkan encoding agar dibaca sebagai string
    );

    const companyData = await fs.readFile(
      path.resolve("src", "data", "companyData.md"),
      "utf-8"
    );

    // List model CHAT resmi Groq yang valid
    const modelList = ["openai/gpt-oss-120b", "llama-3.3-70b-versatile"];

    let groqStream = null;
    let modelUsed = null;

    // Loop fallback model jika ada yang gagal/rate limit
    for (const model of modelList) {
      try {
        modelUsed = model;
        // Gunakan stream: true untuk streaming asli dari Groq
        groqStream = await groq.chat.completions.create({
          model,
          messages: [
            {
              role: "system",
              content: `${systemPrompt}\n\n${companyData}`,
            },
            {
              role: "user",
              content: userQuestion,
            }
          ],
          temperature: 0.7,
          max_completion_tokens: 3000,
          top_p: 0.9,
          stream: true, 
        });
        break; 
      } catch (error) {
        console.warn(`⚠️ Model ${model} gagal:`, error.message);
        continue;
      }
    }

    if (!groqStream) {
      throw new Error("Semua model sedang tidak bisa diakses!");
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 1. Kirim Metadata Awal ke Client
          const metadata = {
            type: "metadata",
            modelUsed: modelUsed,
            timestamp: new Date().toISOString(),
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`),
          );

          let completeReply = "";

          // 2. Baca Chunk langsung dari stream Groq (Real-time Streaming)
          for await (const chunk of groqStream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              completeReply += content;

              const contentChunk = {
                type: "content",
                content: completeReply, // Mengirim teks akumulatif sesuai kebutuhan komponen klien Anda
              };
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(contentChunk)}\n\n`),
              );
            }
          }

          // 3. Kirim Isyarat Selesai
          const completionSignal = {
            type: "complete",
            content: completeReply,
            modelUsed: modelUsed,
            timestamp: new Date().toISOString(),
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(completionSignal)}\n\n`),
          );

          controller.close();
        } catch (error) {
          console.error("Stream processing error:", error);
          const errorChunk = {
            type: "error",
            error: error.message,
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errorChunk)}\n\n`),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("GLOBAL API ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan sistem",
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      { status: 500 },
    );
  }
}