import { NextResponse } from 'next/server'
import { getTopMemeCoins } from "../../lib/api"

export async function GET() {
  try {
    const memeCoins = await getTopMemeCoins(20)
    return NextResponse.json(memeCoins)
  } catch (error) {
    console.error("Failed to fetch meme coins:", error)
    return NextResponse.json({ error: "Failed to fetch meme coins" }, { status: 500 })
  }
}

