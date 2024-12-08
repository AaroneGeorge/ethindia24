import { NextResponse } from "next/server";
import { getCoinData } from "../../../lib/api";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const coinData = await getCoinData(params.id);
    return NextResponse.json(coinData);
  } catch (error) {
    console.error("Failed to fetch coin data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin data" },
      { status: 500 }
    );
  }
}
