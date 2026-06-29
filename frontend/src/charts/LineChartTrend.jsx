import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineChartTrend({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#10b981"
          strokeWidth={2.5}
          name="Income"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#f43f5e"
          strokeWidth={2.5}
          name="Expense"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
