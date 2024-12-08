"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Nav } from "../../components/Nav";
import { ChatModal } from "../../components/ChatModal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../../components/ui/button";

export default function MemecoinPage() {
  const params = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`/api/coin/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch coin data");
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCoinData();
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coinData) return <div>No data available</div>;

  // Transform price data for the chart
  const priceData =
    coinData?.market_data?.sparkline_7d?.price?.map((price, index) => ({
      time: index,
      price: price || 0,
    })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Price Chart */}
            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4 mb-6">
                {coinData.image?.small && (
                  <img
                    src={coinData.image.small}
                    alt={`${coinData.name} logo`}
                    className="w-8 h-8"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold">{coinData.name}</h1>
                  <p className="text-gray-500">
                    {coinData.symbol?.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <XAxis dataKey="time" />
                    <YAxis
                      domain={["auto", "auto"]}
                      tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value.toFixed(6)}`, "Price"]}
                      labelFormatter={(label) => `${label}h ago`}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Trading Actions */}
            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => console.log("Buy clicked")}
                >
                  Buy {coinData.symbol?.toUpperCase()}
                </Button>
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={() => console.log("Sell clicked")}
                >
                  Sell {coinData.symbol?.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Chat */}
          <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ChatModal isOpen={true} onClose={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
