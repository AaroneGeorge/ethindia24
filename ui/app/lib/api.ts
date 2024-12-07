const COINGECKO_API_URL = 'https://pro-api.coingecko.com/api/v3/ping?x_cg_pro_api_key=CG-1BRiJ1RiM8ThVMczhwoWE4SE';

export async function getTopMemeCoins(limit: number = 10) {
  const response = await fetch(
    `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch meme coins');
  }

  return response.json();
}

export async function getCoinData(id: string) {
  const response = await fetch(
    `${COINGECKO_API_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for coin: ${id}`);
  }

  return response.json();
}

