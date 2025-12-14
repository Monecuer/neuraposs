import { useQuery } from "@tanstack/react-query";
import { useBackend } from "@/lib/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function Devices() {
  const backend = useBackend();

  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: () => backend.devices.list({}),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Devices</h1>
        <p className="text-muted-foreground">
          Monitor and manage POS devices
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Devices</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Device Name</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-mono text-xs">
                      {device.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {device.deviceName}
                    </TableCell>
                    <TableCell className="text-sm">{device.branchId}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          device.status === "active" ? "default" : "secondary"
                        }
                      >
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {device.lastSeen
                        ? new Date(device.lastSeen).toLocaleString()
                        : "Never"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(device.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
