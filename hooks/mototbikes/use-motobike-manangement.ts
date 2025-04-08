import { useState } from "react";
import { mockBrands, mockMotorBike } from "../../data/motorbikeMock";

export function useMotorbikeManagement() {
  const [brands, setBrands] = useState(mockBrands);
  const [motorcycles, setMotorcycles] = useState(mockMotorBike);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchMotorcycle, setSearchMotorcycle] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase()),
  );

  const filteredMotorcycles = motorcycles.filter((motorcycle) =>
    motorcycle.name.toLowerCase().includes(searchMotorcycle.toLowerCase()),
  );

  const getBrandName = (brandId: number) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Unknown";
  };

  // CRUD operations for brands
  const handleAddBrand = (brand) => {
    const newId = Math.max(...brands.map((b) => b.id), 0) + 1;
    setBrands([...brands, { ...brand, id: newId }]);
  };

  const handleEditBrand = (updatedBrand) => {
    setBrands(brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b)));
  };

  const handleDeleteBrand = (brandId) => {
    setBrands(brands.filter((b) => b.id !== brandId));
    setMotorcycles(motorcycles.filter((m) => m.brand_id !== brandId));
  };

  // CRUD operations for motorcycles
  const handleAddMotorcycle = (motorcycle) => {
    const newId = Math.max(...motorcycles.map((m) => m.id), 0) + 1;
    setMotorcycles([...motorcycles, { ...motorcycle, id: newId }]);
  };

  const handleEditMotorcycle = (updatedMotorcycle) => {
    setMotorcycles(
      motorcycles.map((m) =>
        m.id === updatedMotorcycle.id ? updatedMotorcycle : m,
      ),
    );
  };

  const handleDeleteMotorcycle = (motorcycleId) => {
    setMotorcycles(motorcycles.filter((m) => m.id !== motorcycleId));
  };

  return {
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
  };
}
