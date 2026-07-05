import { useEffect, useState } from "react";
import axios from "axios";

export default function LowStockAlert() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadLowStock();
  }, []);

  const loadLowStock = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      const lowStock = res.data.filter((p) => Number(p.stock) < 5);

      setProducts(lowStock);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">

      <h2 className="text-xl font-bold text-[#000035] mb-5">
        ⚠ Low Stock Alerts
      </h2>

      {products.length === 0 ? (
        <p className="text-green-600 font-medium">
          All products have sufficient stock.
        </p>
      ) : (
        <div className="space-y-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >

              <div className="flex items-center gap-3">

                <img
                  src={
                    product.images?.[0] ||
                    product.image ||
                    "https://placehold.co/60x60?text=No+Image"
                  }
                  className="w-12 h-12 rounded-lg object-cover border"
                />

                <div>

                  <h3 className="font-semibold text-[#000035]">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {product.category}
                  </p>

                </div>

              </div>

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                {product.stock} Left
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}