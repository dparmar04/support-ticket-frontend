import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import StatusUpdater from "../../components/StatusUpdater";
import EditSkills from "../../components/EditSkills";


const statusColor = {
  open: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50",
  "in-progress": "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50",
  resolved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50",
  "on-hold": "bg-orange-50 text-orange-700 ring-1 ring-orange-200/50",
  rejected: "bg-red-50 text-red-700 ring-1 ring-red-200/50",
};

const EngineerDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [tickets, setTickets] = useState([]);

  const fetchData = () => {
    api.get("/engineer/metrics").then((res) => setMetrics(res.data));
    api.get("/tickets/assigned").then((res) =>
      setTickets(res.data.tickets)
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title="Engineer Dashboard">

      <div className="space-y-8">
        <h2 className="text-lg font-semibold text-slate-800">
          Your Workspace
        </h2>
        {/* Metrics */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              label="Assigned"
              value={metrics.totalAssigned}
              accent="from-indigo-500 to-indigo-600"
            />

            {metrics.statusBreakdown.map((s) => (
              <MetricCard
                key={s._id}
                label={s._id}
                value={s.count}
                accent="from-indigo-400 to-indigo-500"
              />
            ))}
          </div>
        )}

        <EditSkills
          currentSkills={metrics?.skills || []}
          onUpdated={fetchData}
        />

        {/* Tickets */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Assigned Tickets
          </h2>

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6
               hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300 space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {ticket.description}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-xs px-3 py-1 rounded-full capitalize self-start
          ${statusColor[ticket.status]}`}
                >
                  {ticket.status}
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50">
                  Priority: {ticket.priority}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50">
                  Category: {ticket.category}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Action */}
              <div className="flex justify-end">
                <StatusUpdater
                  ticketId={ticket._id}
                  currentStatus={ticket.status}
                  onUpdated={fetchData}
                />
              </div>
            </div>
          ))}


          {tickets.length === 0 && (
            <EmptyState text="No tickets assigned." />
          )}
        </div>

      </div>
    </Layout>
  );
};

const MetricCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
    <div className={`inline-flex items-center gap-2 w-8 h-8 rounded-lg bg-gradient-to-br ${accent} mb-3`}>
      <span className="sr-only">{label}</span>
    </div>
    <p className="text-sm text-slate-500 capitalize">{label}</p>
    <p className="text-2xl font-semibold text-slate-900 mt-1">
      {value}
    </p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400 border border-slate-200">
    {text}
  </div>
);

export default EngineerDashboard;