import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const CreateTicketForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/tickets", {
        title,
        description,
        priority,
        category,
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("general");

      toast.success("Ticket created");
      onSuccess();
    } catch {
      toast.error("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-2xl border border-gray-100
                 p-5 sm:p-6 space-y-5 sm:space-y-6"
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Raise a new ticket
        </h2>
        <p className="text-sm text-gray-500">
          Describe your issue and we’ll route it to the right person.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Ticket title
        </label>
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20
                     focus:border-blue-500 transition"
          placeholder="Short summary of the issue"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                     resize-none focus:outline-none
                     focus:ring-2 focus:ring-blue-500/20
                     focus:border-blue-500 transition"
          placeholder="Explain the issue in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Priority & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5
                       text-sm bg-white cursor-pointer
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500/20 focus:border-blue-500 transition"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5
                       text-sm bg-white cursor-pointer
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500/20 focus:border-blue-500 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
          </select>
        </div>
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          disabled={loading}
          className="w-full inline-flex items-center justify-center
                     rounded-xl bg-blue-600 px-5 py-3
                     text-sm font-medium text-white
                     hover:bg-blue-700 active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition cursor-pointer"
        >
          {loading ? "Creating ticket..." : "Create ticket"}
        </button>
      </div>
    </form>
  );
};

export default CreateTicketForm;