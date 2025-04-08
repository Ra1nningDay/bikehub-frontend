import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

export function MotorcycleList({
  motorcycles,
  getBrandName,
  onEdit,
  onDelete,
}) {
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
          {motorcycles.map((motorcycle) => (
            <tr
              key={motorcycle.id}
              className="border-b transition-colors hover:bg-muted/50"
            >
              <td className="p-4">{motorcycle.id}</td>
              <td className="p-4 font-medium">{motorcycle.name}</td>
              <td className="p-4">{getBrandName(motorcycle.brand_id)}</td>
              <td className="p-4">
                $
                {motorcycle.price.toLocaleString(undefined, {
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
                    <DropdownMenuItem onClick={() => onEdit(motorcycle)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(motorcycle.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
          {motorcycles.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                No motorcycles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
