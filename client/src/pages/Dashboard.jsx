import { useEffect, useState } from "react";
import axios from "axios";

import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
import InventoryPie from "../components/InventoryPie";
import AiInsight from "../components/AiInsight";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      const data = res.data || [];

      setProducts(data);

      setLowStock(
        data.filter((p) => p.stock > 0 && p.stock < 5)
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">

      <DashboardCards />

      <DashboardCharts />

      <InventoryPie />

      <AiInsight />

      {/* RECENT PRODUCTS */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold text-[#000035] mb-4">
          Recent Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-400">
            No products found
          </p>
        ) : (
          <ul className="space-y-2">

            {products.slice(0, 5).map((p) => (
              <li
                key={p._id}
                className="flex justify-between border-b pb-2"
              >
                <span>{p.name}</span>
                <span className="text-gray-500">
                  ₹{p.price}
                </span>
              </li>
            ))}

          </ul>
        )}

      </div>

      {/* LOW STOCK */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold text-red-600 mb-4">
          ⚠ Low Stock Alerts
        </h2>

        {lowStock.length === 0 ? (
          <p className="text-gray-400">
            All products have sufficient stock.
          </p>
        ) : (
          <ul className="space-y-2">

            {lowStock.map((p) => (
              <li
                key={p._id}
                className="flex justify-between border-b pb-2"
              >
                <span>{p.name}</span>
                <span className="text-red-500">
                  Stock: {p.stock}
                </span>
              </li>
            ))}

          </ul>
        )}

      </div>

    </div>
  );
}