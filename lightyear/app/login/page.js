"use client";
import { useState } from "react";
import Layout from "../components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = "/";
    } else {
      setError(data.message);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-full">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {error && <div className="login-error">{error}</div>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
