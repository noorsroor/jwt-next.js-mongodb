"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 w-full mb-2"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 w-full mb-4"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Login
        </button>
      </form>
    </div>
  );
}
