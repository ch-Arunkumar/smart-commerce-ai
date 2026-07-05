import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";

export default function DashboardCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) return <p className="p-6">Loading...</p>;

  const cards = [
    { title: "Products", value: stats.totalProducts },
    { title: "Stock", value: stats.totalStock },
    { title: "Categories", value: stats.categories },
    { title: "Inventory Value", value: `₹${stats.inventoryValue}` },
    { title: "Low Stock", value: stats.lowStock },
    { title: "Out of Stock", value: stats.outOfStock },
    { title: "Orders", value: stats.totalOrders },
    { title: "Revenue", value: `₹${stats.totalRevenue}` },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">

      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow border"
        >
          <p className="text-gray-500">{c.title}</p>
          <h2 className="text-2xl font-bold text-[#000035]">
            {c.value}
          </h2>
        </div>
      ))}

    </div>
  );
}