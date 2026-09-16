import React from 'react';
import { motion } from 'framer-motion';

export const TextShimmer = () => {
  return (
    <div className="relative text-zinc-200 font-medium text-lg">
      思考中
      <motion.div
        className="absolute inset-0 text-zinc-900 dark:text-white"
        style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)", maskSize: "200% 100%" }}
        animate={{ maskPosition: ["100% 0%", "-100% 0%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        思考中
      </motion.div>
    </div>
  );
};
