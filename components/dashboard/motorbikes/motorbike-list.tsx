import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2, Eye } from "lucide-react";
import { Motorbike, MotorbikeUnit } from "@/types";

interface MotorbikeListProps {
  motorbikes: Motorbike[];
  getBrandName: (brandId: number) => string;
  onEdit: (motorbike: Motorbike) => void;
  onDelete: (motorbikeId: number) => void;
  onViewDetail: (motorbike: Motorbike) => void;
}

export function MotorbikeList({
  motorbikes,
  getBrandName,
  onEdit,
  onDelete,
  onViewDetail,
}: MotorbikeListProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b transition-colors hover:bg-muted/50">
            <th className="h-12 px-4 text-left font-medium">ID</th>
            <th className="h-12 px-4 text-left font-medium">Name</th>
            <th className="h-12 px-4 text-left font-medium">Brand</th>
            <th className="h-12 px-4 text-left font-medium">Price</th>
            <th className="h-12 px-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {motorbikes.map((motorbike) => (
            <tr
              key={motorbike.id}
              className="border-b transition-colors hover:bg-muted/50"
            >
              <td className="p-4">{motorbike.id}</td>
              <td className="p-4 font-medium">{motorbike.name}</td>
              <td className="p-4">{getBrandName(motorbike.brand_id)}</td>
              <td className="p-4">
                $
                {motorbike.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="p-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => onEdit(motorbike)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => onViewDetail(motorbike)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View{" "}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer"
                      onClick={() => onDelete(motorbike.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
          {motorbikes.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                No motorbikes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
