// src/components/Dashboard/AddTransactionModal.jsx
import React, { useState } from "react";

export default function AddTransactionModal() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    console.log({ type, amount });
    setShow(false);
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
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-2 mb-2 rounded"
            onChange={(e) => setAmount(e.target.value)}
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
