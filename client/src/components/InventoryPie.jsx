import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InventoryPie() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/inventory-pie"
      );

      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

      {/* HEADER */}
      <h2 className="text-xl font-bold text-[#000035] mb-4">
        Inventory Status
      </h2>

      {/* CONTENT */}
      {loading ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No inventory data found
        </div>
      ) : (
        <div className="w-full h-[300px]">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}