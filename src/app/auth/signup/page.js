"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input 
          type="text" 
          placeholder="Name" 
          className="border p-2 w-full mb-2"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
}
