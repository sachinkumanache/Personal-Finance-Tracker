import React from "react";

export default function SummaryCards({ transactions }) {
  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const savings = totalIncome - totalExpenses;

  const summary = [
    { label: "Total Income", amount: `₹${totalIncome}`, color: "green" },
    { label: "Total Expenses", amount: `₹${totalExpenses}`, color: "red" },
    { label: "Savings", amount: `₹${savings}`, color: "blue" },
  ];

  const borderColorMap = {
    green: "border-green-500",
    red: "border-red-500",
    blue: "border-blue-500",
  };

  const textColorMap = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {summary.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-lg shadow-md bg-white border-l-4 ${
            borderColorMap[item.color]
          }`}
        >
          <h4 className="text-gray-700 text-sm font-medium">{item.label}</h4>
          <p className={`text-xl font-semibold ${textColorMap[item.color]}`}>
            {item.amount}
          </p>
        </div>
      ))}
    </div>
  );
}
