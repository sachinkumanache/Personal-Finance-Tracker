import React, { useEffect, useState } from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import BudgetBar from "../components/Dashboard/BudgetBar";
import ExpenseChart from "../components/Dashboard/ExpenseChart";
import TransactionTable from "../components/Dashboard/TransactionTable";
import AddTransactionModal from "../components/Dashboard/AddTransactionModal";
import BudgetModal from "../components/Dashboard/BudgetModal";
import axios from "axios";

const API_TRANSACTIONS =
  "https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/transactions.json";

const API_BUDGETS =
  "https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/budgets.json";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // 🔄 Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_TRANSACTIONS);
      const data = res.data || {};
      const formatted = Object.entries(data).map(([id, txn]) => ({
        id,
        ...txn,
      }));
      setTransactions(formatted);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  // 🔄 Fetch Budgets
  const fetchBudgets = async () => {
    try {
      const res = await axios.get(API_BUDGETS);
      const data = res.data || {};
      const formatted = Object.entries(data).map(([id, budget]) => ({
        id,
        ...budget,
      }));
      setBudgets(formatted);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Dashboard</h2>

      <div className="space-y-6">
        <SummaryCards transactions={transactions} />
        <BudgetBar transactions={transactions} budgets={budgets} />
        <BudgetModal refreshBudgets={fetchBudgets} />
        <AddTransactionModal onAdd={fetchTransactions} budgets={budgets} />
        <ExpenseChart transactions={transactions} />
        <TransactionTable
          transactions={transactions}
          setTransactions={setTransactions}
          refreshData={fetchTransactions}
        />
      </div>
    </div>
  );
}
