import React, { useState } from "react";

export default function AddTransactionModal({ onAdd }) {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    const transaction = {
      type,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await fetch(
        "https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/transactions.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        }
      );

      setShow(false);
      setAmount("");
      setType("expense");
      onAdd(); // Refresh transactions in Dashboard
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShow(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Transaction
      </button>

      {show && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Add Transaction</h3>
          <select
            className="w-full border p-2 mb-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-2 mb-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category (e.g., Food)"
            className="w-full border p-2 mb-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
