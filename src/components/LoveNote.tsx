import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { config } from '../config';

export const LoveNote: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);

  return (
    <section className="py-24 px-6 bg-pastel-cream flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        onViewportEnter={() => setStartTyping(true)}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 relative"
      >
        <div className="absolute -top-6 -left-6 text-6xl opacity-20 transform -rotate-12">✉️</div>
        <div className="absolute -bottom-6 -right-6 text-6xl opacity-20 transform rotate-12">💌</div>
        
        <h3 className="font-pacifico text-3xl text-amber-600 mb-6 text-center">
          A Note For You...
        </h3>
        
        <div className="font-poppins text-lg md:text-xl text-gray-700 leading-relaxed min-h-[150px]">
          {startTyping && (
            <Typewriter
              options={{
                delay: 45,
                cursor: "💖",
              }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(300)
                  .typeString(config.loveNote)
                  .start();
              }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};
