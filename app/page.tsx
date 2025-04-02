"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Shield } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-2.jpeg"
            alt="Motorbike on a scenic road"
            fill
            priority
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Premium Motorbike Rental Service
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Rent your motorbike easy, convenient & transparent
            </p>
            <Link
              href="/booking"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium text-lg transition-colors inline-flex items-center"
            >
              <Calendar className="mr-2" size={20} />
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BIKE HUB?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best motorbike rental experience with our premium
              services and customer-focused approach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Safe & Reliable
              </h3>
              <p className="text-gray-600 text-center">
                All our motorbikes are regularly maintained and come with
                insurance for your peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Calendar className="text-orange-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-center">
                Our streamlined booking process makes it quick and easy to
                reserve your perfect ride.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Multiple Locations
              </h3>
              <p className="text-gray-600 text-center">
                Pick up and drop off your motorbike at any of our convenient
                locations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Bikes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Popular Motorbikes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our wide selection of high-quality motorbikes for your
              next adventure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Honda ADV 160",
                image:
                  "https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/ADV160_2024/Car_Color_-_Car_Color_image_Green.png",
                price: 25,
                category: "Adventure",
              },
              {
                name: "Yamaha NMAX",
                image:
                  "https://storagetym.blob.core.windows.net/www2021/images/product-2021/commuter/model-year-2025/all-new-nmax-2025/lineup-360-magma-black/2.png?sfvrsn=f4ef4f1a_2",
                price: 22,
                category: "Scooter",
              },
              {
                name: "New PCX160",
                image:
                  "https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/24_PCX160/Color/Color_Chart_W685xH426_PX_Blue.png",
                price: 35,
                category: "Sport",
              },
            ].map((bike, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={bike.image || "/placeholder.svg"}
                    alt={bike.name}
                    fill
                    className="object-cover "
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{bike.name}</h3>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {bike.category}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${bike.price}
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

          <div className="text-center mt-8">
            <Link
              href="/motorcycles"
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              View All Motorbikes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your motorbike today and start exploring with BIKE HUB.
            </p>
            <Link
              href="/booking"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors inline-block"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
