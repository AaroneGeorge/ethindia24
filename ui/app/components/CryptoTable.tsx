import { ChevronDown, Search } from 'lucide-react'

interface CryptoData {
  percent: number
  label: string
  coin: string
  amount: number
  tvl: number
  address: string
}

export function CryptoTable({ data }: { data: CryptoData[] }) {
  return (
    <div className="rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 border-b-2 border-black">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-primary font-bold">Table header</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border-2 border-black"
            />
          </div>
        </div>
        <p className="text-gray-500">Crypto ipsum bitcoin ethereum dogecoin litecoin.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="table-header">
                Percent <ChevronDown className="inline w-4 h-4" />
              </th>
              <th className="table-header">
                Label <ChevronDown className="inline w-4 h-4" />
              </th>
              <th className="table-header">
                Coin <ChevronDown className="inline w-4 h-4" />
              </th>
              <th className="table-header">
                Amount <ChevronDown className="inline w-4 h-4" />
              </th>
              <th className="table-header">
                TVL <ChevronDown className="inline w-4 h-4" />
              </th>
              <th className="table-header">
                Address <ChevronDown className="inline w-4 h-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b-2 border-black">
                <td className="table-cell">{row.percent}%</td>
                <td className="table-cell">{row.label}%</td>
                <td className="table-cell">{row.coin}</td>
                <td className="table-cell">${row.amount.toLocaleString()}</td>
                <td className="table-cell">${row.tvl.toLocaleString()}</td>
                <td className="table-cell font-mono">{row.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

