"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth"; // Adjusted to use useAuth

interface PageHeaderProps {
    title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
    const { logout } = useAuth(); // Now using useAuth for logout
    const router = useRouter();

    const handleLogout = () => {
        logout(); // Call the logout function from useAuth
        router.push("/"); // Redirect to home page after logging out
    };

    return (
        <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Link href="/" className="hover:text-blue-600">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="font-medium text-gray-900">
                                Account
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
