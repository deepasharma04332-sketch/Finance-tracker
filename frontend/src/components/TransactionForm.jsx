import { useState, useEffect } from "react";

const today = new Date().toISOString().split("T")[0];

export default function TransactionForm({ categories, onSubmit, editingTxn, onCancelEdit }) {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category_id: "",
    note: "",
    date: today,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTxn) {
      setForm({
        amount: editingTxn.amount,
        type: editingTxn.type,
        category_id: editingTxn.category_id,
        note: editingTxn.note || "",
        date: editingTxn.date,
      });
    }
  }, [editingTxn]);

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // reset category if switching type
      ...(name === "type" ? { category_id: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.amount || !form.category_id) {
      setError("Amount and category are required");
      return;
    }

    try {
      await onSubmit({ ...form, amount: parseFloat(form.amount) });
      setForm({ amount: "", type: "expense", category_id: "", note: "", date: today });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">
        {editingTxn ? "Edit Transaction" : "Add Transaction"}
      </h3>

      {error && <p className="text-rose-600 text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, type: "expense", category_id: "" }))}
          className={`py-2 rounded-lg text-sm font-medium transition ${
            form.type === "expense"
              ? "bg-rose-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, type: "income", category_id: "" }))}
          className={`py-2 rounded-lg text-sm font-medium transition ${
            form.type === "income"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Income
        </button>
      </div>

      <div>
        <label className="text-sm text-gray-600 font-medium">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          placeholder="0.00"
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600 font-medium">Category</label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select category</option>
          {filteredCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-600 font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600 font-medium">Note (optional)</label>
        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="e.g. Groceries"
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
        >
          {editingTxn ? "Update" : "Add"}
        </button>
        {editingTxn && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
