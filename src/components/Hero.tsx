import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  // Generate random floating hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
  }));

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-pastel-pink to-pastel-peach overflow-hidden">
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300/40 pointer-events-none"
          style={{ left: heart.left, bottom: '-10%' }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart size={heart.size} className="fill-current" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center px-6 flex flex-col items-center"
      >
        <h1 className="font-pacifico text-5xl md:text-7xl text-pink-700 mb-4 drop-shadow-md">
          {config.heroTitle}
        </h1>
        <h2 className="font-poppins text-xl md:text-2xl text-pink-800/80 mb-2 font-medium">
          {config.partnerName}
        </h2>
        <p className="font-inter text-gray-700 mb-10 max-w-md text-center">
          {config.heroSubtitle}
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="bg-pink-500 hover:bg-pink-600 text-white font-poppins font-semibold py-3 px-8 rounded-full shadow-lg transition-colors flex items-center gap-2"
        >
          {config.heroCTA}
          <Heart size={18} className="fill-white" />
        </motion.button>
      </motion.div>
    </section>
  );
};
