import { useQuery } from "@tanstack/react-query";
import { useBackend } from "@/lib/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Tablet, Users, ShoppingCart } from "lucide-react";

export function Dashboard() {
  const backend = useBackend();

  const { data: merchants } = useQuery({
    queryKey: ["merchants"],
    queryFn: () => backend.merchants.list({}),
  });

  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => backend.devices.list({}),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => backend.users.list({}),
  });

  const { data: sales } = useQuery({
    queryKey: ["sales"],
    queryFn: () => backend.sales.list({}),
  });

  const stats = [
    {
      title: "Total Merchants",
      value: merchants?.total || 0,
      icon: Store,
      color: "text-blue-500",
    },
    {
      title: "Active Devices",
      value: devices?.devices.length || 0,
      icon: Tablet,
      color: "text-green-500",
    },
    {
      title: "Total Users",
      value: users?.users.length || 0,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Total Sales",
      value: sales?.total || 0,
      icon: ShoppingCart,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your NeuraPOS system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent activity to display
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Database
                </span>
                <span className="text-sm font-medium text-green-500">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Sync Engine
                </span>
                <span className="text-sm font-medium text-green-500">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  API Gateway
                </span>
                <span className="text-sm font-medium text-green-500">
                  Operational
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
