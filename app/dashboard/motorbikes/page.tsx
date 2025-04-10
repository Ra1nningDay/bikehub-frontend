"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotorbikeList } from "@/components/dashboard/motorbikes/motorbike-list";
import { BrandList } from "@/components/dashboard/motorbikes/brand-list";
import { MotorbikeForm } from "@/components/dashboard/motorbikes/motorbike-form";
import { BrandForm } from "@/components/dashboard/motorbikes/brand-form";
import { useMotorbikeManagement } from "@/hooks/mototbikes/use-motobike-manangement";
import { MotorbikeDetailModal } from "@/components/dashboard/motorbikes/motorbike-detail";
import type { Motorbike, MotorbikeBrand } from "@/types";
import { toast } from "react-toastify";

interface MotorbikeFormData {
    id: number;
    brand_id: number;
    name: string;
    price: string;
    image?: File | string; // รองรับ image ใน form
}

export default function MotorbikesPage() {
    const {
        brands,
        motorbikes,
        searchBrand,
        setSearchBrand,
        searchMotorbike,
        setSearchMotorbike,
        filteredBrands,
        filteredMotorbikes,
        getBrandName,
        handleAddBrand,
        handleEditBrand,
        handleDeleteBrand,
        handleAddMotorbike,
        handleEditMotorbike,
        handleDeleteMotorbike,
    } = useMotorbikeManagement();

    const [selectedMotorbike, setSelectedMotorbike] =
        useState<Motorbike | null>(null);
    const [motorbikeDetailModalOpen, setMotorbikeDetailModalOpen] =
        useState(false);
    const [brandForm, setBrandForm] = useState<MotorbikeBrand>({
        id: 0,
        name: "",
        description: "",
    });
    const [isEditingBrand, setIsEditingBrand] = useState<boolean>(false);
    const [brandDialogOpen, setBrandDialogOpen] = useState<boolean>(false);
    const [motorbikeForm, setMotorbikeForm] = useState<MotorbikeFormData>({
        id: 0,
        brand_id: brands[0]?.id || 0,
        name: "",
        price: "1",
        image: undefined,
    });
    const [isEditingMotorbike, setIsEditingMotorbike] =
        useState<boolean>(false);
    const [motorbikeDialogOpen, setMotorbikeDialogOpen] =
        useState<boolean>(false);

    // อัพเดท brand_id เมื่อ brands โหลด
    useEffect(() => {
        if (brands.length > 0 && motorbikeForm.brand_id === 0) {
            setMotorbikeForm((prev) => ({ ...prev, brand_id: brands[0].id }));
        }
    }, [brands, motorbikeForm.brand_id]);

    const onAddBrand = () => {
        setIsEditingBrand(false);
        setBrandForm({ id: 0, name: "", description: "" });
        setBrandDialogOpen(true);
    };

    const onEditBrand = (brand: MotorbikeBrand) => {
        setIsEditingBrand(true);
        setBrandForm(brand);
        setBrandDialogOpen(true);
    };

    const onSaveBrand = () => {
        isEditingBrand ? handleEditBrand(brandForm) : handleAddBrand(brandForm);
        setBrandDialogOpen(false);
    };

    const onAddMotorbike = () => {
        setIsEditingMotorbike(false);
        setMotorbikeForm({
            id: 0,
            brand_id: brands[0]?.id || 0,
            name: "",
            price: "1",
            image: undefined,
        });
        setSelectedMotorbike(null);
        setMotorbikeDialogOpen(true);
    };

    const onEditMotorbike = (motorbike: Motorbike) => {
        setIsEditingMotorbike(true);
        setSelectedMotorbike(motorbike);
        setMotorbikeForm({
            id: motorbike.id,
            brand_id: motorbike.brand_id,
            name: motorbike.name,
            price: motorbike.price.toString(),
            image: motorbike.image,
        });
        setMotorbikeDialogOpen(true);
    };

    const onAddMotorbikeSubmit = async () => {
        const price = parseFloat(motorbikeForm.price);
        if (
            !motorbikeForm.name ||
            isNaN(price) ||
            price <= 0 ||
            !motorbikeForm.brand_id
        ) {
            toast.error(
                "Please fill in all required fields with valid values."
            );
            return;
        }

        const result = await handleAddMotorbike({
            id: motorbikeForm.id,
            name: motorbikeForm.name,
            price: price,
            brand_id: motorbikeForm.brand_id,
            image: motorbikeForm.image,
        });

        if (result.success) {
            toast.success("Motorbike added successfully!");
            setMotorbikeDialogOpen(false);
            setMotorbikeForm({
                id: 0,
                brand_id: brands[0]?.id || 0,
                name: "",
                price: "1",
                image: undefined,
            });
        } else {
            toast.error("Failed to add motorbike.");
            console.error("Error from handleAddMotorbike:", result.error);
        }
    };

    const onEditMotorbikeSubmit = async () => {
        const price = parseFloat(motorbikeForm.price);
        if (
            !motorbikeForm.name ||
            isNaN(price) ||
            price <= 0 ||
            !motorbikeForm.brand_id ||
            !motorbikeForm.id
        ) {
            toast.error(
                "Please fill in all required fields with valid values."
            );
            return;
        }

        const result = await handleEditMotorbike({
            id: motorbikeForm.id,
            name: motorbikeForm.name,
            price: price,
            brand_id: motorbikeForm.brand_id,
            image: motorbikeForm.image,
        });

        if (result.success) {
            toast.success("Motorbike updated successfully!");
            setMotorbikeDialogOpen(false);
        } else {
            toast.error("Failed to update motorbike.");
            console.error("Error from handleEditMotorbike:", result.error);
        }
    };

    const handleOpenDetailModal = (motorbike: Motorbike) => {
        setSelectedMotorbike(motorbike);
        setMotorbikeDetailModalOpen(true);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Motorbike Management
                </h2>
            </div>

            <Tabs defaultValue="motorbikes" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="motorbikes">Motorbikes</TabsTrigger>
                    <TabsTrigger value="brands">Brands</TabsTrigger>
                </TabsList>

                <TabsContent value="motorbikes" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search motorbikes..."
                                className="pl-8"
                                value={searchMotorbike}
                                onChange={(e) =>
                                    setSearchMotorbike(e.target.value)
                                }
                            />
                        </div>
                        <Button onClick={onAddMotorbike}>
                            <Plus className="mr-2 h-4 w-4" /> Add Motorbike
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Motorbikes</CardTitle>
                            <CardDescription>
                                Manage your motorbike inventory
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MotorbikeList
                                motorbikes={filteredMotorbikes}
                                getBrandName={getBrandName}
                                onEdit={onEditMotorbike}
                                onDelete={handleDeleteMotorbike}
                                onViewDetail={handleOpenDetailModal}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="brands" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search brands..."
                                className="pl-8"
                                value={searchBrand}
                                onChange={(e) => setSearchBrand(e.target.value)}
                            />
                        </div>
                        <Button onClick={onAddBrand}>
                            <Plus className="mr-2 h-4 w-4" /> Add Brand
                        </Button>
                    </div>
                    <BrandList
                        brands={filteredBrands}
                        motorbikes={motorbikes}
                        onEdit={onEditBrand}
                        onDelete={handleDeleteBrand}
                    />
                </TabsContent>
            </Tabs>

            <BrandForm
                open={brandDialogOpen}
                onOpenChange={setBrandDialogOpen}
                form={brandForm}
                setForm={setBrandForm}
                onSave={onSaveBrand}
                isEditing={isEditingBrand}
            />

            <MotorbikeForm
                open={motorbikeDialogOpen}
                onOpenChange={setMotorbikeDialogOpen}
                form={motorbikeForm}
                setForm={(form: MotorbikeFormData) => setMotorbikeForm(form)}
                onAdd={onAddMotorbikeSubmit}
                onEdit={onEditMotorbikeSubmit}
                brands={brands}
                isEditing={isEditingMotorbike}
                currentImage={selectedMotorbike?.image}
            />

            <MotorbikeDetailModal
                open={motorbikeDetailModalOpen}
                onOpenChange={setMotorbikeDetailModalOpen}
                motorbike={selectedMotorbike}
                brandName={
                    selectedMotorbike
                        ? getBrandName(selectedMotorbike.brand_id)
                        : ""
                }
            />
        </>
    );
}
