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

export function WhiteLabel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    primaryColor: "",
    secondaryColor: "",
    appName: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const backend = useBackend();

  const { data, isLoading } = useQuery({
    queryKey: ["white-label"],
    queryFn: () => backend.whitelabel.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => backend.whitelabel.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["white-label"] });
      setIsDialogOpen(false);
      setFormData({
        name: "",
        logo: "",
        primaryColor: "",
        secondaryColor: "",
        appName: "",
      });
      toast({
        title: "Success",
        description: "White-label partner created successfully",
      });
    },
    onError: (error) => {
      console.error("Failed to create white-label partner:", error);
      toast({
        title: "Error",
        description: "Failed to create white-label partner",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      name: formData.name,
      brandingMeta: {
        logo: formData.logo,
        primaryColor: formData.primaryColor,
        secondaryColor: formData.secondaryColor,
        appName: formData.appName,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">White Label</h1>
          <p className="text-muted-foreground">
            Manage white-label partners and branding
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create White-Label Partner</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Partner Name</Label>
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
                <Label htmlFor="appName">App Name</Label>
                <Input
                  id="appName"
                  value={formData.appName}
                  onChange={(e) =>
                    setFormData({ ...formData, appName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        primaryColor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondaryColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create Partner
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Partners</CardTitle>
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
                  <TableHead>App Name</TableHead>
                  <TableHead>Enabled</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-mono text-xs">
                      {partner.id}
                    </TableCell>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell className="text-sm">
                      {partner.brandingMeta.appName || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={partner.enabled ? "default" : "secondary"}
                      >
                        {partner.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(partner.createdAt).toLocaleDateString()}
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
