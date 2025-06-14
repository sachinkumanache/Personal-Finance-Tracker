// src/components/LogoutButton.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      navigate("/"); // Go to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
    >
      Logout
    </button>
  );
}
