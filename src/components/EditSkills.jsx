import { useEffect, useState } from "react";
import api from "../api/axios";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";

const EditSkills = ({ currentSkills = [], onUpdated }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);

  // 🔑 Sync from backend-provided skills
  useEffect(() => {
    setSkills(currentSkills);
  }, [currentSkills]);

  const persistSkills = async (updated) => {
    setSaving(true);
    await api.put("/engineer/skills", { skills: updated });
    setSaving(false);
    onUpdated(); // refetch metrics from backend
  };

  const addSkill = async () => {
    const skill = newSkill.trim().toLowerCase();
    if (!skill || skills.includes(skill)) return;

    const updated = [...skills, skill];
    setSkills(updated);
    setNewSkill("");
    try {
      await persistSkills(updated);
      toast.success("Skill added");
    } catch {
      toast.error("Failed to add skill");
    }
  };

  const removeSkill = async (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);

    try {
      await persistSkills(updated);
      toast.success("Skill removed");
    } catch {
      toast.error("Failed to remove skill");
    }
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
              className="text-emerald-700 hover:text-red-500 font-bold cursor-pointer"
            >
              <RxCross1 size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g. react)"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />

        <button
          onClick={addSkill}
          disabled={saving}
          className="px-5 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700
                     disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default EditSkills;