import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">
              Hi,{" "}
              <span className="font-medium text-gray-900">
                {user.name}
              </span>
            </span>
          )}

          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            <FiLogOut className="size-5" />
          </button>
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
