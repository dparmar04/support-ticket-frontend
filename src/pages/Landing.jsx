import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Support Ticket System
        </h1>

        <p className="text-gray-600">
          A role-based support platform for Admins, Sales, and Engineers.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-md bg-black text-white cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-md border border-gray-300 cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
