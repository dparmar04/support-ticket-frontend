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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create an account
          </h2>
          <p className="text-sm text-slate-500">
            Get started in a few seconds
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10
                       transition"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10
                       transition"
            required
          />
        </div>

        {/* Role */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Role
          </label>
          {/* <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm bg-white
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10
                       transition cursor-pointer"
          >
            <option value="sales">Sales</option>
            <option value="engineer">Engineer</option>
          </select> */}
          <SelectBox
            name="role"
            value={form.role}
            onChange={(val) => setForm({ ...form, role: val })}
            options={["sales", "engineer"]}
          />
        </div>

        {/* Skills */}
        {form.role === "engineer" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Skills
            </label>
            <input
              name="skills"
              placeholder="react, node, mongodb"
              value={form.skills}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900/10
                         transition"
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
                     bg-slate-900 px-4 py-3 text-sm font-medium text-white
                     hover:bg-slate-800 active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition cursor-pointer"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-slate-900 font-medium hover:underline cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}