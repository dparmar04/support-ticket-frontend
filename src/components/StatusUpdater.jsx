import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: "open", label: "Open", disabled: true },
  { value: "in-progress", label: "In Progress" },
  { value: "on-hold", label: "On Hold" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

const StatusUpdater = ({ ticketId, currentStatus, onUpdated }) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (status === currentStatus) return;

    setLoading(true);
    try {
      await api.patch(`/tickets/${ticketId}/status`, { status });
      toast.success("Status updated");
      onUpdated();
    } catch (err) {
      toast.error("Failed to update status");
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-slate-200 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 cursor-pointer"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="text-sm bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer transition-all duration-200 font-medium"
      >
        {loading ? "Saving..." : "Update"}
      </button>
    </div>
  );
};

export default StatusUpdater;
