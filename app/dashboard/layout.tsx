"use client";

import { useState } from "react";
import "@/styles/globals.css";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-10 hidden w-64 flex-col border-r bg-background transition-all md:flex",
          isSidebarOpen ? "left-0" : "-left-64",
        )}
      >
        <Sidebar />
      </aside>{" "}
      {/* Main Content */}
      <main
        className={cn(
          "flex flex-1 flex-col md:ml-64",
          isSidebarOpen ? "md:ml-64" : "md:ml-0",
        )}
      >
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <QueryClientProvider client={queryClient}>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
        </QueryClientProvider>
      </main>
    </div>
  );
}
