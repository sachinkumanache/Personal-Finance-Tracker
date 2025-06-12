// src/components/Dashboard/BudgetBar.jsx
import React from "react";

export default function BudgetBar() {
  const used = 60; // percentage

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-2">Monthly Budget Usage</h4>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${used}%` }}
        ></div>
      </div>
      <p className="mt-1 text-sm text-gray-600">{used}% used</p>
    </div>
  );
}
