import React from "react";

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const remaining = income - expenses;

  const summary = [
    { label: "Total Income", amount: `₹${income}`, color: "green" },
    { label: "Total Expenses", amount: `₹${expenses}`, color: "red" },
    { label: "Remaining", amount: `₹${remaining}`, color: "blue" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {summary.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-lg shadow-md bg-white border-l-4 border-${item.color}-500`}
        >
          <h4 className="text-gray-700 text-sm font-medium">{item.label}</h4>
          <p className={`text-${item.color}-600 text-xl font-semibold`}>
            {item.amount}
          </p>
        </div>
      ))}
    </div>
  );
}
