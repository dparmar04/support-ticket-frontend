import { useState } from "react";
import api from "../api/axios";

const STATUS_OPTIONS = [
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
      onUpdated();
    } catch (err) {
      alert("Failed to update status");
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
        className="border px-2 py-1 rounded text-sm"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Update"}
      </button>
    </div>
  );
};

export default StatusUpdater;
