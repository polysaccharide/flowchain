import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBusinessUnitSchema, type InsertBusinessUnit } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusinessUnitFormProps {
  initialData?: Partial<InsertBusinessUnit>;
  onSubmit: (data: InsertBusinessUnit) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function BusinessUnitForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: BusinessUnitFormProps) {
  const form = useForm<InsertBusinessUnit>({
    resolver: zodResolver(insertBusinessUnitSchema),
    defaultValues: {
      businessUnitCode: initialData?.businessUnitCode || "",
      dc: initialData?.dc || "",
      customerSapCode: initialData?.customerSapCode || "",
      vehicleGroup: initialData?.vehicleGroup || "",
      productType: initialData?.productType || "",
      remark: initialData?.remark || "",
      orderTemplate: initialData?.orderTemplate || "",
      newJob: initialData?.newJob || false,
      hubAvailable: initialData?.hubAvailable || false,
      firstShipment: initialData?.firstShipment || false,
      subContractors: initialData?.subContractors || [],
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Business Unit Config</span>
            <span>/</span>
            <span>Business Unit Config form</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            {isEdit ? "Edit Business Unit Config" : "Create Business Unit Config"}
          </h1>
        </div>

        <div className="bg-card border border-card-border rounded-md p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="businessUnitCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Business Unit Code <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger data-testid="select-business-unit-code">
                            <SelectValue placeholder="Please select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lotus">Lotus</SelectItem>
                            <SelectItem value="Honda">Honda</SelectItem>
                            <SelectItem value="ANC">ANC</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        DC <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger data-testid="select-dc">
                            <SelectValue placeholder="Please select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ALL NOW COMPLEX">ALL NOW COMPLEX</SelectItem>
                            <SelectItem value="ALL Complex">ALL Complex</SelectItem>
                            <SelectItem value="DC Central">DC Central</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerSapCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Customer SAP Code <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="-"
                          data-testid="input-customer-sap-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Vehicle Group <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger data-testid="select-vehicle-group">
                            <SelectValue placeholder="Please select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Group A">Group A</SelectItem>
                            <SelectItem value="Group B">Group B</SelectItem>
                            <SelectItem value="Group C">Group C</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Product Type <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger data-testid="select-product-type">
                            <SelectValue placeholder="Please select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Type A">Type A</SelectItem>
                            <SelectItem value="Type B">Type B</SelectItem>
                            <SelectItem value="Type C">Type C</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Remark <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="-"
                          data-testid="input-remark"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orderTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Order Template <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger data-testid="select-order-template">
                            <SelectValue placeholder="Please select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Template 1">Template 1</SelectItem>
                            <SelectItem value="Template 2">Template 2</SelectItem>
                            <SelectItem value="Template 3">Template 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-6">
                <FormField
                  control={form.control}
                  name="newJob"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-new-job"
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">New Job</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hubAvailable"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-hub-available"
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">HUB available?</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstShipment"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-first-shipment"
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">First shipment?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <Tabs defaultValue="default-order" className="w-full">
                <TabsList>
                  <TabsTrigger value="default-order" data-testid="tab-default-order">
                    Default Order Info
                  </TabsTrigger>
                  <TabsTrigger value="subcontractor" data-testid="tab-subcontractor">
                    Subcontractor
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="default-order" className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    All Sub Contractors section content will be displayed here
                  </div>
                </TabsContent>
                <TabsContent value="subcontractor" className="mt-4">
                  <FormField
                    control={form.control}
                    name="subContractors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Contractors <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Select
                            value={field.value?.[0] || ""}
                            onValueChange={(value) => field.onChange([value])}
                          >
                            <SelectTrigger data-testid="select-subcontractors">
                              <SelectValue placeholder="Please select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Contractor A">Contractor A</SelectItem>
                              <SelectItem value="Contractor B">Contractor B</SelectItem>
                              <SelectItem value="Contractor C">Contractor C</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-end gap-2 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-save">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
