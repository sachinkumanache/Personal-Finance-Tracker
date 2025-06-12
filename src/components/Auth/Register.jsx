import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  const navigate = useNavigate();
  async function handleClick(e) {
    e.preventDefault();
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/Login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Register</h2>
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
          className="w-full bg-green-500 text-white p-2 rounded"
          onClick={handleClick}
        >
          Register
        </button>
      </form>
    </div>
  );
}
