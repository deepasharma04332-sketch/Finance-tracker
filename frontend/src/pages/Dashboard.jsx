import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import PieChartCategory from "../charts/PieChartCategory";
import LineChartTrend from "../charts/LineChartTrend";

const today = new Date();
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Dashboard() {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    savings: 0,
    category_breakdown: [],
  });
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [summaryRes, trendRes] = await Promise.all([
        api.get(`/summary/monthly?year=${year}&month=${month}`),
        api.get(`/summary/trend?months=6`),
      ]);
      setSummary(summaryRes.data);
      setTrend(trendRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <div className="flex gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-sm"
            >
              {months.map((m, idx) => (
                <option key={m} value={idx + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-sm"
            >
              {[today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1].map(
                (y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : (
          <div className="space-y-6">
            <SummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-2">Spending by Category</h3>
                <PieChartCategory data={summary.category_breakdown} />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-2">6-Month Trend</h3>
                <LineChartTrend data={trend} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
