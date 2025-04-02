"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    motorcycle: "",
    name: "",
    email: "",
    phone: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form logic would go here
      alert("Booking submitted successfully!");
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

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
              Book Your Motorbike
            </h1>
            <p className="text-center max-w-2xl mx-auto">
              Complete the form below to reserve your motorbike and start your
              adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-100 p-4">
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-1">Rental Details</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div
                    className={`h-1 w-full ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-1">Personal Info</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div
                    className={`h-1 w-full ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 3
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-sm mt-1">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Step 1: Rental Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Rental Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="pickupLocation"
                        className="block text-gray-700 mb-2"
                      >
                        Pickup Location
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <select
                          id="pickupLocation"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select location</option>
                          <option value="location1">Downtown</option>
                          <option value="location2">Airport</option>
                          <option value="location3">Beach Area</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="dropoffLocation"
                        className="block text-gray-700 mb-2"
                      >
                        Drop-off Location
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <select
                          id="dropoffLocation"
                          name="dropoffLocation"
                          value={formData.dropoffLocation}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select location</option>
                          <option value="location1">Downtown</option>
                          <option value="location2">Airport</option>
                          <option value="location3">Beach Area</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="pickupDate"
                        className="block text-gray-700 mb-2"
                      >
                        Pickup Date
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="date"
                          id="pickupDate"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="dropoffDate"
                        className="block text-gray-700 mb-2"
                      >
                        Drop-off Date
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="date"
                          id="dropoffDate"
                          name="dropoffDate"
                          value={formData.dropoffDate}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="motorcycle"
                      className="block text-gray-700 mb-2"
                    >
                      Select Motorcycle
                    </label>
                    <select
                      id="motorcycle"
                      name="motorcycle"
                      value={formData.motorcycle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a motorcycle</option>
                      <option value="honda-adv-160">Honda ADV 160</option>
                      <option value="honda-pcx-160">Honda PCX 160</option>
                      <option value="yamaha-nmax">Yamaha NMAX</option>
                      <option value="kawasaki-ninja-400">
                        Kawasaki Ninja 400
                      </option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 (234) 567-8900"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    Confirm Your Booking
                  </h2>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg mb-4">
                      Booking Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Clock
                          className="text-gray-500 mr-3 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">Rental Period</p>
                          <p className="font-medium">
                            {formData.pickupDate} to {formData.dropoffDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin
                          className="text-gray-500 mr-3 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            Pickup Location
                          </p>
                          <p className="font-medium">
                            {formData.pickupLocation === "location1" &&
                              "Downtown"}
                            {formData.pickupLocation === "location2" &&
                              "Airport"}
                            {formData.pickupLocation === "location3" &&
                              "Beach Area"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin
                          className="text-gray-500 mr-3 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            Drop-off Location
                          </p>
                          <p className="font-medium">
                            {formData.dropoffLocation === "location1" &&
                              "Downtown"}
                            {formData.dropoffLocation === "location2" &&
                              "Airport"}
                            {formData.dropoffLocation === "location3" &&
                              "Beach Area"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users
                          className="text-gray-500 mr-3 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            Personal Information
                          </p>
                          <p className="font-medium">{formData.name}</p>
                          <p className="text-sm">{formData.email}</p>
                          <p className="text-sm">{formData.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg mb-4">
                      Selected Motorcycle
                    </h3>

                    <div className="flex items-center">
                      <div className="relative w-24 h-24 mr-4">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Motorcycle"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {formData.motorcycle === "honda-adv-160" &&
                            "Honda ADV 160"}
                          {formData.motorcycle === "honda-pcx-160" &&
                            "Honda PCX 160"}
                          {formData.motorcycle === "yamaha-nmax" &&
                            "Yamaha NMAX"}
                          {formData.motorcycle === "kawasaki-ninja-400" &&
                            "Kawasaki Ninja 400"}
                        </p>
                        <p className="text-blue-600 font-bold mt-1">$25/day</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg mb-4">
                      Payment Method
                    </h3>

                    <div className="flex items-center">
                      <CreditCard className="text-gray-500 mr-3" size={20} />
                      <span>Pay at pickup (Cash or Card)</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
                    >
                      <CheckCircle className="mr-2" size={18} />
                      Confirm Booking
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
