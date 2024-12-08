"use client"

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export function BuySellSection({ coinId }: { coinId: string }) {
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<'buy' | 'sell'>('buy')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to process the transaction
    console.log(`${action} ${amount} of ${coinId}`)
    setAmount('')
  }

  return (
    <div className="rounded-3xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-bold mb-4">Buy / Sell {coinId.toUpperCase()}</h2>
      <div className="flex space-x-4 mb-4">
        <Button 
          onClick={() => setAction('buy')} 
          variant={action === 'buy' ? 'default' : 'outline'}
        >
          Buy
        </Button>
        <Button 
          onClick={() => setAction('sell')} 
          variant={action === 'sell' ? 'default' : 'outline'}
        >
          Sell
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <Button type="submit">
          {action === 'buy' ? 'Buy' : 'Sell'} {coinId.toUpperCase()}
        </Button>
      </form>
    </div>
  )
}

