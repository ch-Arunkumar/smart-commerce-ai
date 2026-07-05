import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AIInsights from "./components/AiInsight";

export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/products"
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />

      <Route
        path="/orders"
        element={
         <MainLayout>
         <Orders />
         </MainLayout>
        }
      />

<Route
  path="/ai"
  element={
    <MainLayout>
      <AIInsights />
    </MainLayout>
  }
/>
    </Routes>
  );
}