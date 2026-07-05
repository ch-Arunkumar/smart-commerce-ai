import { useEffect, useState } from "react";
import axios from "axios";

export default function AiInsight() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/ai/insight"
      );

      setText(res.data.insight);

    } catch (err) {
      console.log(err);
      setText("AI unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      
      <h2 className="text-xl font-bold text-[#000035] mb-4">
        AI Business Insights 🤖
      </h2>

      {loading ? (
        <p className="text-gray-400">Analyzing data...</p>
      ) : (
        <pre className="whitespace-pre-wrap text-gray-700">
          {text}
        </pre>
      )}

    </div>
  );
}