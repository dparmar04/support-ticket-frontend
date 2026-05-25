import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiSettings } from "react-icons/fi";

const Layout = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <FiSettings className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-indigo-700">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500
                       px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
