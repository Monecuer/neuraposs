import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  MapPin,
  Tablet,
  Users,
  ShoppingCart,
  Package,
  CreditCard,
  ToggleLeft,
  Palette,
  FileText,
  Bell,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Store, label: "Merchants", path: "/merchants" },
  { icon: MapPin, label: "Branches", path: "/branches" },
  { icon: Tablet, label: "Devices", path: "/devices" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: ShoppingCart, label: "Sales", path: "/sales" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: CreditCard, label: "Subscriptions", path: "/subscriptions" },
  { icon: ToggleLeft, label: "Feature Flags", path: "/feature-flags" },
  { icon: Palette, label: "White Label", path: "/white-label" },
  { icon: FileText, label: "Audit Logs", path: "/audit-logs" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-xl font-bold text-foreground">NeuraPOS Admin</h1>
      </div>
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
