import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import StatusUpdater from "../../components/StatusUpdater";
import EditSkills from "../../components/EditSkills";


const statusColor = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
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
        <h2 className="text-lg font-semibold text-gray-800">
          Your Workspace
        </h2>
        {/* Metrics */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              label="Assigned"
              value={metrics.totalAssigned}
              accent="border-emerald-500"
            />

            {metrics.statusBreakdown.map((s) => (
              <MetricCard
                key={s._id}
                label={s._id}
                value={s.count}
                accent="border-emerald-300"
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
          <h2 className="text-lg font-semibold text-gray-800">
            Assigned Tickets
          </h2>

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6
               hover:shadow-md transition space-y-4"
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
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  Priority: {ticket.priority}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">
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
  <div
    className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${accent}`}
  >
    <p className="text-sm text-gray-500 capitalize">{label}</p>
    <p className="text-2xl font-semibold text-gray-900 mt-1">
      {value}
    </p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
    {text}
  </div>
);

export default EngineerDashboard;