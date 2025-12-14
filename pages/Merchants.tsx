import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "@/lib/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Merchants() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const backend = useBackend();

  const { data, isLoading } = useQuery({
    queryKey: ["merchants"],
    queryFn: () => backend.merchants.list({}),
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => backend.merchants.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
      setIsDialogOpen(false);
      setFormData({ name: "", contactEmail: "", contactPhone: "" });
      toast({
        title: "Success",
        description: "Merchant created successfully",
      });
    },
    onError: (error) => {
      console.error("Failed to create merchant:", error);
      toast({
        title: "Error",
        description: "Failed to create merchant",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Merchants</h1>
          <p className="text-muted-foreground">
            Manage merchants and their configurations
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Merchant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Merchant</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Merchant Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Create Merchant
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Merchants</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.merchants.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell className="font-mono text-xs">
                      {merchant.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {merchant.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{merchant.planId}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          merchant.status === "active" ? "default" : "secondary"
                        }
                      >
                        {merchant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {merchant.contactEmail || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(merchant.createdAt).toLocaleDateString()}
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
