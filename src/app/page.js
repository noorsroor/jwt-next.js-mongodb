"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    
    if (token) {
      fetch("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold">
        {user ? `Welcome, ${user.name}! 🎉` : "Welcome to Our Site!"}
      </h1>
      {!user && <a href="/login" className="mt-4 text-blue-500">Login to continue</a>}
    </div>
  );
}
