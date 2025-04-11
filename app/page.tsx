"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, DollarSign, MapPin, Shield, Bike } from "lucide-react";
import useMotorbikes from "@/hooks/mototbikes/use-motorbikes";
import { MotorbikeCard } from "@/components/motorbikes/motorbike-card";

export default function Home() {
    const { allMotorbikes, isLoading, isError, error } = useMotorbikes();
    const popularMotorbikes = allMotorbikes.slice(0, 6);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
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
                <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
                    {/* Left Side: Image of Motorbike */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
                    >
                        {/* <div className="relative w-3/4 h-64 md:h-96">
                            <Image
                                src="/motorbike-hero.png" 
                                alt="Premium motorbike for rent"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div> */}
                    </motion.div>

                    {/* Right Side: Form and Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 text-white"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Ride Your Dream Motorbike!
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Book your motorbike and explore the places you love
                            to go.
                        </p>

                        {/* Search Form */}
                        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-sm font-semibold text-orange-500 mb-4">
                                Motorbike Rental Services
                            </h3>
                            <form className="space-y-4">
                                {/* Type of Motorbike */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Motorbike Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select motorbike type
                                            </option>
                                            <option value="scooter">
                                                Scooter
                                            </option>
                                            <option value="sport">
                                                Sport Bike
                                            </option>
                                            <option value="cruiser">
                                                Cruiser
                                            </option>
                                        </select>
                                        <Bike
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            size={20}
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Pick-up city, address"
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <MapPin
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            size={20}
                                        />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-1">
                                            Pick-up Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                            <Calendar
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                size={20}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-1">
                                            Return Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                            <Calendar
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                size={20}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <Link
                                    href="/motorbikes"
                                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-medium transition-colors"
                                >
                                    Search Motorbikes
                                </Link>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 ">
                <div className="container mx-auto px-4">
                    {/* Categories Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        {/* Left Side: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/3 text-left"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
                                Looking for a Ride?
                            </h2>
                            <p className="text-gray-600">
                                A smart choice for your journey. Choose from our
                                motorbike categories to experience unbeatable
                                prices and expert services.
                            </p>
                        </motion.div>

                        {/* Right Side: Motorbike Categories */}
                        <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-6">
                            {/* Scooter */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="flex-1 bg-white rounded-2xl text-center shadow-xl"
                            >
                                <div className="relative w-full h-40">
                                    <Image
                                        src="https://www.thaihonda.co.th/honda/uploads/cache/645/photos/shares/0125/BUB_______________________-_______.png"
                                        alt="Scooter"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-900 pb-4">
                                    Scooters
                                </h3>
                            </motion.div>

                            {/* Sport Bike */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex-1 bg-white rounded-2xl text-center shadow-xl"
                            >
                                <div className="relative w-full h-40">
                                    <Image
                                        src="https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/24_PCX160/Color/Color_Chart_W685xH426_PX_Blue.png"
                                        alt="Sport Bike"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-900 pb-4">
                                    Sport Bikes
                                </h3>
                            </motion.div>

                            {/* Cruiser */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex-1 bg-white rounded-2xl text-center shadow-xl"
                            >
                                <div className="relative w-full h-40">
                                    <Image
                                        src="https://www.thaihonda.co.th/honda/uploads/cache/685/photos/shares/Newgrom2023/CarColor/05_ThHonda_New-Grom_Wing_center_Color_chart_Gray.png"
                                        alt="Cruiser"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-900 pb-4">
                                    Cruisers
                                </h3>
                            </motion.div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-300 my-8"></div>

                    {/* Islands Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
                            We Serve These Islands Only
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Rent a motorbike with BIKE HUB and explore the
                            beauty of Koh Phangan, Koh Samui, and Koh Tao—our
                            exclusive service areas.
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Koh Phangan */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex-1 bg-white rounded-2xl text-center"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src="/koh-phangan.jpg"
                                    alt="Koh Phangan"
                                    fill
                                    className="object-cover rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                    Koh Phangan
                                </h3>
                                <p className="text-gray-600">
                                    Famous for its Full Moon Party, Koh Phangan
                                    offers beautiful beaches and scenic routes
                                    perfect for a motorbike adventure.
                                </p>
                            </div>
                        </motion.div>

                        {/* Koh Samui */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex-1 bg-white rounded-2xl text-center"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src="/koh-samui.jpg"
                                    alt="Koh Samui"
                                    fill
                                    className="object-cover rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                    Koh Samui
                                </h3>
                                <p className="text-gray-600">
                                    Known for luxury resorts and vibrant
                                    nightlife, Koh Samui has stunning coastal
                                    roads ideal for exploring by motorbike.
                                </p>
                            </div>
                        </motion.div>

                        {/* Koh Tao */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex-1 bg-white rounded-2xl text-center"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src="/koh-tao.jpg"
                                    alt="Koh Tao"
                                    fill
                                    className="object-cover rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                    Koh Tao
                                </h3>
                                <p className="text-gray-600">
                                    A diver’s paradise, Koh Tao offers quiet
                                    roads and breathtaking viewpoints for a
                                    peaceful motorbike ride.
                                </p>
                            </div>
                        </motion.div>
                    </div>
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
                        <h4 className="text-lg font-semibold text-orange-500 mb-2">
                            Ride with Confidence
                        </h4>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
                            Why Choose{" "}
                            <span className="text-orange-500">BIKE</span>
                            <span className="text-blue-600">HUB</span>?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide the best motorbike rental experience with
                            premium services tailored for adventurous travelers.
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        {/* Left Side: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full md:w-1/2"
                        >
                            <div className="relative w-full h-96 rounded-xl shadow-lg overflow-hidden">
                                <Image
                                    src="https://www.shutterstock.com/shutterstock/photos/2508972885/display_1500/stock-photo-portrait-crazy-smiley-young-happy-caucasian-couple-take-smartphone-selfie-while-having-fun-driving-2508972885.jpg"
                                    alt="Couple enjoying a motorbike journey"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                                    Best Rental Services
                                </div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-400 rounded-tr-full opacity-80"></div>
                            </div>
                        </motion.div>

                        {/* Right Side: Why Choose Us List */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full md:w-1/2 space-y-8"
                        >
                            <p className="text-gray-600 text-lg">
                                We provide the best motorbike rental services
                                for you, because we believe that a great ride
                                can enhance your travel experience.
                            </p>

                            <div className="space-y-6">
                                {/* Feature 1: Cost Benefit */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                                        <DollarSign
                                            className="text-white"
                                            size={24}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-blue-900">
                                            Cost Benefit
                                        </h4>
                                        <p className="text-gray-600">
                                            We offer the best rental rates with
                                            various discounts for further
                                            savings.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2: Rental Insurance */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-400 w-16 h-12 rounded-full flex items-center justify-center shadow-md">
                                        <Shield
                                            className="text-white"
                                            size={24}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-blue-900">
                                            Rental Insurance
                                        </h4>
                                        <p className="text-gray-600">
                                            We provide comprehensive rental
                                            insurance for all our customers to
                                            protect your journey in case of
                                            unexpected issues.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3: Quick Process */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-400 w-20 h-12 max-w-[48px] rounded-full flex items-center justify-center shadow-md">
                                        <Calendar
                                            className="text-white"
                                            size={24}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-blue-900">
                                            Quick Process
                                        </h4>
                                        <p className="text-gray-600">
                                            We strive to make the process of
                                            renting a motorbike as streamlined
                                            and efficient as possible, ensuring
                                            a quick and hassle-free experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                            Choose from our wide selection of high-quality
                            motorbikes for your next adventure.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularMotorbikes.map((motorbike, index) => (
                            <motion.div
                                key={motorbike.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <MotorbikeCard motorbike={motorbike} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            href="/motorbikes"
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
            {/* CTA Section
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
                            Book your motorbike today and start exploring with
                            BIKE HUB.
                        </p>
                        <Link
                            href="/booking"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors inline-block"
                        >
                            Book Now
                        </Link>
                    </motion.div>
                </div>
            </section> */}
        </>
    );
}
