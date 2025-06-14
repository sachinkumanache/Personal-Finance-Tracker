import React, { useState } from "react";
import axios from "axios";

export default function TransactionTable({
  transactions,
  setTransactions,
  refreshData,
  userId,
}) {
  const [filterMonth, setFilterMonth] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    type: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/transactions/${userId}/${id}.json`
      );
      refreshData();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleEditClick = (txn) => {
    setEditingId(txn.id);
    setEditForm({
      type: txn.type,
      amount: txn.amount,
      category: txn.category || "",
      date: txn.date,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const updatedData = {
        ...editForm,
        amount: parseFloat(editForm.amount),
      };
      await axios.patch(
        `https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/transactions/${userId}/${editingId}.json`,
        updatedData
      );
      setEditingId(null);
      refreshData();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (!filterMonth) return true;
    return txn.date.startsWith(filterMonth);
  });

  const months = Array.from(
    new Set(transactions.map((txn) => txn.date.slice(0, 7)))
  );

  const getCategoryOptions = (type) => {
    if (type === "income") {
      return ["Salary", "Rent", "Other"];
    } else {
      return ["Food", "Education", "Movies", "Bills", "Rent", "Other"];
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id} className="border-b hover:bg-gray-50">
                {editingId === txn.id ? (
                  <>
                    <td className="p-2">
                      <select
                        name="type"
                        value={editForm.type}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        name="amount"
                        type="number"
                        value={editForm.amount}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      >
                        {getCategoryOptions(editForm.type).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        name="date"
                        type="date"
                        value={editForm.date}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={handleEditSave}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 capitalize">{txn.type}</td>
                    <td className="p-2">₹{txn.amount}</td>
                    <td className="p-2">{txn.category || "-"}</td>
                    <td className="p-2">{txn.date}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEditClick(txn)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(txn.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredTransactions.map((txn) => (
          <div key={txn.id} className="border rounded p-3 shadow-sm bg-gray-50">
            {editingId === txn.id ? (
              <>
                <div className="mb-2">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-medium">Amount</label>
                  <input
                    name="amount"
                    type="number"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  >
                    {getCategoryOptions(editForm.type).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    name="date"
                    type="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleEditSave}
                    className="text-green-600 hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Type:</strong> {txn.type}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{txn.amount}
                </p>
                <p>
                  <strong>Category:</strong> {txn.category || "-"}
                </p>
                <p>
                  <strong>Date:</strong> {txn.date}
                </p>
                <div className="flex justify-end gap-4 mt-2">
                  <button
                    onClick={() => handleEditClick(txn)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(txn.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <p className="text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
}
