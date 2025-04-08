import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function BrandList({ brands, motorcycles, onEdit, onDelete }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <Card key={brand.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{brand.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(brand)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete(brand.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{brand.description}</p>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              {motorcycles.filter((m) => m.brand_id === brand.id).length}{" "}
              motorcycles
            </div>
          </CardFooter>
        </Card>
      ))}
      {brands.length === 0 && (
        <Card className="col-span-full">
          <CardContent className="p-6 text-center text-muted-foreground">
            No brands found
          </CardContent>
        </Card>
      )}
    </div>
  );
}
