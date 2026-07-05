import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  editingProduct,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    imageInput: "",
    images: [],
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        imageInput: "",
        images: editingProduct.images || [],
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        imageInput: "",
        images: [],
      });
    }
  }, [isOpen, editingProduct]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addImage = () => {
    if (!form.imageInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, prev.imageInput],
      imageInput: "",
    }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const uploadImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/products/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.imageUrl) {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, data.imageUrl],
        }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  onSave({
    name: form.name,
    description: form.description || "",
    category: form.category,
    price: Number(form.price),
    stock: Number(form.stock),

    // Save ONLY URL images for now
    images: form.images.filter((img) => img.startsWith("http")),
  });
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[460px] rounded-xl shadow-xl border border-[#000035]">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-[#000035] bg-[#000035] text-white rounded-t-xl">
          <h2 className="text-lg font-semibold">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:border-[#000035] outline-none"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:border-[#000035] outline-none"
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:border-[#000035] outline-none"
          />

          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:border-[#000035] outline-none"
          />

          {/* IMAGE URL */}
          <div className="flex gap-2">
            <input
              name="imageInput"
              placeholder="Image URL"
              value={form.imageInput}
              onChange={handleChange}
              className="flex-1 p-2 border rounded focus:border-[#000035] outline-none"
            />

            <button
              type="button"
              onClick={addImage}
              className="px-3 bg-[#000035] text-white rounded hover:opacity-90"
            >
              Add
            </button>
          </div>

          {/* FILE UPLOAD */}
          <div className="flex items-center gap-2">

            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadImage(e.target.files[0])}
            />

            <label
              htmlFor="fileUpload"
              className="px-3 py-2 bg-[#000035] text-white rounded cursor-pointer hover:opacity-90"
            >
              Upload Image
            </label>

          </div>

          {/* IMAGE PREVIEW */}
          <div className="grid grid-cols-3 gap-2">

            {form.images.map((img, i) => (
              <div key={i} className="relative">

                <img
                  src={img}
                  className="w-full h-20 object-cover rounded border border-[#000035]"
                />

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                >
                  X
                </button>

              </div>
            ))}

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border border-[#000035] text-[#000035] rounded hover:bg-[#000035] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-[#000035] text-white rounded hover:opacity-90"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}