import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      toast.success("Logged in successfully");

      const role = res.data.user.role;
      if (role === "sales") navigate("/sales");
      if (role === "engineer") navigate("/engineer");
      if (role === "admin") navigate("/admin");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500">
            Sign in to your account
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10
                       transition"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10
                       transition"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-xl
                     bg-slate-900 px-4 py-3 text-sm font-medium text-white
                     hover:bg-slate-800 active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition cursor-pointer"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-slate-500">
          New here?{" "}
          <Link
            to="/register"
            className="text-slate-900 font-medium hover:underline cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;