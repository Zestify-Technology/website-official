import fs from "fs/promises";
import Groq from "groq-sdk";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const tools = [
  {
    type: "function",
    function: {
      name: "get_clients",
      description:
        "Ambil data klien. Gunakan ketika user tanya ada berapa klien yang terdaftar dan mengecek apakah klien tersebut sudah terdaftar",
      parameters: {
        type: "object",
        properties: {
          filter: {
            type: "string",
            description: "Filter opsional, contoh: status = 'active'",
          },
          perPage: { type: "number", description: "Jumlah data, default 20" },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_consultation",
      description:
        "Tambah klien baru dengan pengajuan konsultasi. Gunakan ketika user ingin mengajukan konsultasi",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Nama klien atau perusahaan" },
          detail: {
            type: "string",
            description: "detail masalah atau topik yang akan di konsultasikan",
          },
          email: { type: "string", description: "Email klien" },
          no_whatsapp: { type: "string", description: "Nomor WhatsApp klien" },
          status: {
            type: "string",
            description: "Status klien, contoh: berjalan, selesai, konsultasi",
          },
        },
        required: [],
      },
    },
  },
];

async function executeTool(name, args) {
  const routes = {
    get_clients: () => {
      const params = new URLSearchParams(args).toString();
      return fetch(`${BASE_URL}/api/client/list?${params}`);
    },
    create_consultation: () => {
      return fetch(`${BASE_URL}/api/consultation/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
    },
  };

  const fetcher = routes[name];
  if (!fetcher) return { error: `Tool '${name}' tidak dikenal` };

  const res = await fetcher();
  return res.json();
}

// ✅ PERBAIKAN: Fungsi runAgentLoop sekarang aman dari kontaminasi antar model
async function runAgentLoop(messages, model) {
  // Deep copy array messages agar tidak merusak array asli saat fallback/retry model lain
  let localMessages = JSON.parse(JSON.stringify(messages));

  while (true) {
    const response = await groq.chat.completions.create({
      model,
      messages: localMessages,
      tools,
      tool_choice: "auto",
      temperature: 0.7,
      max_completion_tokens: 3000,
    });

    const message = response.choices[0].message;

    // ✅ SANITASI: Hanya ambil properti standar demi kecocokan dengan model Llama
    const sanitizedMessage = {
      role: message.role,
      content: message.content || "",
    };

    if (message.tool_calls) {
      sanitizedMessage.tool_calls = message.tool_calls;
    }

    localMessages.push(sanitizedMessage);

    if (!message.tool_calls?.length) {
      return message.content;
    }

    for (const call of message.tool_calls) {
      const args = JSON.parse(call.function.arguments);
      const result = await executeTool(call.function.name, args);

      localMessages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessages = body.messages;

    if (!userMessages || userMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Pertanyaan tidak boleh kosong" }),
        { status: 400 },
      );
    }

    const [systemPrompt, companyData] = await Promise.all([
      fs.readFile(path.resolve("src", "data", "systemPrompt.md"), "utf-8"),
      fs.readFile(path.resolve("src", "data", "companyData.md"), "utf-8"),
    ]);

    const messages = [
      { role: "system", content: `${systemPrompt}\n\n${companyData}` },
      ...userMessages,
    ];

    const modelList = [
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
    ];
    let reply = null;
    let modelUsed = null;

    for (const model of modelList) {
      try {
        reply = await runAgentLoop(messages, model);
        modelUsed = model;
        break;
      } catch (err) {
        console.warn(`⚠️ Model ${model} gagal:`, err.message);
        continue;
      }
    }

    if (!reply) {
      throw new Error("Semua model sedang tidak bisa diakses!");
    }

    // ✅ Stream jawaban final ke client dengan efek typing
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Kirim metadata dulu
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "metadata", modelUsed, timestamp: new Date().toISOString() })}\n\n`,
          ),
        );

        // Kirim karakter satu per satu
        let accumulated = "";
        for (const char of reply) {
          accumulated += char;
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "content", content: accumulated })}\n\n`,
            ),
          );
          await new Promise((res) => setTimeout(res, 8));
        }

        // Kirim status complete
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "complete", content: reply, modelUsed, timestamp: new Date().toISOString() })}\n\n`,
          ),
        );
        controller.close();
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
