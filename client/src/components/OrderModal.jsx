import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { X, Plus, Trash2 } from "lucide-react";

export default function OrderModal({ isOpen, onClose, onSuccess }) {
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      price: 0,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductChange = (index, id) => {
    const product = products.find((p) => p._id === id);

    const updated = [...items];

    updated[index].productId = id;
    updated[index].price = product ? product.price : 0;

    setItems(updated);
  };

  const handleQtyChange = (index, qty) => {
    const updated = [...items];
    updated[index].quantity = Number(qty);
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const grandTotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [items]);
const saveOrder = async () => {
  try {
    // Validation
    if (!customerName.trim()) {
      return alert("Enter customer name");
    }

    if (!customerEmail.trim()) {
      return alert("Enter customer email");
    }

    const validItems = items.filter(
      (i) => i.productId && i.quantity > 0
    );

    if (validItems.length === 0) {
      return alert("Please add at least one product.");
    }

    await axios.post("http://localhost:5000/api/orders", {
      customerName,
      customerEmail,
      products: validItems.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    });

    alert("Order Created Successfully");

    setCustomerName("");
    setCustomerEmail("");

    setItems([
      {
        productId: "",
        quantity: 1,
        price: 0,
      },
    ]);

    onSuccess();
    onClose();

  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Failed to create order."
    );
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[900px] p-6">

        <div className="flex justify-between mb-6">

          <h2 className="text-2xl font-bold text-[#000035]">
            Create Order
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">

          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
              placeholder="Customer Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="border rounded-lg p-3"
         />
        </div>

        {items.map((item, index) => (

          <div
            key={index}
            className="grid grid-cols-4 gap-4 mb-3"
          >

            <select
              value={item.productId}
              onChange={(e) =>
                handleProductChange(index, e.target.value)
              }
              className="border rounded-lg p-3"
            >

              <option value="">
                Select Product
              </option>

              {products.map((p) => (
                <option
                  key={p._id}
                  value={p._id}
                >
                  {p.name}
                </option>
              ))}

            </select>

            <input
              type="number"
              value={item.quantity}
              min={1}
              onChange={(e) =>
                handleQtyChange(index, e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <input
              readOnly
              value={`₹${item.price}`}
              className="border rounded-lg p-3 bg-gray-100"
            />

            <button
              onClick={() => removeRow(index)}
              className="bg-red-500 rounded-lg text-white flex justify-center items-center"
            >
              <Trash2 size={18} />
            </button>

          </div>

        ))}

        <button
          onClick={addRow}
          className="flex items-center gap-2 bg-[#000035] text-white px-4 py-2 rounded-lg mt-3"
        >
          <Plus size={18} />
          Add Product
        </button>

        <div className="mt-8 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-[#000035]">
            Total ₹{grandTotal.toLocaleString()}
          </h2>

          <button
            onClick={saveOrder}
            className="bg-[#000035] text-white px-8 py-3 rounded-xl"
          >
            Save Order
          </button>

        </div>

      </div>

    </div>
  );
}