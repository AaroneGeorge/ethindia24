"use client"
import { Nav } from "../components/Nav"
import { PriceCard } from "../components/PriceCard"
import { CryptoTable } from "../components/CryptoTable"
import React, { useEffect } from "react"
import { useState } from "react"
import { ChatModal } from "../components/ChatModal"
import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// const mockChartData = Array.from({ length: 20 }, (_, i) => ({
//   value: 50000 + Math.random() * 5000
// }))

// const mockTableData = Array.from({ length: 6 }, () => ({
//   percent: 12.15,
//   label: "12.15",
//   coin: "WETH",
//   amount: 131189987,
//   tvl: 374973328,
//   address: "0x6b1...1d0f"
// }))

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { data: memeCoins, error } = useSWR('/api/top-meme-coins', fetcher, { refreshInterval: 60000 })
  console.log("memeCoins",memeCoins)
  if (error) console.error("Failed to fetch meme coins:", error)


  return (
    <main className="min-h-screen">
    <Nav />
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="rounded-3xl flex flex-col items-center text-center border-2 border-black p-8 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-primary text-4xl font-bold mb-2">Hello,</h1>
        <p className="text-gray-500 mb-4">Welcome to the meme coin marketplace!</p>
        <p className="mb-8 max-w-3xl">
          Explore the latest trends in meme coins, track their prices, and stay updated with real-time market data.
          Our platform provides comprehensive information on various meme tokens, helping you make informed decisions.
        </p>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="px-6 py-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Mint a thing →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {Array.isArray(memeCoins) && memeCoins.slice(0, 3).map((coin: any) => (
          <PriceCard
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            change={coin.price_change_percentage_7d_in_currency}
            sparkline={coin.sparkline_in_7d?.price || []}
          />
        ))}
      </div>

      {memeCoins && <CryptoTable initialData={memeCoins} />}
    </div>
    <footer className="text-center py-8 text-gray-500">
      DGEN Design System 2024
    </footer>
    <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
  </main>
  )
}

