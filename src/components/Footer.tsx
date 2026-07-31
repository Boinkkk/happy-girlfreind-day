import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';

export const Footer: React.FC = () => {

  return (
    <footer className="bg-white py-12 px-6 flex flex-col items-center justify-center border-t border-pink-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center flex flex-col items-center"
      >

        <p className="font-inter text-gray-500 text-sm flex items-center justify-center gap-1">
          {config.footerText} <Heart size={14} className="text-pink-400 fill-pink-400" />
        </p>
      </motion.div>
    </footer>
  );
};
