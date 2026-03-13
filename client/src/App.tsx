import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import EditLead from "./pages/EditLead";
import Pipeline from "./pages/Pipeline";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Navbar />
              <div className="main">
                <div className="header">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
                      Dashboard
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
                      Sales pipeline and customer relationship overview
                    </div>
                  </div>
                </div>
                <div className="content">
                  <Dashboard />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Navbar />
              <div className="main">
                <div className="header">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
                      Companies
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
                      Manage customer accounts and company relationships
                    </div>
                  </div>
                </div>
                <div className="content">
                  <Companies />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Navbar />
              <div className="main">
                <div className="header">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
                      Leads
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
                      Track prospects through the sales pipeline
                    </div>
                  </div>
                </div>
                <div className="content">
                  <Leads />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipeline"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Navbar />
              <div className="main">
                <div className="header">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
                      Pipeline
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
                      Visualize lead movement across the sales funnel
                    </div>
                  </div>
                </div>
                <div className="content">
                  <Pipeline />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads/:id"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Navbar />
              <div className="main">
                <div className="header">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
                      Lead Details
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
                      View sales information and relationship context
                    </div>
                  </div>
                </div>
                <div className="content">
                  <LeadDetails />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads/:id/edit"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Navbar />
              <div className="main">
                <div className="header">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
                      Edit Lead
                    </div>
                    <div style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
                      Update lead stage, company, and sales details
                    </div>
                  </div>
                </div>
                <div className="content">
                  <EditLead />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<div style={{ padding: 24 }}>Not Found</div>}
      />
    </Routes>
  );
}