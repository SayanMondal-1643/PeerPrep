"use client";

import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Material } from "@/lib/material-types";
import { useAllMaterials, useUpdateMaterial } from "@/lib/hooks/use-materials";

export default function MaterialsTab() {
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isLoading, isError, refetch } = useAllMaterials({
    page,
    limit,
  });
  const updateMaterial = useUpdateMaterial();

  const [materialSearchQuery, setMaterialSearchQuery] = useState("");
  const [materialStatusFilter, setMaterialStatusFilter] = useState("all");
  const [materialTypeFilter, setMaterialTypeFilter] = useState("all");
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  const materials = data?.data ?? [];

  const sortedMaterials = [...materials]
    .filter((material) => {
      const matchesSearch =
        material.title
          .toLowerCase()
          .includes(materialSearchQuery.toLowerCase()) ||
        material._id.toLowerCase().includes(materialSearchQuery.toLowerCase());

      const matchesStatus =
        materialStatusFilter === "all" ||
        material.status === materialStatusFilter;

      const matchesBestMaterial =
        materialTypeFilter === "all" ||
        (materialTypeFilter === "best" && Boolean(material.isBestMaterial)) ||
        (materialTypeFilter === "not-best" && !material.isBestMaterial);

      return matchesSearch && matchesStatus && matchesBestMaterial;
    })
    .sort(
      (a, b) =>
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
    );

  const updateBestMaterial = async (material: Material, nextValue: boolean) => {
    setRowErrors((prev) => ({ ...prev, [material._id]: "" }));

    try {
      await updateMaterial.mutateAsync({
        materialId: material._id,
        updates: { isBestMaterial: nextValue },
      });
    } catch {
      setRowErrors((prev) => ({
        ...prev,
        [material._id]: "Unable to update best material.",
      }));
    }
  };

  const updateStatus = async (
    material: Material,
    nextStatus: Material["status"],
  ) => {
    setRowErrors((prev) => ({ ...prev, [material._id]: "" }));

    try {
      await updateMaterial.mutateAsync({
        materialId: material._id,
        updates: { status: nextStatus },
      });
    } catch {
      setRowErrors((prev) => ({
        ...prev,
        [material._id]: "Unable to update status.",
      }));
    }
  };

  if (isLoading) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-10 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Material Management</h2>
          <p className="text-sm text-red-600">Unable to load materials.</p>
          <Button onClick={() => void refetch()}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">Material Management</h2>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by material title"
              value={materialSearchQuery}
              onChange={(e) => setMaterialSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={materialStatusFilter}
            onChange={(e) => setMaterialStatusFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={materialTypeFilter}
            onChange={(e) => setMaterialTypeFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All Materials</option>
            <option value="best">Best Materials</option>
            <option value="not-best">Not Best Materials</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {sortedMaterials.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No materials found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className="text-center">Upload Date</TableHead>
                <TableHead className="text-center">Best Material</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMaterials.map((material) => {
                const isBestMaterial = Boolean(material.isBestMaterial);
                const isRowPending =
                  updateMaterial.isPending &&
                  updateMaterial.variables?.materialId === material._id;
                const isPendingStatus = isRowPending;
                const isPendingBestMaterial = isRowPending;
                const errorMessage = rowErrors[material._id];

                return (
                  <TableRow key={material._id}>
                    <TableCell className="max-w-xs py-3">
                      <Link
                        href={`${material.fileUrl}`}
                        className="block truncate font-medium text-primary hover:underline"
                        title={material.title}
                        target="_blank"
                      >
                        {material.title}
                      </Link>
                    </TableCell>
                    <TableCell className="py-3 text-center text-sm text-muted-foreground">
                      {material.uploadDate
                        ? new Date(material.uploadDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "—"}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={isBestMaterial}
                          disabled={isPendingBestMaterial}
                          className="data-[state=checked]:bg-amber-500 hover:cursor-pointer"
                          onCheckedChange={(checked) =>
                            updateBestMaterial(material, checked)
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        {material.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:cursor-pointer"
                              disabled={isPendingStatus}
                              onClick={() => updateStatus(material, "approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:cursor-pointer"
                              disabled={isPendingStatus}
                              onClick={() => updateStatus(material, "rejected")}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <Badge
                              variant="outline"
                              className={
                                material.status === "approved"
                                  ? "border-green-200 bg-green-100 text-green-700"
                                  : "border-red-200 bg-red-100 text-red-700"
                              }
                            >
                              {material.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  disabled={isPendingStatus}
                                  aria-label={`Change status for ${material.title}`}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() =>
                                    updateStatus(material, "pending")
                                  }
                                >
                                  Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    updateStatus(material, "approved")
                                  }
                                >
                                  Approved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    updateStatus(material, "rejected")
                                  }
                                >
                                  Rejected
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                        {errorMessage ? (
                          <p className="text-xs text-red-600">{errorMessage}</p>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}
