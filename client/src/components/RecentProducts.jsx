import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      const latest = res.data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

      setProducts(latest);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-[#000035]">
          Recent Products
        </h2>

        <span className="text-sm text-gray-500">
          Latest 5
        </span>
      </div>

      <div className="space-y-4">

        {products.length === 0 ? (
          <p className="text-gray-400">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border-b pb-3 last:border-none"
            >
              <div className="flex items-center gap-3">

                <img
                  src={
                    product.images?.[0] ||
                    product.image ||
                    "https://placehold.co/60x60?text=No+Image"
                  }
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover border"
                />

                <div>
                  <h3 className="font-semibold text-[#000035]">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>

              </div>

              <div className="text-right">
                <p className="font-bold text-[#000035]">
                  ₹{Number(product.price).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}