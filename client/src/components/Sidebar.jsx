import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const menu = [
  { icon: LayoutDashboard, name: "Dashboard", path: "/" },
  { icon: Package, name: "Products", path: "/products" },
  { icon: ShoppingCart, name: "Orders", path: "/orders" },
  { icon: BarChart3, name: "Analytics", path: "/analytics" },
  { icon: Bot, name: "AI Assistant", path: "/ai" },
  { icon: Settings, name: "Inventory", path: "/inventory" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        SmartCommerce AI
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
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