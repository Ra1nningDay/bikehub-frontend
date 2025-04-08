import {
  useMotorbikeStore,
  useMotorbikes,
  useBrands,
  useCreateMotorbike,
  useUpdateMotorbike,
  useDeleteMotorbike,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  getBrandName,
} from "@/lib/motorbike-store";
import { Motorbike, MotorbikeBrand } from "@/types";
import { motorbikeSchema, brandSchema } from "@/lib/schemas";

export function useMotorbikeManagement() {
  const { searchMotorbike, searchBrand, setSearchMotorbike, setSearchBrand } =
    useMotorbikeStore();

  const { data: motorbikes = [], isLoading: motorbikesLoading } =
    useMotorbikes();
  const { data: brands = [], isLoading: brandsLoading } = useBrands();

  const createMotorbikeMutation = useCreateMotorbike();
  const updateMotorbikeMutation = useUpdateMotorbike();
  const deleteMotorbikeMutation = useDeleteMotorbike();

  const createBrandMutation = useCreateBrand();
  const updateBrandMutation = useUpdateBrand();
  const deleteBrandMutation = useDeleteBrand();

  const filteredMotorbikes = motorbikes.filter((motorbike) =>
    motorbike.name.toLowerCase().includes(searchMotorbike.toLowerCase()),
  );

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase()),
  );

  const handleAddMotorbike = (motorbike: Omit<Motorbike, "id">) => {
    const validatedMotorbike = motorbikeSchema.parse(motorbike);
    createMotorbikeMutation.mutate(validatedMotorbike);
  };

  const handleEditMotorbike = (updatedMotorbike: Motorbike) => {
    const validatedMotorbike = motorbikeSchema.parse(updatedMotorbike);
    updateMotorbikeMutation.mutate({
      id: updatedMotorbike.id,
      data: validatedMotorbike,
    });
  };

  const handleDeleteMotorbike = (motorbikeId: number) => {
    deleteMotorbikeMutation.mutate(motorbikeId);
  };

  const handleAddBrand = (brand: Omit<MotorbikeBrand, "id">) => {
    const validatedBrand = brandSchema.parse(brand);
    createBrandMutation.mutate(validatedBrand);
  };

  const handleEditBrand = (updatedBrand: MotorbikeBrand) => {
    const validatedBrand = brandSchema.parse(updatedBrand);
    updateBrandMutation.mutate({ id: updatedBrand.id, data: validatedBrand });
  };

  const handleDeleteBrand = (brandId: number) => {
    deleteBrandMutation.mutate(brandId);
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
    getBrandName: (brandId: number) => getBrandName(brands, brandId),
    handleAddBrand,
    handleEditBrand,
    handleDeleteBrand,
    handleAddMotorbike,
    handleEditMotorbike,
    handleDeleteMotorbike,
    motorbikesLoading,
    brandsLoading,
  };
}
