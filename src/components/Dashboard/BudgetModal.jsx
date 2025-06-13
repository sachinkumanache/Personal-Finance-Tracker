import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  "https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/budgets";

export default function BudgetModal({ refreshBudgets }) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState({});

  // Fetch budgets from Firebase
  const fetchBudgets = async () => {
    try {
      const res = await axios.get(`${API_URL}.json`);
      setBudgets(res.data || {});
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleSave = async () => {
    if (!category || !amount) return;
    const existingEntry = Object.entries(budgets).find(
      ([key, val]) => val.category === category
    );

    const budgetData = { category, amount: parseFloat(amount) };

    try {
      if (existingEntry) {
        await axios.put(`${API_URL}/${existingEntry[0]}.json`, budgetData);
      } else {
        await axios.post(`${API_URL}.json`, budgetData);
      }
      fetchBudgets();
      setCategory("");
      setAmount("");
      setShow(false);
      if (refreshBudgets) refreshBudgets();
    } catch (err) {
      console.error("Failed to save budget:", err);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setShow(!show)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Set Budgets
      </button>

      {show && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4 max-w-md">
          <h3 className="text-lg font-semibold mb-2">Set Monthly Budget</h3>
          <input
            type="text"
            placeholder="Category (e.g., Food)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
