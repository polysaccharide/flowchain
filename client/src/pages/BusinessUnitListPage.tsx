import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import BusinessUnitList from "@/components/BusinessUnitList";
import type { BusinessUnit } from "@shared/schema";

export default function BusinessUnitListPage() {
  const { toast } = useToast();

  const { data: businessUnits = [], isLoading } = useQuery<BusinessUnit[]>({
    queryKey: ["/api/business-units"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/business-units/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/business-units"] });
      toast({
        title: "Success",
        description: "Business unit deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete business unit",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this business unit?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <BusinessUnitList businessUnits={businessUnits} onDelete={handleDelete} />;
}
