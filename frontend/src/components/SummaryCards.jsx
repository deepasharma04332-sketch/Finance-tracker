export default function SummaryCards({ summary }) {
  const cards = [
    {
      label: "Total Income",
      value: summary.total_income,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Expense",
      value: summary.total_expense,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Savings",
      value: summary.savings,
      color: summary.savings >= 0 ? "text-indigo-600" : "text-rose-600",
      bg: summary.savings >= 0 ? "bg-indigo-50" : "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} rounded-xl p-5 shadow-sm`}>
          <p className="text-sm text-gray-500 font-medium">{card.label}</p>
          <p className={`text-2xl font-bold mt-1 ${card.color}`}>
            ₹{card.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </p>
        </div>
      ))}
    </div>
  );
}
