import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function RecentBooking({
  name,
  bike,
  time,
  status,
}: {
  name: string;
  bike: string;
  time: string;
  status: "active" | "completed" | "cancelled";
}) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{bike}</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-sm">{time}</p>
        <div>
          {status === "active" && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          )}
          {status === "completed" && (
            <Badge variant="outline" className="text-muted-foreground">
              Completed
            </Badge>
          )}
          {status === "cancelled" && (
            <Badge
              variant="destructive"
              className="bg-red-100 text-red-800 hover:bg-red-100"
            >
              Cancelled
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
