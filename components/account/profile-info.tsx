"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/auth/use-auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Edit, Check } from "lucide-react";
import type { User as UserType } from "@/types";

interface ProfileInfoProps {
    user: UserType | null;
}

const profileFormSchema = z.object({
    fullName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    address: z.string().optional(),
    bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileInfo({ user }: ProfileInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { updateUserProfile, isLoading } = useAuth();
    const { toast } = useToast();

    // เรียก useForm ก่อนเสมอ ไม่ว่าจะมี user หรือไม่
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullName: user?.name || user?.fullName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
            bio: user?.bio || "",
        },
    });

    const onSubmit = async (data: ProfileFormValues) => {
        if (!user) return; // ป้องกันการ submit ถ้าไม่มี user
        try {
            await updateUserProfile(data);
            setIsEditing(false);
            toast({
                title: "Profile Updated",
                description:
                    "Your profile information has been updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Update Failed",
                description:
                    "There was an error updating your profile. Please try again.",
                variant: "destructive",
            });
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    // ถ้าไม่มี user แสดง UI ว่าง แต่ยังคงลำดับ Hook
    if (!user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No user data available.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Manage your personal information and preferences
                        </CardDescription>
                    </div>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage
                                        src={user.avatar || ""}
                                        alt={
                                            user.name || user.fullName || "User"
                                        }
                                    />
                                    <AvatarFallback className="text-lg">
                                        {getInitials(
                                            user.name || user.fullName || ""
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium">
                                        Profile Picture
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Upload a new profile picture (coming
                                        soon)
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+1 (555) 123-4567"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="123 Main St, City, Country"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !user} // ป้องกัน submit ถ้าไม่มี user
                                    className="flex items-center gap-2"
                                >
                                    {isLoading ? "Saving..." : "Save Changes"}
                                    {!isLoading && (
                                        <Check className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage
                                    src={user.avatar || ""}
                                    alt={user.name || user.fullName || "User"}
                                />
                                <AvatarFallback className="text-lg">
                                    {getInitials(
                                        user.name || user.fullName || ""
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {user.name ||
                                        user.fullName ||
                                        "Unknown User"}
                                </h2>
                                <p className="text-gray-500">
                                    Member since{" "}
                                    {new Date(
                                        user.createdAt || Date.now()
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>
                                    <p className="font-medium">
                                        {user.name ||
                                            user.fullName ||
                                            "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>
                                    <p className="font-medium">
                                        {user.email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Phone Number
                                    </p>
                                    <p className="font-medium">
                                        {user.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Address
                                    </p>
                                    <p className="font-medium">
                                        {user.address || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {user.bio && (
                            <div className="pt-4 border-t">
                                <p className="text-sm text-gray-500 mb-1">
                                    Bio
                                </p>
                                <p>{user.bio}</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
