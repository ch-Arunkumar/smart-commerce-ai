import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardCharts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/category-chart"
      );

      // SAFE FIX (important)
      const chartData = Array.isArray(res.data)
        ? res.data
        : [];

      setData(chartData);
    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 pb-6">

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold text-[#000035] mb-6">
          Inventory Distribution
        </h2>

        {/* LOADING STATE */}
        {loading ? (
          <p className="text-gray-400">Loading chart...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">
            No category data found
          </p>
        ) : (
          <div style={{ width: "100%", height: 350 }}>

            <ResponsiveContainer>

              <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#000035"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>
        )}

      </div>

    </div>
  );
}