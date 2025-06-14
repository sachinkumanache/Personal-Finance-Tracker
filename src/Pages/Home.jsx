// src/Pages/Home.jsx
import React from "react";
import LogoutButton from "../components/Auth/LogoutButton";

export default function Home({ user }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-200 to-indigo-200 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to FinEdge 💰
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Track your income, expenses, and savings with beautiful graphs and
        real-time insights.
      </p>

      <div className="flex gap-4">
        {!user ? (
          <>
            <a
              href="/login"
              className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            >
              Register
            </a>
          </>
        ) : (
          <LogoutButton />
        )}
      </div>
    </div>
  );
}
