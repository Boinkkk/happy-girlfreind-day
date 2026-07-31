import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const target = new Date(config.specialDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = target - now;
      
      // If the date has passed, let's count UP instead
      if (distance < 0) {
        distance = now - target;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 bg-pastel-lavender flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <h3 className="font-poppins text-2xl md:text-3xl text-purple-800 mb-8 font-semibold">
          {config.countdownTitle}
        </h3>
        <div className="flex gap-3 md:gap-8 justify-center">
          {timeUnits.map((unit, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-sm border border-white/40 min-w-[68px] md:min-w-[100px]">
                <span className="font-pacifico text-3xl md:text-5xl text-purple-600 block">
                  {unit.value}
                </span>
              </div>
              <span className="font-inter text-xs md:text-base text-purple-900/70 mt-2 uppercase tracking-widest font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
