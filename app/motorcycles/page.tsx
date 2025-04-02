"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";

// Sample motorcycle data
const motorcycles = [
  {
    id: 1,
    name: "Honda ADV 160 Red",
    brand: "Honda",
    category: "Adventure",
    price: 25,
    image:
      "https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/NewADV160-2022/2023/ADV160-Blue-W685xH426.png",
    rating: 4.5,
    reviews: 28,
  },
  {
    id: 2,
    name: "Honda ADV 160 Green",
    brand: "Honda",
    category: "Adventure",
    price: 25,
    image:
      "https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/ADV160_2024/Car_Color_-_Car_Color_image_Green.png",
    rating: 4.3,
    reviews: 19,
  },
  {
    id: 3,
    name: "Honda PCX 160",
    brand: "Honda",
    category: "Scooter",
    price: 22,
    image:
      "https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/24_PCX160/Color/Color_Chart_W685xH426_PX_Grey.jpg",
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 4,
    name: "Yamaha NMAX 155",
    brand: "Yamaha",
    category: "Scooter",
    price: 22,
    image:
      "https://storagetym.blob.core.windows.net/www2021/images/product-2021/commuter/model-year-2023/nmax-connected-2023/lineup-360-prestige-grey/2.png?sfvrsn=d4a7d019_2",
    rating: 4.6,
    reviews: 35,
  },
  {
    id: 5,
    name: "Kawasaki Ninja 400",
    brand: "Kawasaki",
    category: "Sport",
    price: 35,
    image:
      "https://www.kawasaki.co.th/uploads/products/ninja400/ninja400-gy2-02.jpg",
    rating: 4.8,
    reviews: 31,
  },
  {
    id: 6,
    name: "Yamaha MT-03",
    brand: "Yamaha",
    category: "Naked",
    price: 30,
    image:
      "https://storagetym.blob.core.windows.net/www2021/images/product-2021/commuter/model-year-2022/mt-03-2022/lineup-360-black/0.png?sfvrsn=6305e057_4",
    rating: 4.4,
    reviews: 23,
  },
];

export default function MotorcyclesPage() {
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    priceRange: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const filteredMotorcycles = motorcycles.filter((motorcycle) => {
    let matches = true;

    if (filters.brand && motorcycle.brand !== filters.brand) {
      matches = false;
    }

    if (filters.category && motorcycle.category !== filters.category) {
      matches = false;
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (motorcycle.price < min || motorcycle.price > max) {
        matches = false;
      }
    }

    return matches;
  });

  const brands = Array.from(new Set(motorcycles.map((m) => m.brand)));
  const categories = Array.from(new Set(motorcycles.map((m) => m.category)));

  return (
    <>
      {/* Header */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Explore Our Motorcycles
            </h1>
            <p className="text-center max-w-2xl mx-auto">
              Choose the motorcycle that suits your dream trip and start
              enjoying the beauty of nature.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-gray-100 p-3 rounded-md"
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <motion.div
              className={`md:w-1/4 ${showFilters ? "block" : "hidden"} md:block`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Brand</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="brand-all"
                        name="brand"
                        checked={filters.brand === ""}
                        onChange={() => handleFilterChange("brand", "")}
                        className="mr-2"
                      />
                      <label htmlFor="brand-all">All Brands</label>
                    </div>
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="radio"
                          id={`brand-${brand}`}
                          name="brand"
                          checked={filters.brand === brand}
                          onChange={() => handleFilterChange("brand", brand)}
                          className="mr-2"
                        />
                        <label htmlFor={`brand-${brand}`}>{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="category-all"
                        name="category"
                        checked={filters.category === ""}
                        onChange={() => handleFilterChange("category", "")}
                        className="mr-2"
                      />
                      <label htmlFor="category-all">All Categories</label>
                    </div>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          checked={filters.category === category}
                          onChange={() =>
                            handleFilterChange("category", category)
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category}`}>
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-all"
                        name="price"
                        checked={filters.priceRange === ""}
                        onChange={() => handleFilterChange("priceRange", "")}
                        className="mr-2"
                      />
                      <label htmlFor="price-all">All Prices</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-20-25"
                        name="price"
                        checked={filters.priceRange === "20-25"}
                        onChange={() =>
                          handleFilterChange("priceRange", "20-25")
                        }
                        className="mr-2"
                      />
                      <label htmlFor="price-20-25">$20 - $25</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-25-30"
                        name="price"
                        checked={filters.priceRange === "25-30"}
                        onChange={() =>
                          handleFilterChange("priceRange", "25-30")
                        }
                        className="mr-2"
                      />
                      <label htmlFor="price-25-30">$25 - $30</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-30-plus"
                        name="price"
                        checked={filters.priceRange === "30-100"}
                        onChange={() =>
                          handleFilterChange("priceRange", "30-100")
                        }
                        className="mr-2"
                      />
                      <label htmlFor="price-30-plus">$30+</label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Motorcycle Listings */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMotorcycles.map((motorcycle, index) => (
                  <motion.div
                    key={motorcycle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={motorcycle.image || "/placeholder.svg"}
                        alt={motorcycle.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {motorcycle.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">
                        {motorcycle.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${
                                i < Math.floor(motorcycle.rating)
                                  ? "fill-current"
                                  : "stroke-current fill-none"
                              }`}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm ml-1">
                          ({motorcycle.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-4">
                        ${motorcycle.price}
                        <span className="text-sm text-gray-500 font-normal">
                          /day
                        </span>
                      </p>
                      <Link
                        href="/booking"
                        className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded font-medium transition-colors block text-center"
                      >
                        Rent Now
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredMotorcycles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No motorcycles found matching your filters.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({ brand: "", category: "", priceRange: "" })
                    }
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
