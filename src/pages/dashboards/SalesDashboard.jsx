import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import CreateTicketForm from "../../components/CreateTicketForm";

const statusColor = {
  open: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50",
  "in-progress": "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50",
  resolved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50",
};

const priorityColor = {
  low: "bg-slate-50 text-slate-600 ring-1 ring-slate-200/50",
  medium: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50",
  high: "bg-red-50 text-red-700 ring-1 ring-red-200/50",
};

const SalesDashboard = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    api.get("/tickets/my").then((res) => {
      setTickets(res.data.tickets);
    });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Layout title="Sales Dashboard">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Create Ticket */}
        <div className="lg:col-span-1 h-max">
          <CreateTicketForm onSuccess={fetchTickets} />
        </div>

        {/* Tickets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              My Tickets
            </h2>
            <span className="text-sm text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-200">
              {tickets.length} total
            </span>
          </div>

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium text-slate-900 truncate">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                    {ticket.description}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-xs px-3 py-1 rounded-full capitalize font-medium ${statusColor[ticket.status]
                    }`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${priorityColor[ticket.priority]
                    }`}
                >
                  Priority: {ticket.priority}
                </span>

                <span className="px-3 py-1 rounded-full font-medium bg-slate-50 text-slate-600 ring-1 ring-slate-200/50">
                  Category: {ticket.category}
                </span>
              </div>

              {ticket.assignedTo && (
                <p className="text-xs text-slate-500 mt-1">
                  Assigned to:{" "}
                  <span className="font-medium text-slate-700">
                    {ticket.assignedTo.name}
                  </span>
                </p>
              )}
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-400">
              No tickets created yet.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;