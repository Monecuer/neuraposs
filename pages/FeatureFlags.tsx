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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function FeatureFlags() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    scopeType: "merchant",
    scopeId: "",
    featureKey: "",
    enabled: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const backend = useBackend();

  const { data, isLoading } = useQuery({
    queryKey: ["feature-flags"],
    queryFn: () => backend.features.list({}),
  });

  const toggleMutation = useMutation({
    mutationFn: (data: typeof formData) => backend.features.toggle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature-flags"] });
      setIsDialogOpen(false);
      setFormData({
        scopeType: "merchant",
        scopeId: "",
        featureKey: "",
        enabled: false,
      });
      toast({
        title: "Success",
        description: "Feature flag updated successfully",
      });
    },
    onError: (error) => {
      console.error("Failed to update feature flag:", error);
      toast({
        title: "Error",
        description: "Failed to update feature flag",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toggleMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feature Flags</h1>
          <p className="text-muted-foreground">
            Control feature availability per merchant
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Feature Flag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Feature Flag</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scopeType">Scope Type</Label>
                <Select
                  value={formData.scopeType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, scopeType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="merchant">Merchant</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scopeId">Scope ID</Label>
                <Input
                  id="scopeId"
                  value={formData.scopeId}
                  onChange={(e) =>
                    setFormData({ ...formData, scopeId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featureKey">Feature Key</Label>
                <Input
                  id="featureKey"
                  value={formData.featureKey}
                  onChange={(e) =>
                    setFormData({ ...formData, featureKey: e.target.value })
                  }
                  placeholder="e.g., payments.mobile, analytics.advanced"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={formData.enabled}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, enabled: checked })
                  }
                />
                <Label htmlFor="enabled">Enabled</Label>
              </div>
              <Button type="submit" className="w-full">
                Create Feature Flag
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Feature Flags</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Feature Key</TableHead>
                  <TableHead>Scope Type</TableHead>
                  <TableHead>Scope ID</TableHead>
                  <TableHead>Enabled</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.features.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className="font-mono text-xs">
                      {feature.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {feature.featureKey}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{feature.scopeType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {feature.scopeId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={feature.enabled ? "default" : "secondary"}
                      >
                        {feature.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(feature.createdAt).toLocaleDateString()}
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
