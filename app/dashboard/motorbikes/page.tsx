"use client";

import { useState } from "react";
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
import { Motorbike, MotorbikeBrand } from "@/types";

interface MotorbikeFormData {
  id: number;
  brand_id: number;
  name: string;
  price: string;
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
    price: "",
  });
  const [isEditingMotorbike, setIsEditingMotorbike] = useState<boolean>(false); // เปลี่ยนจาก isEditingMotorcycle เป็น isEditingMotorbike
  const [motorbikeDialogOpen, setMotorbikeDialogOpen] =
    useState<boolean>(false); // เปลี่ยนจาก motorcycleDialogOpen เป็น motorbikeDialogOpen

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
    // เปลี่ยนจาก onAddMotorcycle เป็น onAddMotorbike
    setIsEditingMotorbike(false);
    setMotorbikeForm({
      id: 0,
      brand_id: brands[0]?.id || 0,
      name: "",
      price: "",
    });
    setMotorbikeDialogOpen(true);
  };

  const onEditMotorbike = (motorbike: Motorbike) => {
    // เปลี่ยนจาก onEditMotorcycle เป็น onEditMotorbike
    setIsEditingMotorbike(true);
    setMotorbikeForm({ ...motorbike, price: motorbike.price.toString() });
    setMotorbikeDialogOpen(true);
  };

  const onSaveMotorbike = () => {
    // เปลี่ยนจาก onSaveMotorcycle เป็น onSaveMotorbike
    const formattedMotorbike = {
      ...motorbikeForm,
      price: parseFloat(motorbikeForm.price),
      brand_id: Number(motorbikeForm.brand_id),
    };
    isEditingMotorbike
      ? handleEditMotorbike(formattedMotorbike)
      : handleAddMotorbike(formattedMotorbike);
    setMotorbikeDialogOpen(false);
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
                onChange={(e) => setSearchMotorbike(e.target.value)}
              />
            </div>
            <Button onClick={onAddMotorbike}>
              <Plus className="mr-2 h-4 w-4" /> Add Motorbike
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Motorbikes</CardTitle>
              <CardDescription>Manage your motorbike inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <MotorbikeList
                motorbikes={filteredMotorbikes}
                getBrandName={getBrandName}
                onEdit={onEditMotorbike}
                onDelete={handleDeleteMotorbike}
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
        setForm={setMotorbikeForm}
        onSave={onSaveMotorbike}
        brands={brands}
        isEditing={isEditingMotorbike}
      />
    </>
  );
}
