"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { pb } from "@/app/lib/pocketbase-dashboard";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    console.log(process.env.POCKETBASE_URL);

    try {
      const authData = await pb.collection('users').authWithPassword(username, password);
      const userRecord = authData.record;

      // Check if user is active
      if (!userRecord.is_aktif) {
        pb.authStore.clear();
        setLoading(false);
        alert("Your account is inactive.");
        return;
      }

      // Save to client-side cookie
      document.cookie = `pb_auth=${encodeURIComponent(
        JSON.stringify({
          token: pb.authStore.token,
          model: pb.authStore.record
        })
      )}; path=/; max-age=608800; sameSite=strict`;

      const userRole = userRecord.role;

      // Fixed route typo from "/dashborad/..." to "/dashboard/..."
      if (userRole === "admin angkatiga") {
        router.push("/dashboard/admin-angkatiga");
      } else if (userRole === "angkatiga") {
        router.push('/dashboard/angkatiga');
      } else {
        pb.authStore.clear();
        setLoading(false);
        alert("Unauthorized role.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Ambient backgrounds */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-white/5 blur-[100px]" />

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-lg font-semibold tracking-tight">Klien Zestify</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/8 bg-[#141416] p-8 shadow-2xl shadow-black/40">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Welcome
            </h1>
            <p className="mt-1 text-sm text-[#8b8b90]">
              Sign in to manage your contracts
            </p>
          </div>

          {/* FIXED: Added onSubmit handler */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm text-[#8b8b90]">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                disabled={loading}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-[#5c5c60] outline-none transition focus:border-white/25 focus:bg-white/[0.05] disabled:opacity-50"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm text-[#8b8b90]">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-[#5c5c60] outline-none transition focus:border-white/25 focus:bg-white/[0.05] disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8b90] hover:text-white transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.99] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}