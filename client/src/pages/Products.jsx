import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ FETCH FROM BACKEND
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ SAVE (ADD / UPDATE)
  const handleSave = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
      } else {
        await createProduct(data);
      }

      fetchProducts();
      setIsOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE FROM BACKEND
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ EDIT
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  // ✅ SEARCH
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Summary stats
  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock || 0),
    0
  );

  const categories = new Set(products.map((p) => p.category)).size;

  // Stock status
  const getStockStatus = (stock) => {
    if (stock == 0) return "Out of Stock";
    if (stock < 5) return "Low Stock";
    return "In Stock";
  };

  const getBadgeColor = (stock) => {
    if (stock == 0) return "bg-red-500";
    if (stock < 5) return "bg-yellow-500";
    return "bg-green-600";
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#000035]">
          Products
        </h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsOpen(true);
          }}
          className="bg-[#000035] hover:bg-[#00004d] text-white px-5 py-2 rounded-xl"
        >
          + Add Product
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg focus:border-[#000035] outline-none"
      />

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold text-[#000035]">
            {products.length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Total Stock</p>
          <h2 className="text-2xl font-bold text-[#000035]">
            {totalStock}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Categories</p>
          <h2 className="text-2xl font-bold text-[#000035]">
            {categories}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#000035] text-white">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">

                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={p.images?.[0]}
                      className="w-10 h-10 rounded object-cover border"
                    />
                    <span className="font-medium">{p.name}</span>
                  </td>

                  <td className="p-3">{p.category}</td>

                  <td className="p-3 text-[#000035] font-semibold">
                    ₹{p.price}
                  </td>

                  <td className="p-3">{p.stock}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-white text-xs rounded ${getBadgeColor(
                        p.stock
                      )}`}
                    >
                      {getStockStatus(p.stock)}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => handleEdit(p)}
                      className="px-2 py-1 bg-[#000035] text-white rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      <ProductModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        editingProduct={editingProduct}
      />

    </div>
  );
}