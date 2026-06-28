import { pbAI } from "@/app/lib/pocketbaseAI";

export async function POST(req) {
  try {
    const body = await req.json()
    const pb = await pbAI();

    const dataRecord = await pb.collection("clients").create({
        name: body.name,
        no_whatsapp: body.no_whatsapp,
        type: body.type || 'b2c',
        email: body.email,
        address: body.address || '',
        status: body.status || 'berjalan'
    })

    console.log("Berhasil:", dataRecord);
    return Response.json({
      success: true,
      data: dataRecord,
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
