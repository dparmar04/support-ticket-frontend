import { useEffect, useState } from "react";
import api from "../api/axios";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";

const EditSkills = ({ currentSkills = [], onUpdated }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSkills(currentSkills);
  }, [currentSkills]);

  const persistSkills = async (updated) => {
    setSaving(true);
    await api.put("/engineer/skills", { skills: updated });
    setSaving(false);
    onUpdated();
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h3 className="font-semibold text-slate-800">My Skills</h3>

        {skills.length === 0 && (
          <p className="text-sm text-slate-400">
            No skills added yet. Add skills to receive relevant tickets.
          </p>
        )}
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2
                       bg-indigo-50 text-indigo-700 rounded-lg ring-1 ring-indigo-200/50
                       text-sm font-medium"
          >
            <span className="truncate max-w-30 sm:max-w-none">
              {skill}
            </span>

            <button
              onClick={() => removeSkill(skill)}
              className="text-indigo-400 hover:text-red-500 font-bold cursor-pointer transition-colors duration-200"
            >
              <RxCross1 size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Add skill */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g. react)"
          className="w-full sm:flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />

        <button
          onClick={addSkill}
          disabled={saving}
          className="w-full sm:w-auto px-5 py-2 bg-indigo-600 text-white rounded-xl
                     cursor-pointer hover:bg-indigo-700
                     disabled:opacity-50 transition-all duration-200 font-medium"
        >
          {saving ? "Saving..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default EditSkills;