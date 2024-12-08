interface CoinDetailsProps {
    coin: {
      name: string
      symbol: string
      current_price: {
        usd: number; // Update to reflect the nested structure
      };      
      price_change_percentage_24h: number
      market_data?:{
        current_price: {
            usd: number;
        }
        price_change_percentage_24h: number
        market_cap: {
            usd: number;
        }
        total_volume: {
            usd: number
        }

      }
    }
  }
  
  export function CoinDetails({ coin }: CoinDetailsProps) {
    console.log('coin market data price',coin.market_data?.price_change_percentage_24h)
    return (
      <div className="rounded-3xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-bold mb-4">{coin.name} ({coin.symbol.toUpperCase()})</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-2xl font-bold">${coin.market_data != null ? coin.market_data?.current_price.usd : 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">24h Change</p>
            <p className={`text-2xl font-bold ${coin.market_data?.price_change_percentage_24h != null && coin.market_data?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {coin.market_data != null ? coin.market_data?.price_change_percentage_24h : 'N/A'}%
            </p>
          </div>
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p className="text-2xl font-bold">${coin.market_data != null ? coin.market_data?.market_cap.usd.toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">24h Volume</p>
            <p className="text-2xl font-bold">${coin.market_data != null ? coin.market_data?.total_volume.usd.toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    )
  }
  
  