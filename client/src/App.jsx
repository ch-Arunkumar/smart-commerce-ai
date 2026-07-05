import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";

import AIInsights from "./components/AiInsight";
import InventoryPie from "./components/InventoryPie";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Products */}

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Products />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Orders */}

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Orders />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Analytics */}

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Analytics />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* AI */}

      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AIInsights />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Inventory */}

      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <MainLayout>
              <InventoryPie />
            </MainLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}