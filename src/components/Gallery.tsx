import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { Play, X } from 'lucide-react';

export type GalleryItem = string | {
  type?: 'image' | 'video';
  url: string;
  caption?: string;
};

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<{ url: string; isVideo: boolean; caption?: string } | null>(null);

  const getItemData = (item: GalleryItem) => {
    if (typeof item === 'string') {
      const isVid = item.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i) !== null;
      return { url: item, isVideo: isVid, caption: undefined };
    }
    const isVid = item.type === 'video' || (Boolean(item.url) && item.url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i) !== null);
    return { url: item.url, isVideo: Boolean(isVid), caption: item.caption };
  };

  return (
    <section className="py-24 px-6 bg-pastel-pink/50 flex flex-col items-center">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-pacifico text-4xl text-pink-700 mb-12 text-center"
      >
        {config.galleryTitle}
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {config.galleryPhotos.map((rawItem, index) => {
          const item = getItemData(rawItem as GalleryItem);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedItem(item)}
              className="relative rounded-2xl overflow-hidden shadow-lg border-[6px] border-white cursor-pointer aspect-square bg-slate-900 group"
            >
              {item.isVideo ? (
                <>
                  <video
                    src={item.url}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-pink-600 shadow-md group-hover:scale-110 transition-transform">
                      <Play size={24} className="fill-current ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.url}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <X size={28} />
            </button>

            {/* Media Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-auto h-auto flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black"
            >
              {selectedItem.isVideo ? (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="max-h-[75vh] max-w-full rounded-t-2xl object-contain"
                />
              ) : (
                <img
                  src={selectedItem.url}
                  alt="Expanded view"
                  className="max-h-[75vh] max-w-full rounded-t-2xl object-contain"
                />
              )}

              {selectedItem.caption && (
                <div className="w-full bg-slate-900/90 text-white p-4 text-center font-poppins text-sm md:text-base border-t border-white/10">
                  {selectedItem.caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
