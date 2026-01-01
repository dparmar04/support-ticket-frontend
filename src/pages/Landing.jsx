import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] bg-size-[24px_24px] opacity-60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl text-center space-y-8 sm:space-y-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600">
            Role-based · Automated · Scalable
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            A smarter way to manage
            <span className="block text-slate-700 mt-1">
              support tickets
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            A role-based support system built for admins, sales teams, and engineers.
            Auto-assign tickets, track progress, and resolve issues faster.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center
                         rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white
                         hover:bg-slate-800 active:scale-[0.98]
                         transition cursor-pointer"
            >
              Sign in
            </button>

            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center
                         rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium
                         text-slate-900 hover:bg-slate-100 active:scale-[0.98]
                         transition cursor-pointer"
            >
              Create account
            </button>
          </div>

          {/* Features */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
            <Feature
              title="Admin control"
              desc="Monitor tickets, assign engineers, and track performance in real time."
            />
            <Feature
              title="Sales friendly"
              desc="Raise tickets quickly and track resolution without technical overhead."
            />
            <Feature
              title="Engineer focused"
              desc="Get tickets assigned based on skills and update status effortlessly."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Feature = ({ title, desc }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
    <h3 className="font-medium text-slate-900">{title}</h3>
    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
      {desc}
    </p>
  </div>
);