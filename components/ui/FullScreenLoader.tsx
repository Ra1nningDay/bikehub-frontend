import React from "react";
import { motion } from "framer-motion"; // Import motion

// Spinner using motion.div for rotation
const MotionSpinner = () => (
    <div>
        <motion.div
            className="h-12 w-12 rounded-full border-4 border-solid border-blue-600 border-r-transparent" // Base styles, remove animate-spin
            aria-label="Loading..."
            role="status"
            animate={{ rotate: 360 }} // Animate rotation
            transition={{
                loop: Infinity, // loop: Infinity is deprecated, use repeat: Infinity
                repeat: Infinity,
                ease: "linear",
                duration: 1, // Adjust speed as needed
            }}
        />
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
        </span>
    </div>
);

interface FullScreenLoaderProps {
    message?: string;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = () => {
    return (
        // Animate the container's appearance
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Fade in
            exit={{ opacity: 0 }} // Fade out (useful if wrapped in AnimatePresence)
            transition={{ duration: 1 }} // Fade duration
        >
            {/* Use the motion spinner */}
            <MotionSpinner />
        </motion.div>
    );
};

export default FullScreenLoader;
