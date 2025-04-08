import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Bike,
  Calendar,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <span className="text-xl font-bold">
            <span className="text-blue-600">BIKE</span>
            <span className="text-orange-500">HUB</span>
          </span>
          <span className="text-xs bg-orange-100 text-orange-800 px-1 rounded">
            Admin
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <Calendar className="h-4 w-4" />
            Bookings
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              12
            </Badge>
          </Link>
          <Link
            href="/admin/motorcycles"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <Bike className="h-4 w-4" />
            Motorcycles
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <BarChart3 className="h-4 w-4" />
            Reports
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            Messages
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              4
            </Badge>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid items-start gap-2 text-sm font-medium">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/admin/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            Help & Documentation
          </Link>
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </nav>
      </div>
    </>
  );
}
