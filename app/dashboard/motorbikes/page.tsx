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
import { MotorcycleList } from "@/components/dashboard/motorbikes/motorbike-list";
import { BrandList } from "@/components/dashboard/motorbikes/brand-list";
import { MotorcycleForm } from "@/components/dashboard/motorbikes/motorbike-form";
import { BrandForm } from "@/components/dashboard/motorbikes/brand-form";
import { useMotorbikeManagement } from "@/hooks/mototbikes/use-motobike-manangement";

export default function MotorcyclesPage() {
  const {
    brands,
    motorcycles,
    searchBrand,
    setSearchBrand,
    searchMotorcycle,
    setSearchMotorcycle,
    filteredBrands,
    filteredMotorcycles,
    getBrandName,
    handleAddBrand,
    handleEditBrand,
    handleDeleteBrand,
    handleAddMotorcycle,
    handleEditMotorcycle,
    handleDeleteMotorcycle,
  } = useMotorbikeManagement();

  const [brandForm, setBrandForm] = useState({
    id: 0,
    name: "",
    description: "",
  });
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);

  const [motorcycleForm, setMotorcycleForm] = useState({
    id: 0,
    brand_id: brands[0]?.id || 0,
    name: "",
    price: "",
  });
  const [isEditingMotorcycle, setIsEditingMotorcycle] = useState(false);
  const [motorcycleDialogOpen, setMotorcycleDialogOpen] = useState(false);

  const onAddBrand = () => {
    setIsEditingBrand(false);
    setBrandForm({ id: 0, name: "", description: "" });
    setBrandDialogOpen(true);
  };

  const onEditBrand = (brand) => {
    setIsEditingBrand(true);
    setBrandForm(brand);
    setBrandDialogOpen(true);
  };

  const onSaveBrand = () => {
    isEditingBrand ? handleEditBrand(brandForm) : handleAddBrand(brandForm);
    setBrandDialogOpen(false);
  };

  const onAddMotorcycle = () => {
    setIsEditingMotorcycle(false);
    setMotorcycleForm({
      id: 0,
      brand_id: brands[0]?.id || 0,
      name: "",
      price: "",
    });
    setMotorcycleDialogOpen(true);
  };

  const onEditMotorcycle = (motorcycle) => {
    setIsEditingMotorcycle(true);
    setMotorcycleForm({ ...motorcycle, price: motorcycle.price.toString() });
    setMotorcycleDialogOpen(true);
  };

  const onSaveMotorcycle = () => {
    const formattedMotorcycle = {
      ...motorcycleForm,
      price: parseFloat(motorcycleForm.price),
      brand_id: Number(motorcycleForm.brand_id),
    };
    isEditingMotorcycle
      ? handleEditMotorcycle(formattedMotorcycle)
      : handleAddMotorcycle(formattedMotorcycle);
    setMotorcycleDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Motorcycle Management
        </h2>
      </div>

      <Tabs defaultValue="motorcycles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="motorcycles">Motorcycles</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
        </TabsList>

        <TabsContent value="motorcycles" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search motorcycles..."
                className="pl-8"
                value={searchMotorcycle}
                onChange={(e) => setSearchMotorcycle(e.target.value)}
              />
            </div>
            <Button onClick={onAddMotorcycle}>
              <Plus className="mr-2 h-4 w-4" /> Add Motorcycle
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Motorcycles</CardTitle>
              <CardDescription>
                Manage your motorcycle inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MotorcycleList
                motorcycles={filteredMotorcycles}
                getBrandName={getBrandName}
                onEdit={onEditMotorcycle}
                onDelete={handleDeleteMotorcycle}
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
            motorcycles={motorcycles}
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

      <MotorcycleForm
        open={motorcycleDialogOpen}
        onOpenChange={setMotorcycleDialogOpen}
        form={motorcycleForm}
        setForm={setMotorcycleForm}
        onSave={onSaveMotorcycle}
        brands={brands}
        isEditing={isEditingMotorcycle}
      />
    </>
  );
}
