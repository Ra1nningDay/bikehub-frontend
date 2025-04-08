import { Bike } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PopularBike({
  name,
  rentals,
  availability,
  trend,
}: {
  name: string;
  rentals: number;
  availability: string;
  trend: "up" | "down";
}) {
  return (
    <div className="flex items-center">
      <div className="w-9 h-9 rounded bg-orange-100 flex items-center justify-center">
        <Bike className="h-5 w-5 text-orange-600" />
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{availability}</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-sm font-medium">{rentals} rentals</p>
        <p
          className={cn(
            "text-xs",
            trend === "up" ? "text-green-600" : "text-red-600",
          )}
        >
          {trend === "up" ? "↑" : "↓"} {trend === "up" ? "+12%" : "-5%"}
        </p>
      </div>
    </div>
  );
}
