import React from "react";

export default function BudgetBar({ transactions, budgets }) {
  // Group expenses by category
  const categoryExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, txn) => {
      const category = txn.category || "Others";
      acc[category] = (acc[category] || 0) + txn.amount;
      return acc;
    }, {});

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Budget vs Expense (by Category)
      </h3>

      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets set. Please add budgets.</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const categoryName = budget.name;
            const budgetLimit = parseFloat(budget.limit);
            const spent = categoryExpenses[categoryName] || 0;
            const percentageUsed = Math.min((spent / budgetLimit) * 100, 100);
            const overBudget = spent > budgetLimit;

            return (
              <div key={budget.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">{categoryName}</span>
                  <span
                    className={`text-sm ${
                      overBudget ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    ₹{spent} / ₹{budgetLimit}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 transition-all duration-300 ${
                      overBudget ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${percentageUsed}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
