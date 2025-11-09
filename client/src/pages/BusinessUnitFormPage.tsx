import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import BusinessUnitForm from "@/components/BusinessUnitForm";
import type { BusinessUnit, InsertBusinessUnit } from "@shared/schema";

export default function BusinessUnitFormPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/edit/:id");
  const { toast } = useToast();
  const isEdit = !!match;
  const businessUnitId = params?.id;

  const { data: businessUnit, isLoading } = useQuery<BusinessUnit>({
    queryKey: ["/api/business-units", businessUnitId],
    enabled: isEdit && !!businessUnitId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertBusinessUnit) => {
      await apiRequest("POST", "/api/business-units", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/business-units"] });
      toast({
        title: "Success",
        description: "Business unit created successfully",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create business unit",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertBusinessUnit) => {
      await apiRequest("PATCH", `/api/business-units/${businessUnitId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/business-units"] });
      queryClient.invalidateQueries({ queryKey: ["/api/business-units", businessUnitId] });
      toast({
        title: "Success",
        description: "Business unit updated successfully",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update business unit",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertBusinessUnit) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    setLocation("/");
  };

  if (isEdit && isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <BusinessUnitForm
      initialData={businessUnit}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={isEdit}
    />
  );
}
