import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import AssignEngineer from "../../components/AssignEngineer";

const statusColor = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
  "on-hold": "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-white",

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
    if (activeTab === "sales" || activeTab === "engineers") {
      api.get("/users/admin/overview").then(res => setOverview(res.data));
    }
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
            <MetricCard label="Total Tickets" value={metrics.total} accent="border-indigo-500" />
            <MetricCard label="Open" value={metrics.open} accent="border-blue-400" />
            <MetricCard label="In Progress" value={metrics.inProgress} accent="border-amber-400" />
            <MetricCard label="Resolved" value={metrics.resolved} accent="border-emerald-400" />
            <MetricCard label="Rejected" value={metrics.rejected} accent="border-emerald-400" />
          </div>
        )}

        {/* SEGMENTED TABS */}
        <div className="inline-flex bg-slate-200 rounded-full p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm capitalize rounded-full transition cursor-pointer
                ${activeTab === tab
                  ? "bg-white text-indigo-600 shadow"
                  : "text-slate-600 hover:text-slate-800"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TICKETS TAB */}
        {activeTab === "tickets" && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tickets.map(ticket => (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 truncate">
                      {ticket.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
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
                  <div className="text-xs text-slate-400 italic bg-slate-50 rounded-lg px-3 py-2">
                    {ticket.assignmentReason}
                  </div>
                )}

                {/* Action */}
                <div className="pt-2">
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
              <div key={s._id} className="bg-white rounded-xl shadow-sm p-5">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Tickets Created: {s.totalTickets}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ENGINEERS TAB */}
        {activeTab === "engineers" && overview && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {overview.engineers.map(e => (
              <div key={e._id} className="bg-white rounded-xl shadow-sm p-5 space-y-3">
                <p className="font-medium">{e.name}</p>

                <div className="flex flex-wrap gap-2">
                  {e.skills.length > 0 ? (
                    e.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      No skills added
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Assigned: {e.totalAssigned} · Open: {e.open} · Resolved: {e.resolved}
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
  <div className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${accent}`}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
    {text}
  </div>
);

export default AdminDashboard;
