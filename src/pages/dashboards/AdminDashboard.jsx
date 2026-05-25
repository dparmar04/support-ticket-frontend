import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import AssignEngineer from "../../components/AssignEngineer";

const statusColor = {
  open: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50",
  "in-progress": "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50",
  resolved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50",
  "on-hold": "bg-orange-50 text-orange-700 ring-1 ring-orange-200/50",
  rejected: "bg-red-50 text-red-700 ring-1 ring-red-200/50",
};

const AdminDashboard = () => {
  const tabs = ["tickets", "sales", "engineers"];
  const [activeTab, setActiveTab] = useState("tickets");

  const [tickets, setTickets] = useState([]);
  const [overview, setOverview] = useState(null);

  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingOverview, setLoadingOverview] = useState(false);

  // fetch tickets
  const fetchData = async () => {
    const res = await api.get("/tickets/all");
    setTickets(res.data.tickets);
  };

  useEffect(() => {
    let isMounted = true;

    const loadTickets = async () => {
      const res = await api.get("/tickets/all");
      if (isMounted) {
        setTickets(res.data.tickets);
      }
    };

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const loadOverview = async () => {
      if (activeTab !== "sales" && activeTab !== "engineers") return;

      try {
        const res = await api.get("/users/admin/overview");
        setOverview(res.data);
      } catch (err) {
        // ❗ IMPORTANT:
        // Do NOT clear state
        // Do NOT show toast here
        // Do NOT redirect
        // Axios interceptor will handle auth errors
        return;
      }
    };

    loadOverview();
  }, [activeTab]);

  const metrics = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in-progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length,
    rejected: tickets.filter(t => t.status === "rejected").length,
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-8">

        {/* METRICS */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <MetricCard label="Total Tickets" value={metrics.total} accent="from-indigo-500 to-indigo-600" />
            <MetricCard label="Open" value={metrics.open} accent="from-blue-400 to-blue-500" />
            <MetricCard label="In Progress" value={metrics.inProgress} accent="from-amber-400 to-amber-500" />
            <MetricCard label="Resolved" value={metrics.resolved} accent="from-emerald-400 to-emerald-500" />
            <MetricCard label="Rejected" value={metrics.rejected} accent="from-red-400 to-red-500" />
          </div>
        )}

        {/* SEGMENTED TABS */}
        <div className="w-full overflow-x-auto sm:overflow-visible">
          <div className="inline-flex bg-slate-100 rounded-xl p-1 min-w-max ring-1 ring-slate-200/50">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm capitalize rounded-lg transition-all duration-200 cursor-pointer font-medium
                ${activeTab === tab
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TICKETS TAB */}
        {activeTab === "tickets" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tickets.map(ticket => (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300 p-6 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 truncate">
                      {ticket.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 w-max text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-x-4 text-xs text-slate-500">
                  <span>
                    Raised by{" "}
                    <span className="font-medium text-slate-700">
                      {ticket.createdBy?.name}
                    </span>
                  </span>

                  <span className="hidden sm:inline">•</span>

                  <span>
                    Assigned to{" "}
                    <span className="font-medium text-slate-700">
                      {ticket.assignedTo?.name || "Unassigned"}
                    </span>
                  </span>
                </div>

                {/* Assignment reason */}
                {ticket.assignmentReason && (
                  <div className="text-xs text-slate-500 italic bg-indigo-50/50 rounded-lg px-3 py-2 border border-indigo-100/50">
                    {ticket.assignmentReason}
                  </div>
                )}

                {/* Action */}
                <div className="pt-2 sm:pt-0">
                  <AssignEngineer
                    ticketId={ticket._id}
                    currentEngineer={ticket.assignedTo?._id}
                    onAssigned={fetchData}
                  />
                </div>
              </div>
            ))}

            {tickets.length === 0 && (
              <EmptyState text="No tickets available." />
            )}
          </div>
        )}


        {/* SALES TAB */}
        {activeTab === "sales" && overview && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {overview.sales.map(s => (
              <div key={s._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md hover:border-indigo-200/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="font-medium text-slate-900">{s.name}</p>
                <p className="text-sm text-slate-500 mt-1">
                  Tickets Created: <span className="font-medium text-slate-700">{s.totalTickets}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ENGINEERS TAB */}
        {activeTab === "engineers" && overview && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {overview.engineers.map(e => (
              <div key={e._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 hover:shadow-md hover:border-indigo-200/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </div>
                  <p className="font-medium text-slate-900">{e.name}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {e.skills.length > 0 ? (
                    e.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm ring-1 ring-indigo-200/50"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No skills added
                    </span>
                  )}
                </div>

                <div className="h-px bg-slate-100" />
                <p className="text-xs text-slate-500 flex gap-3">
                  <span>Assigned: <span className="font-medium text-slate-700">{e.totalAssigned}</span></span>
                  <span>Open: <span className="font-medium text-slate-700">{e.open}</span></span>
                  <span>Resolved: <span className="font-medium text-slate-700">{e.resolved}</span></span>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
};

const MetricCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
    <div className={`inline-flex items-center gap-2 w-8 h-8 rounded-lg bg-gradient-to-br ${accent} mb-3`}>
      <span className="sr-only">{label}</span>
    </div>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400 border border-slate-200">
    {text}
  </div>
);

export default AdminDashboard;
