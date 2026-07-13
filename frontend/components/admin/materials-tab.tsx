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
import { useEffect, useState } from "react";
import { Material, ApiMaterialsResponse } from "@/lib/material-types";
import {
  mockMaterialsResponse1,
  mockMaterialsResponse2,
} from "@/lib/mock-data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function MaterialsTab() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [materialSearchQuery, setMaterialSearchQuery] = useState("");
  const [materialStatusFilter, setMaterialStatusFilter] = useState("all");
  const [materialTypeFilter, setMaterialTypeFilter] = useState("all");
  const [pendingBestMaterialIds, setPendingBestMaterialIds] = useState<
    Record<string, boolean>
  >({});
  const [pendingStatusIds, setPendingStatusIds] = useState<
    Record<string, boolean>
  >({});
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  const loadMaterials = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // TODO: add pagination once API supports page/limit params
      // UNCOMMENT THE CODE TO FETCH FROM API
      // const response = await fetch(`${API_BASE_URL}/api/v1/materials`);

      // if (!response.ok) {
      //   throw new Error("Failed to load materials.");
      // }

      // const json: ApiMaterialResponse = await response.json();
      // setMaterials(json.data);

      // MOCK DATA - TO BE REMOVED
      setMaterials([
        ...mockMaterialsResponse1.data,
        ...mockMaterialsResponse2.data,
      ]);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
      setFetchError(
        error instanceof Error ? error.message : "Unable to load materials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMaterials();
  }, []);

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
    const previousValue = Boolean(material.isBestMaterial);

    setMaterials((prev) =>
      prev.map((item) =>
        item._id === material._id
          ? { ...item, isBestMaterial: nextValue }
          : item,
      ),
    );
    setPendingBestMaterialIds((prev) => ({ ...prev, [material._id]: true }));
    setRowErrors((prev) => ({ ...prev, [material._id]: "" }));

    try {
      // UNCOMMENT THE CODE TO PATCH THE API
      // const response = await fetch(`${API_BASE_URL}/api/v1/materials/${material._id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ isBestMaterial: nextValue }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update best material.");
      // }
    } catch {
      setMaterials((prev) =>
        prev.map((item) =>
          item._id === material._id
            ? { ...item, isBestMaterial: previousValue }
            : item,
        ),
      );
      setRowErrors((prev) => ({
        ...prev,
        [material._id]: "Unable to update best material.",
      }));
    } finally {
      setPendingBestMaterialIds((prev) => ({ ...prev, [material._id]: false }));
    }
  };

  const updateStatus = async (
    material: Material,
    nextStatus: Material["status"],
  ) => {
    const previousStatus = material.status;

    setMaterials((prev) =>
      prev.map((item) =>
        item._id === material._id ? { ...item, status: nextStatus } : item,
      ),
    );
    setPendingStatusIds((prev) => ({ ...prev, [material._id]: true }));
    setRowErrors((prev) => ({ ...prev, [material._id]: "" }));

    try {
      // UNCOMMENT THE CODE TO PATCH THE API
      // const response = await fetch(`${API_BASE_URL}/api/v1/materials/${material._id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: nextStatus }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update status.");
      // }
    } catch {
      setMaterials((prev) =>
        prev.map((item) =>
          item._id === material._id
            ? { ...item, status: previousStatus }
            : item,
        ),
      );
      setRowErrors((prev) => ({
        ...prev,
        [material._id]: "Unable to update status.",
      }));
    } finally {
      setPendingStatusIds((prev) => ({ ...prev, [material._id]: false }));
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

  if (fetchError) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Material Management</h2>
          <p className="text-sm text-red-600">{fetchError}</p>
          <Button onClick={() => void loadMaterials()}>Retry</Button>
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
                const isPendingStatus = Boolean(pendingStatusIds[material._id]);
                const isPendingBestMaterial = Boolean(
                  pendingBestMaterialIds[material._id],
                );
                const errorMessage = rowErrors[material._id];

                return (
                  <TableRow key={material._id}>
                    <TableCell className="max-w-xs py-3">
                      <Link
                        href={`/materials/${material._id}`}
                        className="block truncate font-medium text-primary hover:underline"
                        title={material.title}
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
