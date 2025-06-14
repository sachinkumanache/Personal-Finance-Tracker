import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BudgetModal({ refreshBudgets, userId }) {
  const [form, setForm] = useState({ name: "", limit: "" });
  const [budgets, setBudgets] = useState([]);

  const API = `https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/budgets/${userId}.json`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.limit) return;

    const newBudget = {
      name: form.name,
      limit: parseFloat(form.limit),
    };

    try {
      await axios.post(API, newBudget);
      setForm({ name: "", limit: "" });
      fetchBudgets();
      refreshBudgets();
    } catch (err) {
      console.error("Failed to add budget:", err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(API);
      const data = res.data || {};
      const formatted = Object.entries(data).map(([id, budget]) => ({
        id,
        ...budget,
      }));
      setBudgets(formatted);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId]);

  return (
    <div className="bg-white p-4 shadow rounded my-6">
      <h3 className="text-xl font-semibold mb-4">Manage Budgets</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Category (e.g., Food)"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="limit"
          placeholder="Budget Limit (₹)"
          value={form.limit}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Budget
        </button>
      </form>

      {budgets.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Your Budgets</h4>
          <ul className="space-y-2">
            {budgets.map((b) => (
              <li
                key={b.id}
                className="flex justify-between items-center border p-3 rounded shadow-sm"
              >
                <span className="font-medium">{b.name}</span>
                <span className="text-gray-700">₹{b.limit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
