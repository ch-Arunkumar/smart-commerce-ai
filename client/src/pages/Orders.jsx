import { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "../components/OrderModal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, {
        status,
      });

      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#000035]">
          Orders
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#000035] text-white px-5 py-2 rounded-xl"
        >
          + Create Order
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#000035] text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-gray-400" colSpan="4">
                  No Orders Found
                </td>
              </tr>
            ) : (

              orders.map((o) => (
                <tr key={o._id} className="border-t">

                  <td className="p-4">
                    <div className="font-medium">{o.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {o.customerEmail}
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-[#000035]">
                    ₹{o.totalAmount}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o._id, e.target.value)
                      }
                      className="border p-2 rounded"
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <button
                      onClick={() => deleteOrder(o._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
      <OrderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={loadOrders}
      />

    </div>
  );
}