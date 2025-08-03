import React from 'react';
import { motion } from 'framer-motion';

export default function Marketplace() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-6"
    >
      <h1 className="text-2xl font-bold mb-4">🛒 Marketplace</h1>
      {/* Marketplace content */}
    </motion.div>
  );
}
