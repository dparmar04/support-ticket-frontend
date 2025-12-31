import { useState } from "react";
import api from "../api/axios";

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

      // reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("general");

      onSuccess(); // refresh ticket list
    } catch (err) {
      alert("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Raise New Ticket</h2>

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Ticket title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Describe the issue"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
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

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
};

export default CreateTicketForm;