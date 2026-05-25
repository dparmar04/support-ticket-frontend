import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import SelectBox from '../components/SelectBox'
import toast from "react-hot-toast";


export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      skills:
        form.role === "engineer"
          ? form.skills.split(",").map((s) => s.trim())
          : [],
    };

    try {
      await api.post("/auth/register", payload);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to create account");
      console.error(err);
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125A3.375 3.375 0 004.5 9.75v.218c0 .534.155 1.055.442 1.502L9 16.5m-3.75 3.75h12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Create an account
          </h2>
          <p className="text-sm text-slate-500">
            Get started in a few seconds
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                       transition-all duration-200"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                       transition-all duration-200"
            required
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Role
          </label>
          <SelectBox
            name="role"
            value={form.role}
            onChange={(val) => setForm({ ...form, role: val })}
            options={["sales", "engineer"]}
          />
        </div>

        {/* Skills */}
        {form.role === "engineer" && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Skills
            </label>
            <input
              name="skills"
              placeholder="react, node, mongodb"
              value={form.skills}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                         transition-all duration-200"
              required
            />
            <p className="text-xs text-slate-400">
              Comma separated skills used for auto-assignment.
            </p>
          </div>
        )}

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
          {loading ? "Creating account…" : "Create account"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}