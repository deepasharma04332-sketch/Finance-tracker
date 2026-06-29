import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTxn, setEditingTxn] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [txnRes, catRes] = await Promise.all([
        api.get("/transactions"),
        api.get("/categories"),
      ]);
      setTransactions(txnRes.data);
      setCategories(catRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (form) => {
    if (editingTxn) {
      await api.put(`/transactions/${editingTxn.id}`, form);
      setEditingTxn(null);
    } else {
      await api.post("/transactions", form);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    await api.delete(`/transactions/${id}`);
    loadData();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TransactionForm
              categories={categories}
              onSubmit={handleSubmit}
              editingTxn={editingTxn}
              onCancelEdit={() => setEditingTxn(null)}
            />
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : (
              <TransactionList
                transactions={transactions}
                onEdit={setEditingTxn}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
