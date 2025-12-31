import { useEffect, useState } from "react";
import api from "../api/axios";

const EditSkills = ({ currentSkills = [], onUpdated }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // 🔑 Sync from backend-provided skills
  useEffect(() => {
    setSkills(currentSkills);
  }, [currentSkills]);

  const persistSkills = async (updated) => {
    await api.put("/engineer/skills", { skills: updated });
    onUpdated(); // refetch metrics from backend
  };

  const addSkill = async () => {
    const skill = newSkill.trim().toLowerCase();
    if (!skill || skills.includes(skill)) return;

    const updated = [...skills, skill];
    setSkills(updated);
    setNewSkill("");
    await persistSkills(updated);
  };

  const removeSkill = async (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    await persistSkills(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold text-gray-800">My Skills</h3>

      {skills.length === 0 && (
        <p className="text-sm text-gray-400">
          No skills added yet. Add skills to receive relevant tickets.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-emerald-700 hover:text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g. react)"
          className="flex-1 border rounded-lg px-3 py-2"
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />

        <button
          onClick={addSkill}
          className="px-5 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default EditSkills;