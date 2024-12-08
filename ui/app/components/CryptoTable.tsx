"use client";

import { useRouter } from "next/navigation";

export function CryptoTable({ initialData }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Symbol</th>
            <th className="table-header">Price</th>
            <th className="table-header">24h %</th>
            <th className="table-header">Market Cap</th>
            <th className="table-header">Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((coin) => (
            <tr
              key={coin.id}
              onClick={() => router.push(`/coin/${coin.id}`)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="table-cell">{coin.name}</td>
              <td className="table-cell">{coin.symbol.toUpperCase()}</td>
              <td className="table-cell">
                {coin.current_price !== null
                  ? `$${coin.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}`
                  : "N/A"}
              </td>
              <td
                className={`table-cell ${
                  coin.price_change_percentage_24h !== null
                    ? coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                    : ""
                }`}
              >
                {coin.price_change_percentage_24h !== null
                  ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                  : "N/A"}
              </td>
              <td className="table-cell">
                {coin.market_cap !== null
                  ? `$${coin.market_cap.toLocaleString()}`
                  : "N/A"}
              </td>
              <td className="table-cell">
                {coin.total_volume !== null
                  ? `$${coin.total_volume.toLocaleString()}`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
