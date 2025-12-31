import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import CreateTicketForm from "../../components/CreateTicketForm";

const statusColor = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

const priorityColor = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-indigo-100 text-indigo-700",
  high: "bg-red-100 text-red-700",
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
        <div className="lg:col-span-1 bg-white h-max rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Create Ticket
          </h2>
          <CreateTicketForm onSuccess={fetchTickets} />
        </div>

        {/* Tickets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              My Tickets
            </h2>
            <span className="text-sm text-gray-500">
              {tickets.length} total
            </span>
          </div>

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-sm p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {ticket.description}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize ${statusColor[ticket.status]
                    }`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span
                  className={`px-2 py-1 rounded-full ${priorityColor[ticket.priority]
                    }`}
                >
                  Priority: {ticket.priority}
                </span>

                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                  Category: {ticket.category}
                </span>
              </div>

              {ticket.assignedTo && (
                <p className="text-xs text-gray-500 mt-1">
                  Assigned to:{" "}
                  <span className="font-medium">
                    {ticket.assignedTo.name}
                  </span>
                </p>
              )}
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              No tickets created yet.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;