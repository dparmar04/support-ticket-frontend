import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

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
      toast.success("Engineer assigned");
      onAssigned();
    } catch {
      toast.error("Failed to reassign ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <select
        className="border border-slate-200 px-3 py-2 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 cursor-pointer"
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
        className="w-full sm:w-auto text-sm bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer transition-all duration-200 font-medium"
      >
        {loading ? "Assigning..." : "Assign"}
      </button>
    </div>
  );
};

export default AssignEngineer;
