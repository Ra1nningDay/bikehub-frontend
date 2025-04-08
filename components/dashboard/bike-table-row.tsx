import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function BikeTableRow({
  name,
  status,
  condition,
}: {
  name: string;
  status: "available" | "rented" | "maintenance";
  condition: string;
}) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle font-medium">{name}</td>
      <td className="p-4 align-middle">
        {status === "available" && (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Available
          </Badge>
        )}
        {status === "rented" && (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Rented
          </Badge>
        )}
        {status === "maintenance" && (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Maintenance
          </Badge>
        )}
      </td>
      <td className="p-4 align-middle">{condition}</td>
      <td className="p-4 align-middle text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem>View History</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Remove Bike
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
