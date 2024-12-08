import { useRouter } from "next/navigation";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface PriceCardProps {
  id: string; // Add id prop
  name: string;
  symbol: string;
  price: number | null;
  change: number | null;
  sparkline: number[];
}

export function PriceCard({
  id,
  name,
  symbol,
  price,
  change,
  sparkline,
}: PriceCardProps) {
  const router = useRouter();
  const data = sparkline?.map((value, index) => ({ value, index })) || [];

  return (
    <div
      className="price-card cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/coin/${id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-primary font-bold">{name}</div>
          <div className="text-gray-500">{symbol.toUpperCase()}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">
            {price !== null
              ? `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })}`
              : "N/A"}
          </div>
          <div
            className={
              change !== null && change !== undefined
                ? change >= 0
                  ? "text-green-500"
                  : "text-red-500"
                : ""
            }
          >
            {change !== null && change !== undefined
              ? `${change.toFixed(2)}%`
              : "N/A"}{" "}
            24h
          </div>
        </div>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                change !== null
                  ? change >= 0
                    ? "#10B981"
                    : "#EF4444"
                  : "#6B7280"
              }
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
