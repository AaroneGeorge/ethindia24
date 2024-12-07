"use client"

import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number | null
  price_change_percentage_24h: number | null
  market_cap: number | null
  total_volume: number | null
}

export function CryptoTable({ initialData }: { initialData: CryptoData[] }) {
  const [data, setData] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = (data || []).filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 border-b-2 border-black">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-primary font-bold">Top Meme Coins</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border-2 border-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <p className="text-gray-500">Real-time data from CoinGecko API</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="table-header">Name</th>
              <th className="table-header">Symbol</th>
              <th className="table-header">Price</th>
              <th className="table-header">24h %</th>
              <th className="table-header">Market Cap</th>
              <th className="table-header">Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((coin) => (
              <tr key={coin.id} className="border-b-2 border-black">
                <td className="table-cell">{coin.name}</td>
                <td className="table-cell">{coin.symbol.toUpperCase()}</td>
                <td className="table-cell">
                  {coin.current_price !== null
                    ? `$${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`
                    : 'N/A'}
                </td>
                <td className={`table-cell ${
                  coin.price_change_percentage_24h !== null
                    ? coin.price_change_percentage_24h >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                    : ''
                }`}>
                  {coin.price_change_percentage_24h !== null
                    ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                    : 'N/A'}
                </td>
                <td className="table-cell">
                  {coin.market_cap !== null
                    ? `$${coin.market_cap.toLocaleString()}`
                    : 'N/A'}
                </td>
                <td className="table-cell">
                  {coin.total_volume !== null
                    ? `$${coin.total_volume.toLocaleString()}`
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

