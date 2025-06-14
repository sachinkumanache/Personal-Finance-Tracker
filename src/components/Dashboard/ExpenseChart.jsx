import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8", // category 1
  "#82ca9d", // category 2
  "#ffc658", // ...
  "#ff7f50",
  "#00c49f",
  "#a0522d",
  "#ff1493",
  "#20b2aa",
  "#4CAF50", // savings (green shade)
];

export default function ExpenseChart({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const categoryMap = {};

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, txn) => {
      const category = txn.category || "Others";
      categoryMap[category] = (categoryMap[category] || 0) + txn.amount;
      return acc + txn.amount;
    }, 0);

  const savings = income - totalExpenses;

  const chartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  if (savings > 0) {
    chartData.push({ name: "Savings", value: savings });
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Expenses & Savings Distribution
      </h3>

      {chartData.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
