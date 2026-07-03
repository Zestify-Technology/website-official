import { pbAI } from "@/app/lib/pocketbaseAI";
import { Component } from "lucide-react";
import { Languages } from "lucide-react";

export async function POST(req) {
  try {
    const body = await req.json();
    const pb = await pbAI();

    const createKlien = await pb.collection("clients").create({
      name: body.name,
      no_whatsapp: body.no_whatsapp,
      email: body.email,
      status: "konsultasi",
      address: body.address || "",
      type: body.type || "b2c",
    });

    const consultation = await pb.collection("consultation").create({
      client: createKlien.id,
      no_whatsapp: createKlien.no_whatsapp,
      email: createKlien.email,
      detail: body.detail,
      status: "konsultasi",
    });

    try {
      const fullTextTemplate =
        `hai ${body.name}\n\n` +
        `Terima kasih telah melakukan pengajuan konsultasi di ZesAI. ` +
        `Permintaan Anda untuk "konsultasi" telah terdaftar di sistem AI kami.\n\n` +
        `Asisten AI Agent kami atau tim konsultan akan segera menghubungi Anda melalui nomor ini untuk tahap diskusi berikutnya.\n\n` +
        `— zesAI (Asisten Digital Zestify Technology)`;

      const wavioResponse = await fetch(
        `${process.env.WAVIO_REST_API}/messages/send-template`,
        {
          method: "POST",
          headers: {
            "X-API-Key": process.env.WAVIO_API_KEY, // FIX: 'K' besar pada X-API-Key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numberId: process.env.WAVIO_NUMBER_ID,
            to: body.no_whatsapp,
            templateName: "pengajuan_reply",
            templateLanguage: "id",
            components: [
              {
                // 1. ISI VARIABEL HEADER ({{1}} untuk sapaan nama)
                type: "header",
                parameters: [
                  {
                    type: "text",
                    text: body.name,
                  },
                ],
              },
            ],
          }),
        },
      );

      const wavioData = await wavioResponse.json();
      console.log("Status pengiriman chat WAvio:", wavioData);
    } catch (error) {
      console.error("Gagal mengirim chat otomatis:", error);
    }

    console.log("Berhasil:", consultation);
    return Response.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    console.error("PocketBase error:", error);
    return Response.json(
      {
        succes: false,
        data: error.message,
      },
      { status: 500 },
    );
  }
}
