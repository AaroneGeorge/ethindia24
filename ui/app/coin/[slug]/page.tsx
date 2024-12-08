"use client";
import { CoinDetails } from "../../components/coin-details";
import { getCoinData } from "../../lib/api";
import { BuySellSection } from "../../components/but-sell-section";
import { LargeChart } from "../../components/large-chart";
import { AIChatbot } from "../../components/ai-chatbot";
import { Nav } from "../../../app/components/Nav";

export default async function CoinPage({
  params,
}: {
  params: { slug: string };
}) {
  const coinData = await getCoinData(params.slug);
  console.log(params.slug, "params.slug");
  if (!coinData) {
    return <div>Coin not found</div>;
  }

  return (
    <>
      <main className="min-h-screen">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CoinDetails coin={coinData} />
              <LargeChart coinId={params.slug} />
              <BuySellSection coinId={params.slug} />
            </div>
            <div className="lg:col-span-1">
              <AIChatbot coinId={params.slug} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
