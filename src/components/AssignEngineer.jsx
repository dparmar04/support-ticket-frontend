import { useEffect, useState } from "react";
import api from "../api/axios";

const AssignEngineer = ({ ticketId, currentEngineer, onAssigned }) => {
  const [engineers, setEngineers] = useState([]);
  const [selected, setSelected] = useState(currentEngineer || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/users/engineers").then((res) => {
      setEngineers(res.data);
    });
  }, []);

  const handleAssign = async () => {
    if (!selected || selected === currentEngineer) return;

    setLoading(true);
    try {
      await api.patch(`/tickets/${ticketId}/assign`, {
        engineerId: selected,
      });
      onAssigned();
    } catch {
      alert("Failed to reassign ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <select
        className="border px-2 py-1 rounded text-sm"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select Engineer</option>
        {engineers.map((eng) => (
          <option key={eng._id} value={eng._id}>
            {eng.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        disabled={loading}
        className="text-sm bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Assigning..." : "Assign"}
      </button>
    </div>
  );
};

export default AssignEngineer;
