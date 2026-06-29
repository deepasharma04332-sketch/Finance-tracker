export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
        No transactions yet. Add your first one!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Note</th>
            <th className="px-4 py-3 font-medium text-right">Amount</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-600">{t.date}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    t.type === "income"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {t.category_name}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">{t.note || "—"}</td>
              <td
                className={`px-4 py-3 text-right font-semibold ${
                  t.type === "income" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(t)}
                  className="text-indigo-600 hover:underline text-xs font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-rose-600 hover:underline text-xs font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
