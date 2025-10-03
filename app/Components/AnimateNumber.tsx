'use client'
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  skipAnimation?: boolean; // new prop to skip animation
  duration?: number;       // optional: control duration
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, skipAnimation = false, duration = 1.5 }) => {
  const count = useMotionValue(skipAnimation ? value : 0); // start at value if skipping
  const rounded = useTransform(count, (latest) => latest.toFixed(2));

  useEffect(() => {
    if (skipAnimation) {
      count.set(value); // set instantly if skipping animation
      return;
    }

    const controls = animate(count, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [value, skipAnimation, count, duration]);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedNumber;
