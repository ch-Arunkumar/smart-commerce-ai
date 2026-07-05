import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
import InventoryPie from "../components/InventoryPie";
import RevenueChart from "../components/RevenueChart";
import CategoryRevenue from "../components/CategoryRevenue";
import TopProducts from "../components/TopProducts";
import AiInsight from "../components/AiInsight";

export default function Analytics() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500">
          Business Intelligence & AI Analytics
        </p>
      </div>

      <DashboardCards />

      <RevenueChart />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardCharts />
        <InventoryPie />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CategoryRevenue />
        <TopProducts />
      </div>

      <AiInsight />

    </div>
  );
}