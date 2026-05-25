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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 space-y-6 animate-scale-in"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500">
            Sign in to your account
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                       transition-all duration-200"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                       transition-all duration-200"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-xl
                     bg-indigo-600 px-4 py-3 text-sm font-medium text-white
                     shadow-lg shadow-indigo-200
                     hover:bg-indigo-700 hover:shadow-indigo-300
                     active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 cursor-pointer"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-slate-500">
          New here?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;