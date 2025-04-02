"use client"

import { motion } from "framer-motion"

export default function Logo() {
  return (
    <motion.div
      className="flex items-center font-bold text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-blue-600">BIKE</span>
      <motion.span
        className="text-orange-500"
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        HUB
      </motion.span>
    </motion.div>
  )
}

