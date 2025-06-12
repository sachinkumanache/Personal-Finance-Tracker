// src/components/Dashboard/TransactionTable.jsx
import React from "react";

const transactions = [
  { id: 1, type: "Income", amount: "₹20,000", date: "2025-06-01" },
  { id: 2, type: "Expense", amount: "₹3,000", date: "2025-06-03" },
  { id: 3, type: "Expense", amount: "₹1,200", date: "2025-06-05" },
];

export default function TransactionTable() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{txn.type}</td>
              <td className="p-2">{txn.amount}</td>
              <td className="p-2">{txn.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
