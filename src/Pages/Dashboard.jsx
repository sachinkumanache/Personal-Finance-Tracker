// 📁 Dashboard.jsx
import React, { useEffect, useState } from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import BudgetBar from "../components/Dashboard/BudgetBar";
import ExpenseChart from "../components/Dashboard/ExpenseChart";
import TransactionTable from "../components/Dashboard/TransactionTable";
import AddTransactionModal from "../components/Dashboard/AddTransactionModal";
import BudgetModal from "../components/Dashboard/BudgetModal";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import LogoutButton from "../components/Auth/LogoutButton";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [userId, setUserId] = useState(null);

  // 👤 Get current user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔄 Fetch Transactions
  const fetchTransactions = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/transactions/${userId}.json`
      );
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
    if (!userId) return;
    try {
      const res = await axios.get(
        `https://personalfinanacetracker-default-rtdb.asia-southeast1.firebasedatabase.app/budgets/${userId}.json`
      );
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
    if (userId) {
      fetchTransactions();
      fetchBudgets();
    }
  }, [userId]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Your Dashboard</h2>
        <LogoutButton />
      </div>

      <div className="space-y-6">
        <SummaryCards transactions={transactions} />
        <BudgetBar transactions={transactions} budgets={budgets} />
        <BudgetModal refreshBudgets={fetchBudgets} userId={userId} />
        <AddTransactionModal
          onAdd={fetchTransactions}
          budgets={budgets}
          userId={userId}
        />
        <ExpenseChart transactions={transactions} />
        <TransactionTable
          transactions={transactions}
          setTransactions={setTransactions}
          refreshData={fetchTransactions}
          userId={userId}
        />
      </div>
    </div>
  );
}
