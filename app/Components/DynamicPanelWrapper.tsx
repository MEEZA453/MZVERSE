'use client'
import React, { useRef, useLayoutEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface DynamicPanelWrapperProps {
  children: React.ReactNode;
  initialStep?: 1 | 2 | 3;
  onTranslateYChange?: (y: number) => void;
}

export default function DynamicPanelWrapper({
  children,
  initialStep = 2,
  onTranslateYChange,
}: DynamicPanelWrapperProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<1 | 2 | 3>(initialStep);

  const positions = [102, 40, -25]; // step1, step2, step3
  const DRAG_THRESHOLD = 15; // drag threshold in vh

  const getTranslateY = (s: number) => positions[s - 1];

  const updatePosition = (y: number, report = false) => {
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${y}vh)`;
    }
    if (report && onTranslateYChange) onTranslateYChange(y);
  };

  const animateToStep = (s: 1 | 2 | 3) => {
    if (!panelRef.current) return;
    const target = getTranslateY(s);

    const animate = () => {
      if (!panelRef.current) return;
      const current = parseFloat(
        panelRef.current.style.transform.replace('translateY(', '').replace('vh)', '') || '0'
      );
      const diff = target - current;
      if (Math.abs(diff) < 0.5) return updatePosition(target, true);
      updatePosition(current + diff * 0.2);
      requestAnimationFrame(animate);
    };

    animate();
  };

  // run once for initial step
  useLayoutEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${getTranslateY(stepRef.current)}vh)`;
      if (onTranslateYChange) onTranslateYChange(getTranslateY(stepRef.current));
    }
  }, []);

  // handle pan with Framer Motion
  const handlePan = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dy = (info.delta.y / window.innerHeight) * 100; // convert px → vh
    const current = parseFloat(
      panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') ||
        `${getTranslateY(stepRef.current)}`
    );
    let newY = current + dy;
    newY = Math.min(positions[0], Math.max(positions[2], newY));
    updatePosition(newY);
  };

  const handlePanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = parseFloat(
      panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') || '0'
    );
    const stepIndex = stepRef.current - 1;
    const distanceMoved = current - positions[stepIndex];

    if (distanceMoved > DRAG_THRESHOLD && stepRef.current > 1) {
      stepRef.current = (stepRef.current - 1) as 1 | 2 | 3;
    } else if (distanceMoved < -DRAG_THRESHOLD && stepRef.current < 3) {
      stepRef.current = (stepRef.current + 1) as 1 | 2 | 3;
    }
    animateToStep(stepRef.current);
  };

  return (
    <motion.div
      ref={panelRef}
      className="fixed top-0 left-0 w-full h-screen z-[100]"
      style={{
        touchAction: 'none',
        willChange: 'transform',
        transform: `translateY(${getTranslateY(stepRef.current)}vh)`,
      }}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
    >
      {children}
    </motion.div>
  );
}
