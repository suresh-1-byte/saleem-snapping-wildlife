"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('Attempting login with:', { username, passwordLength: password.length });
      
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json();
      console.log('Login response:', { status: res.status, data });

      if (res.ok && data.success) {
        console.log('Login successful! Redirecting...');
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        console.error('Login failed:', data.error);
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("An error occurred. Please try again. " + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/hero%20pg.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-charcoal/90 backdrop-blur-lg border border-white/10 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wider mb-2">ADMIN LOGIN</h1>
          <p className="text-sm text-white/60">Saleem Snapping Wildlife CMS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green transition-colors"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-earthy-green text-white font-medium tracking-wide uppercase rounded hover:bg-earthy-green-light transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
