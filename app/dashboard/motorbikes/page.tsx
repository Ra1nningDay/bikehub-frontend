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

interface MotorbikeFormData {
    id: number;
    brand_id: number;
    name: string;
    price: string;
    image?: File | string;
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

    const handleOpenDetailModal = (motorbike: Motorbike) => {
        setSelectedMotorbike(motorbike);
        setMotorbikeDetailModalOpen(true);
    };

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

    // Update brand_id when brands are loaded
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
        });
        setMotorbikeDialogOpen(true);
    };

    const onSaveMotorbike = async () => {
        console.log("motorbikeForm:", motorbikeForm);
        console.log("selectedMotorbike:", selectedMotorbike);

        // ตรวจสอบค่าที่จำเป็น
        const price = parseFloat(motorbikeForm.price);

        if (
            !motorbikeForm.name ||
            isNaN(price) ||
            price <= 0 ||
            !motorbikeForm.brand_id
        ) {
            console.error(
                "Missing required fields or invalid price:",
                motorbikeForm
            );
            return;
        }

        // สร้าง FormData
        const formData = new FormData();
        formData.append("name", motorbikeForm.name);
        formData.append("price", price.toString());
        formData.append("brand_id", motorbikeForm.brand_id.toString());

        // ตรวจสอบว่ามีไฟล์ใน motorbikeForm.image หรือไม่
        if (motorbikeForm.image) {
            formData.append("image", motorbikeForm.image);
        } else {
            console.error("No image selected");
            return;
        }

        try {
            // ส่งข้อมูลไปยัง API
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/motorbikes`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            if (response.ok) {
                console.log("Motorbike saved:", data);
                setMotorbikeDialogOpen(false); // ปิด dialog
            } else {
                console.error("Failed to save motorbike:", data);
            }
        } catch (error) {
            console.error("Error in onSaveMotorbike:", error);
        }
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
                onSave={onSaveMotorbike}
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
