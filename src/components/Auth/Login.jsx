import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let navigate = useNavigate();
  async function handleClick(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleClick}
        >
          Login
        </button>
      </form>
    </div>
  );
}
