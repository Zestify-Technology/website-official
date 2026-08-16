import { pbAI } from "@/app/lib/pocketbaseAI";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "";
    const perPage = Number(searchParams.get("perPage")) || 20;

    const pb = await pbAI();

    const dataRecord = await pb.collection("clients").getList(1, perPage, {
      ...(filter && { filter }),
      sort: "-created",
    });

    return Response.json({
      succes: true,
      data: dataRecord,
    });
  } catch (error) {
    return Response.json(
      {
        succes: false,
        data: error.message,
      },
      { status: 500 },
    );
  }
}
