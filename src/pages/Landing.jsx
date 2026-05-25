import { useNavigate } from "react-router-dom";
import {
  FiShield, FiUserCheck, FiHeadphones, FiSend, FiCheckCircle, FiTarget,
  FiTrendingUp, FiClock, FiUsers, FiServer, FiArrowRight, FiStar,
  FiLayers, FiZap, FiBarChart2, FiMessageSquare, FiMail, FiGithub,
} from "react-icons/fi";

const SectionHeading = ({ label, title, desc }) => (
  <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-sm text-indigo-700 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      {label}
    </span>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">
      {title}
    </h2>
    <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* ──────── HERO ──────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-100/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-indigo-50/20 to-cyan-50/10 blur-3xl" />
        </div>

        {/* Nav bar */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <FiLayers className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">SupportAI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 cursor-pointer"
            >
              Get started free
            </button>
          </div>
        </nav>

        <div className="relative z-10 w-full max-w-4xl text-center space-y-8 sm:space-y-10 pt-24 sm:pt-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-sm text-indigo-700 backdrop-blur-sm animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Role-based · Automated · Scalable
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight animate-fade-up delay-1">
            <span className="text-slate-900">A smarter way to manage</span>
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              support tickets
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 leading-relaxed animate-fade-up delay-2">
            A role-based support system built for admins, sales teams, and engineers.
            Auto-assign tickets, track progress, and resolve issues faster — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2 animate-fade-up delay-3">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Start free trial <FiArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-7 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Sign in to dashboard
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 pt-4 animate-fade-up delay-4">
            <span className="flex items-center gap-1.5"><FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9 / 5.0</span>
            <span className="flex items-center gap-1.5"><FiUsers className="w-3.5 h-3.5 text-indigo-400" /> 2,000+ teams</span>
            <span className="flex items-center gap-1.5"><FiTrendingUp className="w-3.5 h-3.5 text-emerald-400" /> 99.9% uptime</span>
          </div>
        </div>
      </section>

      {/* ──────── PROBLEM STATEMENT ──────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <SectionHeading
                label="The challenge"
                title="Support ticket chaos slowing you down?"
                desc=""
              />
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed -mt-8">
                Teams waste hours manually routing tickets, chasing status updates, 
                and digging through spreadsheets. As your team grows, the chaos scales with it.
              </p>
              <ul className="space-y-3">
                {[
                  "Tickets get lost in email threads and Slack messages",
                  "No visibility into who's working on what",
                  "Engineers spend time on tickets outside their expertise",
                  "Managers lack data to track team performance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <FiTarget className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full bg-slate-200 ring-2 ring-white" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">3 unassigned tickets</p>
                </div>
                {[
                  { label: "Login page broken", status: "unassigned", color: "text-red-400" },
                  { label: "Payment gateway timeout", status: "in progress", color: "text-amber-400" },
                  { label: "User profile not saving", status: "unassigned", color: "text-red-400" },
                  { label: "Export report feature", status: "pending", color: "text-slate-300" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-slate-600">{t.label}</span>
                    <span className={`text-xs font-medium ${t.color}`}>{t.status}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-indigo-200/50 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ──────── PRODUCT INTRO ──────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="The platform"
            title="Introducing SupportAI"
            desc="A purpose-built support ticketing platform that routes work to the right people, tracks every status change, and gives leaders the data they need."
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <FiZap className="w-6 h-6 text-indigo-600" />, stat: "< 30s", label: "Average assignment time" },
              { icon: <FiCheckCircle className="w-6 h-6 text-indigo-600" />, stat: "94%", label: "Resolution rate" },
              { icon: <FiClock className="w-6 h-6 text-indigo-600" />, stat: "2.4x", label: "Faster close times" },
            ].map(({ icon, stat, label }, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat}</p>
                <p className="text-sm text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FEATURES ──────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Features"
            title="Everything you need to manage tickets"
            desc="From creation to resolution — every step is designed for speed and clarity."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FiSend className="w-5 h-5" />}
              title="Instant ticket creation"
              desc="Sales teams can raise tickets in seconds with priority, category, and detailed descriptions."
            />
            <FeatureCard
              icon={<FiUsers className="w-5 h-5" />}
              title="Skill-based auto-assignment"
              desc="Tickets are automatically routed to engineers whose skills match the issue."
            />
            <FeatureCard
              icon={<FiBarChart2 className="w-5 h-5" />}
              title="Real-time metrics"
              desc="Admins get live dashboards showing open, in-progress, resolved, and rejected tickets."
            />
            <FeatureCard
              icon={<FiMessageSquare className="w-5 h-5" />}
              title="Status tracking"
              desc="Every ticket moves through a clear pipeline — open → in-progress → resolved."
            />
            <FeatureCard
              icon={<FiShield className="w-5 h-5" />}
              title="Role-based access"
              desc="Admins, sales, and engineers each see exactly what they need — nothing more."
            />
            <FeatureCard
              icon={<FiTrendingUp className="w-5 h-5" />}
              title="Performance insights"
              desc="Track engineer workloads, resolution times, and team productivity at a glance."
            />
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="How it works"
            title="From ticket to resolution in four steps"
            desc="No training required. Your team will be up and running in minutes."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "01", title: "Create ticket", desc: "Sales or support raises a ticket with priority, category, and description.", icon: <FiSend className="w-5 h-5 text-indigo-600" /> },
              { step: "02", title: "Smart assignment", desc: "Our engine matches the ticket to the best available engineer based on skills.", icon: <FiZap className="w-5 h-5 text-indigo-600" /> },
              { step: "03", title: "Work & update", desc: "Engineers update status, add notes, and resolve tickets as they work.", icon: <FiCheckCircle className="w-5 h-5 text-indigo-600" /> },
              { step: "04", title: "Track & improve", desc: "Admins monitor metrics, reassign if needed, and spot bottlenecks.", icon: <FiBarChart2 className="w-5 h-5 text-indigo-600" /> },
            ].map(({ step, title, desc, icon }, i) => (
              <div key={i} className="relative group">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-indigo-100 group-hover:text-indigo-200 transition-colors">{step}</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      {icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-indigo-200">
                    <FiArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FOR WHOM ──────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Who it's for"
            title="Built for every role on your team"
            desc="Each role gets a tailored experience with exactly the tools they need."
          />
          <div className="grid sm:grid-cols-3 gap-6">
            <RoleCard
              icon={<FiShield className="w-6 h-6 text-indigo-600" />}
              role="Admin"
              color="text-indigo-600"
              bg="bg-indigo-50"
              abilities={[
                "Full visibility into all tickets",
                "Assign engineers to tickets",
                "Monitor team performance metrics",
                "Manage users and permissions",
              ]}
            />
            <RoleCard
              icon={<FiUserCheck className="w-6 h-6 text-cyan-600" />}
              role="Sales"
              color="text-cyan-600"
              bg="bg-cyan-50"
              abilities={[
                "Raise tickets in seconds",
                "Track resolution progress",
                "View assigned engineer details",
                "No technical overhead",
              ]}
            />
            <RoleCard
              icon={<FiHeadphones className="w-6 h-6 text-emerald-600" />}
              role="Engineer"
              color="text-emerald-600"
              bg="bg-emerald-50"
              abilities={[
                "Get tickets matched to your skills",
                "Update status with one click",
                "Manage your skill profile",
                "Focus on what you do best",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ──────── FINAL CTA ──────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-indigo-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Ready to streamline your support?
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of teams using SupportAI to resolve tickets faster, 
              keep everyone aligned, and deliver better support experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 active:scale-[0.98] shadow-lg transition-all duration-200 cursor-pointer"
              >
                Get started free <FiArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-xl border border-indigo-400/40 px-7 py-3.5 text-sm font-medium text-white hover:bg-indigo-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── FOOTER ──────── */}
      <footer className="border-t border-slate-200 bg-slate-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <FiLayers className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold text-slate-900">SupportAI</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                A smarter way to manage support tickets with role-based access and auto-assignment.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <button className="text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[FiGithub, FiMail, FiMessageSquare].map((Icon, i) => (
                <button key={i} className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ──── Reusable components ──── */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300">
    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
      <span className="text-indigo-600">{icon}</span>
    </div>
    <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const RoleCard = ({ icon, role, bg, abilities }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300">
    <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-4">{role}</h3>
    <ul className="space-y-2.5">
      {abilities.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
          <FiCheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);
