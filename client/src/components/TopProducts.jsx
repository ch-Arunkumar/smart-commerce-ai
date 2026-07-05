import { useEffect, useState } from "react";
import axios from "axios";

export default function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/analytics/top-products"
      );

      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        🏆 Top Products
      </h2>

      <div className="space-y-4">

        {products.map((product, index) => (

          <div
            key={product._id}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>

              <h3 className="font-semibold text-slate-800">
                #{index + 1} {product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-blue-600">
                ₹{product.price.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500">
                Stock : {product.stock}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}