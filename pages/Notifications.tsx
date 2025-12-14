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

export function Notifications() {
  const backend = useBackend();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => backend.notifications.list({}),
  });

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">
          View all system notifications and alerts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-mono text-xs">
                      {notification.id}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityVariant(notification.severity)}>
                        {notification.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {notification.title}
                    </TableCell>
                    <TableCell className="text-sm">
                      {notification.message}
                    </TableCell>
                    <TableCell className="text-sm">
                      {notification.recipientId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={notification.read ? "outline" : "default"}
                      >
                        {notification.read ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleString()}
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
