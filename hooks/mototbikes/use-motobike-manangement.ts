import { useState } from "react";
import { mockBrands, mockMotorbike } from "../../data/motorbikeMock";
import { Motorbike, MotorbikeBrand } from "@/types";

export function useMotorbikeManagement() {
  const [brands, setBrands] = useState<MotorbikeBrand[]>(mockBrands);
  const [motorbikes, setMotorbikes] = useState<Motorbike[]>(mockMotorbike);
  const [searchBrand, setSearchBrand] = useState<string>("");
  const [searchMotorbike, setSearchMotorbike] = useState<string>("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase()),
  );

  const filteredMotorbikes = motorbikes.filter((motorbike) =>
    motorbike.name.toLowerCase().includes(searchMotorbike.toLowerCase()),
  );

  const getBrandName = (brandId: number): string => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Unknown";
  };

  const handleAddBrand = (brand: Omit<MotorbikeBrand, "id">) => {
    const newId = Math.max(...brands.map((b) => b.id), 0) + 1;
    setBrands([...brands, { ...brand, id: newId }]);
  };

  const handleEditBrand = (updatedBrand: MotorbikeBrand) => {
    setBrands(brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b)));
  };

  const handleDeleteBrand = (brandId: number) => {
    setBrands(brands.filter((b) => b.id !== brandId));
    setMotorbikes(motorbikes.filter((m) => m.brand_id !== brandId));
  };

  const handleAddMotorbike = (motorbike: Omit<Motorbike, "id">) => {
    const newId = Math.max(...motorbikes.map((m) => m.id), 0) + 1;
    setMotorbikes([...motorbikes, { ...motorbike, id: newId }]);
  };

  const handleEditMotorbike = (updatedMotorbike: Motorbike) => {
    setMotorbikes(
      motorbikes.map((m) =>
        m.id === updatedMotorbike.id ? updatedMotorbike : m,
      ),
    );
  };

  const handleDeleteMotorbike = (motorbikeId: number) => {
    setMotorbikes(motorbikes.filter((m) => m.id !== motorbikeId));
  };

  return {
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
  };
}
