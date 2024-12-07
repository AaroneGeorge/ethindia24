"use client"
import { Line, LineChart, ResponsiveContainer } from "recharts"

interface PriceCardProps {
  symbol: string
  name: string
  price: number
  change: number
  data: { value: number }[]
}

export function PriceCard({ symbol, name, price, change, data, }: PriceCardProps) {
  return (
    <div className="price-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-primary font-bold">{name}</div>
          <div className="text-gray-500">{symbol}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">${price.toLocaleString()}</div>
          <div className="text-gray-500">{change}% 7d</div>
        </div>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FF1493"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

