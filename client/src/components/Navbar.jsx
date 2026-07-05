import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-6 bg-white shadow">

      <h1 className="text-2xl font-bold text-slate-800">
        SmartCommerce AI
      </h1>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            {user?.name || "Admin"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>

        <img
          className="w-10 h-10 rounded-full border"
          src="https://i.pravatar.cc/100"
          alt="profile"
        />

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}