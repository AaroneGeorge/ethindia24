"use client"
import { Nav } from "../components/Nav"
import { PriceCard } from "../components/PriceCard"
import { CryptoTable } from "../components/CryptoTable"
import React from "react"
import { useState } from "react"
import { ChatModal } from "../components/ChatModal"

const mockChartData = Array.from({ length: 20 }, (_, i) => ({
  value: 50000 + Math.random() * 5000
}))

const mockTableData = Array.from({ length: 6 }, () => ({
  percent: 12.15,
  label: "12.15",
  coin: "WETH",
  amount: 131189987,
  tvl: 374973328,
  address: "0x6b1...1d0f"
}))

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl border-2 border-black p-8 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-primary text-4xl font-bold mb-2">Hello,</h1>
          <p className="text-gray-500 mb-4">Lorem ipsum dolor sit amet, adipiscing elit.</p>
          <p className="mb-8 max-w-3xl">
            Helium airweave compound ankr ethereum siacoin waves holo solana.
            Uniswap revain compound polkadot fantom hedera chiliz stacks audius EOS.
            Helium airweave compound ankr ethereum siacoin waves holo solana.
          </p>
          <button 
          className="px-6 py-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          onClick={() => setIsChatOpen(true)}
>
            Mint a thing →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <PriceCard
            name="Bitcoin"
            symbol="BTC"
            price={51595}
            change={1.13}
            data={mockChartData}
          />
          <PriceCard
            name="Bitcoin"
            symbol="BTC"
            price={51595}
            change={1.13}
            data={mockChartData}
          />
          <PriceCard
            name="Bitcoin"
            symbol="BTC"
            price={51595}
            change={1.13}
            data={mockChartData}
          />
        </div>

        <CryptoTable data={mockTableData} />
      </div>
      <footer className="text-center py-8 text-gray-500">
        DGEN Design System 2024
      </footer>
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  )
}

