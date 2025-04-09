"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import useMotorbikes from "@/hooks/mototbikes/use-motorbikes";
import type { Motorbike } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export default function MotorbikePage() {
  const { motorbikes: allMotorbikes, isLoading, error } = useMotorbikes();
  const [filteredMotorbikes, setFilteredMotorbikes] = useState<Motorbike[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Extract unique brands and categories
  // const brands = allMotorbikes ? [...new Set(allMotorbikes.map((bike) => bike.brand))].sort() : []
  // const categories = allMotorbikes ? [...new Set(allMotorbikes.map((bike) => bike.category))].sort() : []

  // Extract unique brands and categories - handle objects
  const brands = allMotorbikes
    ? [
        ...new Set(
          allMotorbikes
            .map((bike) =>
              typeof bike.brand === "object" && bike.brand !== null
                ? bike.brand.name
                : bike.brand,
            )
            .filter(Boolean),
        ),
      ].sort()
    : [];

  const categories = allMotorbikes
    ? [
        ...new Set(
          allMotorbikes
            .map((bike) =>
              typeof bike.category === "object" && bike.category !== null
                ? bike.category.name
                : bike.category,
            )
            .filter(Boolean),
        ),
      ].sort()
    : [];

  // Get min and max price for the range slider
  const minPrice = allMotorbikes?.length
    ? Math.min(...allMotorbikes.map((bike) => bike.price))
    : 0;
  const maxPrice = allMotorbikes?.length
    ? Math.max(...allMotorbikes.map((bike) => bike.price))
    : 1000;

  // Update price range when motorbikes are loaded
  useEffect(() => {
    if (allMotorbikes?.length && minPrice !== 0 && maxPrice !== 1000) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [allMotorbikes, minPrice, maxPrice]);

  // Apply filters
  useEffect(() => {
    if (!allMotorbikes?.length) return;

    let filtered = [...allMotorbikes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((bike) => {
        const brandName =
          typeof bike.brand === "object" && bike.brand !== null
            ? bike.brand.name
            : bike.brand;

        return (
          bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (brandName &&
            brandName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    }

    // Apply price range filter
    filtered = filtered.filter(
      (bike) => bike.price >= priceRange[0] && bike.price <= priceRange[1],
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((bike) => {
        const brandName =
          typeof bike.brand === "object" && bike.brand !== null
            ? bike.brand.name
            : bike.brand;
        return brandName && selectedBrands.includes(brandName);
      });
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((bike) => {
        const categoryName =
          typeof bike.category === "object" && bike.category !== null
            ? bike.category.name
            : bike.category;
        return categoryName && selectedCategories.includes(categoryName);
      });
    }

    // Apply sorting
    const sortedFiltered = [...filtered];
    switch (sortOption) {
      case "price-low-high":
        sortedFiltered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedFiltered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sortedFiltered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "rating":
        sortedFiltered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default sorting (featured)
        break;
    }

    setFilteredMotorbikes(sortedFiltered);

    // Count active filters
    let count = 0;
    if (searchQuery) count++;
    if (priceRange[0] > minPrice || priceRange[1] < maxPrice) count++;
    count += selectedBrands.length;
    count += selectedCategories.length;
    setActiveFiltersCount(count);
  }, [
    allMotorbikes,
    searchQuery,
    priceRange,
    selectedBrands,
    selectedCategories,
    sortOption,
    minPrice,
    maxPrice,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSortOption("featured");
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Explore Our Motorbikes
            </h1>
            <p className="text-center max-w-2xl mx-auto mb-8">
              Choose the motorbike that suits your dream trip and start enjoying
              the beauty of nature.
            </p>

            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                <Input
                  type="text"
                  placeholder="Search by name or brand..."
                  className="pl-10 bg-white/20 border-none text-white placeholder:text-blue-200 focus-visible:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-2 text-white hover:bg-white/20"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-orange-500 hover:bg-orange-600">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filter Motorbikes</SheetTitle>
                    <SheetDescription>
                      Refine your search to find the perfect motorbike
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="price"
                    >
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <Slider
                              defaultValue={[minPrice, maxPrice]}
                              min={minPrice}
                              max={maxPrice}
                              step={10}
                              value={priceRange}
                              onValueChange={setPriceRange}
                            />
                            <div className="flex justify-between">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="brands">
                        <AccordionTrigger>Brands</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {brands.map((brand) => (
                              <div
                                key={brand}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`brand-${brand}`}
                                  checked={selectedBrands.includes(brand)}
                                  onCheckedChange={() => toggleBrand(brand)}
                                />
                                <label
                                  htmlFor={`brand-${brand}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {brand}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {categories.map((category) => (
                              <div
                                key={category}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`category-${category}`}
                                  checked={selectedCategories.includes(
                                    category,
                                  )}
                                  onCheckedChange={() =>
                                    toggleCategory(category)
                                  }
                                />
                                <label
                                  htmlFor={`category-${category}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <SheetFooter className="sm:justify-between flex-row gap-3">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-600">
                Showing {filteredMotorbikes.length} of{" "}
                {allMotorbikes?.length || 0} motorbikes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Sort by:
                </span>
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters display */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>

              {searchQuery && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}

              {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button onClick={() => setPriceRange([minPrice, maxPrice])}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}

              {selectedBrands.map((brand) => (
                <Badge
                  key={brand}
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {brand}
                  <button onClick={() => toggleBrand(brand)}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              ))}

              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {category}
                  <button onClick={() => toggleCategory(category)}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-sm"
              >
                Clear all
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500">Loading motorbikes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-500 text-lg mb-2">
                {error.message || "An error occurred"}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredMotorbikes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-gray-50 rounded-lg"
            >
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="No results"
                width={120}
                height={120}
                className="mx-auto mb-4 opacity-50"
              />
              <h3 className="text-xl font-semibold mb-2">
                No motorbikes found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={resetFilters}>Reset All Filters</Button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredMotorbikes.map((motorbike) => (
                  <motion.div
                    layout
                    key={motorbike.id}
                    variants={itemVariants}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <Image
                        src={
                          motorbike.image ||
                          "/placeholder.svg?height=300&width=500"
                        }
                        alt={motorbike.name || "Motorbike"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-orange-500">
                          {typeof motorbike.category === "object" &&
                          motorbike.category !== null
                            ? motorbike.category.name
                            : motorbike.category || "Uncategorized"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {motorbike.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {typeof motorbike.brand === "object" &&
                            motorbike.brand !== null
                              ? motorbike.brand.name
                              : motorbike.brand || "Unknown brand"}
                          </p>
                        </div>
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                          <span className="text-blue-600 font-semibold">
                            ${motorbike.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            /day
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < (motorbike.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({motorbike.rating?.toFixed(1) || "N/A"})
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                        <span>{motorbike.engineSize || "N/A"}cc</span>
                        <span>
                          {motorbike.createdAt
                            ? new Date(motorbike.createdAt).getFullYear()
                            : "Year not available"}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <Button asChild className="flex-1">
                          <Link href={`/motorbike/${motorbike.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
