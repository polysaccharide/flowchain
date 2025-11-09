import { useState } from "react";
import { Link } from "wouter";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { BusinessUnit } from "@shared/schema";

interface BusinessUnitListProps {
  businessUnits: BusinessUnit[];
  onDelete: (id: string) => void;
}

export default function BusinessUnitList({ businessUnits, onDelete }: BusinessUnitListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUnits = businessUnits.filter(
    (unit) =>
      unit.businessUnitCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.dc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUnits = filteredUnits.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Business Unit Config</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Business Unit Config List</h1>
          </div>
          <Link href="/create">
            <Button data-testid="button-create">
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </Link>
        </div>

        <div className="mb-4 flex justify-end">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="border rounded-md overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">No</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Business Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">DC</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedUnits.map((unit, index) => (
                  <tr key={unit.id} className="hover-elevate" data-testid={`row-business-unit-${index}`}>
                    <td className="px-6 py-4 text-sm text-foreground">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{unit.businessUnitCode}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{unit.dc}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/edit/${unit.id}`}>
                          <Button
                            size="icon"
                            variant="ghost"
                            data-testid={`button-edit-${index}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(unit.id)}
                          data-testid={`button-delete-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredUnits.length} / page
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              data-testid="button-previous-page"
            >
              &lt;
            </Button>
            <span className="text-sm text-foreground" data-testid="text-page-number">
              {currentPage}
            </span>
            <span className="text-sm text-muted-foreground">10 / page</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              data-testid="button-next-page"
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
