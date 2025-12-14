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

export function Sales() {
  const backend = useBackend();

  const { data, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: () => backend.sales.list({}),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales</h1>
        <p className="text-muted-foreground">
          View all sales transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sales</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Cashier</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Sync Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-mono text-xs">
                      {sale.id}
                    </TableCell>
                    <TableCell className="text-sm">{sale.branchId}</TableCell>
                    <TableCell className="text-sm">{sale.deviceId}</TableCell>
                    <TableCell className="text-sm">
                      {sale.cashierUserId}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${sale.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{sale.paymentType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sale.syncStatus === "synced" ? "default" : "secondary"
                        }
                      >
                        {sale.syncStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleString()}
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
