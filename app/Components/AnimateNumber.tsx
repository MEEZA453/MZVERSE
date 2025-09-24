   'use client'
   import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0); 
  const rounded = useTransform(count, (latest) => latest.toFixed(2)); // 2 decimals

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop; // cleanup on unmount
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedNumber;