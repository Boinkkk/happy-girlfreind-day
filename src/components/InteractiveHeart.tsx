import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { config } from '../config';

export const InteractiveHeart: React.FC = () => {
  const [clicks, setClicks] = useState(0);

  const handleTap = () => {
    setClicks(prev => prev + 1);

    // Fire confetti
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd1dc', '#ff69b4', '#ff1493', '#d4af37']
    });
  };

  return (
    <section className="py-32 px-6 bg-pastel-pink flex flex-col items-center justify-center text-center overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="z-10"
      >
        <h3 className="font-pacifico text-3xl text-pink-700 mb-12">
          {config.interactiveTitle}
        </h3>
        
        <motion.button
          onClick={handleTap}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8, rotate: Math.random() * 20 - 10 }}
          className="relative group focus:outline-none"
        >
          <div className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
          <Heart 
            size={120} 
            className="text-pink-600 fill-pink-500 drop-shadow-2xl relative z-10"
          />
        </motion.button>
        
        {clicks > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={clicks}
            className="mt-8 font-poppins font-semibold text-pink-800 text-xl"
          >
            {clicks > 10 ? "Wow! So much love! 💖💖💖" : `You tapped ${clicks} times! 💖`}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
