"use client";

import { useState } from "react";
import Link from "next/link";
import { Bike, Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Mock data for brands
const mockBrands = [
  {
    id: 1,
    name: "Honda",
    description: "Japanese motorcycle manufacturer known for reliability",
  },
  {
    id: 2,
    name: "Yamaha",
    description:
      "Japanese manufacturer of motorcycles, musical instruments, and electronics",
  },
  {
    id: 3,
    name: "Kawasaki",
    description:
      "Japanese multinational corporation manufacturing motorcycles and engines",
  },
  {
    id: 4,
    name: "Ducati",
    description:
      "Italian motorcycle manufacturer known for high-performance motorcycles",
  },
  {
    id: 5,
    name: "Harley-Davidson",
    description: "American motorcycle manufacturer founded in 1903",
  },
];

// Mock data for motorcycles
const mockMotorcycles = [
  { id: 1, brand_id: 1, name: "CBR500R", price: 6799.0 },
  { id: 2, brand_id: 2, name: "MT-07", price: 7699.0 },
  { id: 3, brand_id: 3, name: "Z900", price: 8999.0 },
  { id: 4, brand_id: 4, name: "Monster", price: 11995.0 },
  { id: 5, brand_id: 1, name: "Rebel 500", price: 6299.0 },
  { id: 6, brand_id: 2, name: "YZF-R3", price: 5299.0 },
  { id: 7, brand_id: 5, name: "Iron 883", price: 9499.0 },
  { id: 8, brand_id: 3, name: "Ninja 650", price: 7599.0 },
];

export default function MotorcyclesPage() {
  const [brands, setBrands] = useState(mockBrands);
  const [motorcycles, setMotorcycles] = useState(mockMotorcycles);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchMotorcycle, setSearchMotorcycle] = useState("");

  // Brand form state
  const [brandForm, setBrandForm] = useState({
    id: 0,
    name: "",
    description: "",
  });
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);

  // Motorcycle form state
  const [motorcycleForm, setMotorcycleForm] = useState({
    id: 0,
    brand_id: 0,
    name: "",
    price: "",
  });
  const [isEditingMotorcycle, setIsEditingMotorcycle] = useState(false);
  const [motorcycleDialogOpen, setMotorcycleDialogOpen] = useState(false);

  // Filter brands based on search
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase()),
  );

  // Filter motorcycles based on search
  const filteredMotorcycles = motorcycles.filter((motorcycle) =>
    motorcycle.name.toLowerCase().includes(searchMotorcycle.toLowerCase()),
  );

  // Get brand name by ID
  const getBrandName = (brandId: number) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Unknown";
  };

  // Brand CRUD operations
  const handleAddBrand = () => {
    setIsEditingBrand(false);
    setBrandForm({ id: 0, name: "", description: "" });
    setBrandDialogOpen(true);
  };

  const handleEditBrand = (brand: (typeof brands)[0]) => {
    setIsEditingBrand(true);
    setBrandForm({ ...brand });
    setBrandDialogOpen(true);
  };

  const handleDeleteBrand = (brandId: number) => {
    setBrands(brands.filter((brand) => brand.id !== brandId));
    // Also delete associated motorcycles
    setMotorcycles(
      motorcycles.filter((motorcycle) => motorcycle.brand_id !== brandId),
    );
  };

  const handleSaveBrand = () => {
    if (isEditingBrand) {
      setBrands(
        brands.map((brand) => (brand.id === brandForm.id ? brandForm : brand)),
      );
    } else {
      const newId = Math.max(...brands.map((brand) => brand.id), 0) + 1;
      setBrands([...brands, { ...brandForm, id: newId }]);
    }
    setBrandDialogOpen(false);
  };

  // Motorcycle CRUD operations
  const handleAddMotorcycle = () => {
    setIsEditingMotorcycle(false);
    setMotorcycleForm({
      id: 0,
      brand_id: brands[0]?.id || 0,
      name: "",
      price: "",
    });
    setMotorcycleDialogOpen(true);
  };

  const handleEditMotorcycle = (motorcycle: (typeof motorcycles)[0]) => {
    setIsEditingMotorcycle(true);
    setMotorcycleForm({
      ...motorcycle,
      price: motorcycle.price.toString(),
    });
    setMotorcycleDialogOpen(true);
  };

  const handleDeleteMotorcycle = (motorcycleId: number) => {
    setMotorcycles(
      motorcycles.filter((motorcycle) => motorcycle.id !== motorcycleId),
    );
  };

  const handleSaveMotorcycle = () => {
    const formattedMotorcycle = {
      ...motorcycleForm,
      price: parseFloat(motorcycleForm.price),
      brand_id: Number(motorcycleForm.brand_id),
    };

    if (isEditingMotorcycle) {
      setMotorcycles(
        motorcycles.map((motorcycle) =>
          motorcycle.id === formattedMotorcycle.id
            ? formattedMotorcycle
            : motorcycle,
        ),
      );
    } else {
      const newId =
        Math.max(...motorcycles.map((motorcycle) => motorcycle.id), 0) + 1;
      setMotorcycles([...motorcycles, { ...formattedMotorcycle, id: newId }]);
    }
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

        {/* Motorcycles Tab */}
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
            <Button onClick={handleAddMotorcycle}>
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
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          ID
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Name
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Brand
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Price
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMotorcycles.map((motorcycle) => (
                        <tr
                          key={motorcycle.id}
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle">{motorcycle.id}</td>
                          <td className="p-4 align-middle font-medium">
                            {motorcycle.name}
                          </td>
                          <td className="p-4 align-middle">
                            {getBrandName(motorcycle.brand_id)}
                          </td>
                          <td className="p-4 align-middle">
                            $
                            {motorcycle.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEditMotorcycle(motorcycle)
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteMotorcycle(motorcycle.id)
                                  }
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                      {filteredMotorcycles.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-4 text-center text-muted-foreground"
                          >
                            No motorcycles found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brands Tab */}
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
            <Button onClick={handleAddBrand}>
              <Plus className="mr-2 h-4 w-4" /> Add Brand
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((brand) => (
              <Card key={brand.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{brand.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditBrand(brand)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteBrand(brand.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>ID: {brand.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {brand.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    {motorcycles.filter((m) => m.brand_id === brand.id).length}{" "}
                    motorcycles
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredBrands.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="p-6 text-center text-muted-foreground">
                  No brands found
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Brand Dialog */}
      <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingBrand ? "Edit Brand" : "Add New Brand"}
            </DialogTitle>
            <DialogDescription>
              {isEditingBrand
                ? "Update the brand details below."
                : "Fill in the details to add a new motorcycle brand."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input
                id="brand-name"
                value={brandForm.name}
                onChange={(e) =>
                  setBrandForm({ ...brandForm, name: e.target.value })
                }
                placeholder="e.g. Honda, Yamaha"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand-description">Description</Label>
              <Textarea
                id="brand-description"
                value={brandForm.description}
                onChange={(e) =>
                  setBrandForm({ ...brandForm, description: e.target.value })
                }
                placeholder="Brief description of the brand"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBrandDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBrand} disabled={!brandForm.name}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Motorcycle Dialog */}
      <Dialog
        open={motorcycleDialogOpen}
        onOpenChange={setMotorcycleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingMotorcycle ? "Edit Motorcycle" : "Add New Motorcycle"}
            </DialogTitle>
            <DialogDescription>
              {isEditingMotorcycle
                ? "Update the motorcycle details below."
                : "Fill in the details to add a new motorcycle."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="motorcycle-name">Motorcycle Name</Label>
              <Input
                id="motorcycle-name"
                value={motorcycleForm.name}
                onChange={(e) =>
                  setMotorcycleForm({ ...motorcycleForm, name: e.target.value })
                }
                placeholder="e.g. CBR500R, MT-07"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="motorcycle-brand">Brand</Label>
              <Select
                value={motorcycleForm.brand_id.toString()}
                onValueChange={(value) =>
                  setMotorcycleForm({
                    ...motorcycleForm,
                    brand_id: parseInt(value),
                  })
                }
              >
                <SelectTrigger id="motorcycle-brand">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="motorcycle-price">Price ($)</Label>
              <Input
                id="motorcycle-price"
                type="number"
                min="0"
                step="0.01"
                value={motorcycleForm.price}
                onChange={(e) =>
                  setMotorcycleForm({
                    ...motorcycleForm,
                    price: e.target.value,
                  })
                }
                placeholder="e.g. 6799.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMotorcycleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveMotorcycle}
              disabled={
                !motorcycleForm.name ||
                !motorcycleForm.price ||
                !motorcycleForm.brand_id
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
