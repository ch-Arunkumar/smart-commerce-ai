import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { icon: LayoutDashboard, name: "Dashboard", path: "/" },
  { icon: Package, name: "Products", path: "/products" },
  { icon: ShoppingCart, name: "Orders", path: "/orders" },
  { icon: BarChart3, name: "Analytics", path: "/analytics" },
  { icon: Bot, name: "AI Assistant", path: "/ai" },
  { icon: Settings, name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#000035] text-white min-h-screen p-6 shadow-xl">

      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        SmartCommerce AI
      </h1>

      <nav className="space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-white text-[#000035] font-semibold shadow"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}