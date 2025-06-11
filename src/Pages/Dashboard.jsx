import React from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import AddTransactionModal from "../components/Dashboard/AddTransactionModal";
import TransactionTable from "../components/Dashboard/TransactionTable";
import ExpenseChart from "../components/Dashboard/ExpenseChart";
import BudgetBar from "../components/Dashboard/BudgetBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Dashboard
      </h2>
      <div className="space-y-6">
        <SummaryCards />
        <BudgetBar />
        <AddTransactionModal />
        <ExpenseChart />
        <TransactionTable />
      </div>
    </div>
  );
}
