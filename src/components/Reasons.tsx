import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { Sparkles, ChevronDown } from 'lucide-react';

export const Reasons: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-pastel-peach flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12 text-orange-600"
      >
        <Sparkles size={28} />
        <h3 className="font-pacifico text-3xl md:text-4xl text-center">
          {config.reasonsTitle}
        </h3>
        <Sparkles size={28} />
      </motion.div>

      <div className="max-w-2xl w-full flex flex-col gap-4">
        {config.reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-orange-100"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-orange-50 transition-colors"
            >
              <span className="font-poppins font-medium text-lg text-orange-900">
                {index + 1}. {reason.title}
              </span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-orange-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-orange-800/80 font-inter leading-relaxed"
                >
                  <p className="pt-2 border-t border-orange-100">
                    {reason.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
