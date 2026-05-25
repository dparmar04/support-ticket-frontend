import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import SalesDashboard from "./pages/dashboards/SalesDashboard";
import EngineerDashboard from "./pages/dashboards/EngineerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              whiteSpace: "nowrap",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#0f172a",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(79, 70, 229, 0.15)",
              borderRadius: "16px",
              padding: "12px 20px",
              boxShadow: "0 4px 24px rgba(79, 70, 229, 0.1)",
              fontWeight: 500,
              letterSpacing: "0.3px",
              transition: "all 0.3s ease-in-out",
              minWidth: "300px",
              maxWidth: "520px",
              textAlign: "center",
            },
          }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="/" />} />

          <Route
            path="/sales"
            element={
              <ProtectedRoute roles={["sales"]}>
                <SalesDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/engineer"
            element={
              <ProtectedRoute roles={["engineer"]}>
                <EngineerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
