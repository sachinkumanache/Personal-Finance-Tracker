import React from "react";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
