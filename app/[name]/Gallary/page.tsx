'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { users } from '../../lib/DummyUser';
import { usePathname } from 'next/navigation';

function Gallery() {
  const pathname = usePathname(); // e.g., "/mzco.creative/Gallary"
  const userId = pathname.split('/')[1]; // "mzco.creative"

  const user = users.find((u) => u.id === userId);
  if (!user) return <div>User not found</div>;

  const imageDeta: string[] = user.post.flatMap((p) => p.images);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const x = useMotionValue(0);

  const itemWidth = 48;
  const gap = 8;
  const totalLength = imageDeta.length;
  const totalWidth = totalLength * (itemWidth + gap);

  const handleOnClick = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const unsubscribe = x.onChange((latestX) => {
      const index = Math.round(-latestX / (itemWidth + gap)) % imageDeta.length;
      const positiveIndex = (index + imageDeta.length) % imageDeta.length;
      setSelectedIndex(positiveIndex);
    });
    return () => unsubscribe();
  }, [x, imageDeta.length]);

  const isDarkMode = true; // optional

  return (
    <motion.div className="h-screen w-screen overflow-hidden">
      {/* Main Image */}
      <motion.img
        src={imageDeta[selectedIndex]}
        className="w-[80%] lg:w-[20vw] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Slider */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-screen lg:w-[30vw] overflow-hidden">
        <div className={`bg-gradient-to-l ${isDarkMode ? 'from-black' : 'from-white'} to-transparent h-12 w-32 absolute right-0 z-10 pointer-events-none`} />
        <div className={`bg-gradient-to-r ${isDarkMode ? 'from-black' : 'from-white'} to-transparent h-12 w-32 absolute left-0 z-10 pointer-events-none`} />

        <motion.div
          className="flex gap-2 cursor-grab active:cursor-grabbing"
          ref={sliderRef}
          drag="x"
          dragConstraints={{ left: -totalWidth + 500, right: 0 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
          style={{ x, touchAction: 'pan-y' }}
        >
          {[...imageDeta, ...imageDeta].map((image, index) => (
            <img
              key={index}
         ref={(el: HTMLImageElement | null) => {
  imagesRef.current[index] = el;
}}
              onClick={() => handleOnClick(index % imageDeta.length)}
              src={image}
              className="h-12 object-cover cursor-pointer select-none"
              draggable="false"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Gallery;
