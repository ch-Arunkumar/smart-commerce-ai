import { Pencil, Trash2 } from "lucide-react";

export default function ProductTable({
  products,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      {/* Product Table */}
      <table className="w-full">

        {/* Table Header */}
        <thead className="bg-slate-900 text-white">

          <tr>

            <th className="p-4 text-left">
              Image
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Stock
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No Products Found
              </td>

            </tr>

          ) : (

            products.map((product) => (

              <tr
                key={product._id}
                className="border-b hover:bg-gray-50"
              >

                {/* Product Image */}
                <td className="p-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover"
                  />

                </td>

                {/* Name */}
                <td className="p-4 font-semibold">

                  {product.name}

                </td>

                {/* Category */}
                <td className="p-4">

                  {product.category}

                </td>

                {/* Price */}
                <td className="p-4">

                  ₹{product.price}

                </td>

                {/* Stock */}
                <td className="p-4">

                  {product.stock}

                </td>

                {/* Action Buttons */}
                <td className="p-4">

                  <div className="flex justify-center gap-4">

                    <button
  onClick={() => onEdit(product)}
>
  <Pencil
    size={20}
    className="text-blue-600 hover:text-blue-800"
  />
</button>
                    <button
                      onClick={() =>
                        onDelete(product._id)
                      }
                    >

                      <Trash2
                        size={20}
                        className="text-red-600 hover:text-red-800"
                      />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}