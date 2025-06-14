import React, { useState } from "react";
import axios from "axios";

export default function AddTransactionModal({ userId, budgets, onAdd }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    try {
      const newTransaction = {
        ...form,
        amount: parseFloat(form.amount),
      };
      await axios.post(
        `https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/transactions/${userId}.json`,
        newTransaction
      );
      setShowModal(false);
      setForm({ type: "income", amount: "", category: "", date: "" });
      onAdd();
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const categoryOptions =
    form.type === "income"
      ? ["Salary", "Rent", "Other"]
      : ["Food", "Education", "Movies", "Bills", "Rent", "Other"];

  return (
    <div className="my-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Transaction
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Amount</label>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
