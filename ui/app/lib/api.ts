const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export async function getTopMemeCoins(limit: number = 10) {
  const url = `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-pro-api-key': 'CG-1BRiJ1RiM8ThVMczhwoWE4SE'
    }
  };

  console.log(`Fetching top meme coins from: ${url}`);

  const response = await fetch(url, options);
  
  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meme coins');
  }

  return response.json();
}

export async function getCoinData(id: string) {
  const url = `${COINGECKO_API_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-1BRiJ1RiM8ThVMczhwoWE4SE'
    }
  };

  console.log(`Fetching data for coin: ${id} from: ${url}`);

  const response = await fetch(url, options);
  
  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data for coin: ${id}`);
  }

  return response.json();
}

