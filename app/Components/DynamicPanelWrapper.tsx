'use client'
import React, { useRef, useEffect } from 'react';

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
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const stepRef = useRef<1 | 2 | 3>(initialStep);
  const frameRef = useRef<number | null>(null);
  const pendingY = useRef<number | null>(null);

  const positions = [82, 40, -30]; // steps from bottom
  const getTranslateY = (s: number) => positions[s - 1];

  const getPageY = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!e) return startY.current;
    if ('touches' in e && e.touches.length > 0) return e.touches[0].clientY;
    if ('clientY' in e) return e.clientY;
    return startY.current;
  };

  const updatePosition = (y: number, reportState = false) => {
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${y}vh)`;
    }
    if (onTranslateYChange && reportState) {
      onTranslateYChange(y);
    }
  };

  const scheduleUpdate = (y: number) => {
    pendingY.current = y;
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      if (pendingY.current !== null) {
        updatePosition(pendingY.current, false);
        pendingY.current = null;
      }
      frameRef.current = null;
    });
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startY.current = getPageY(e);
    currentY.current =
      parseFloat(
        panelRef.current?.style.transform
          .replace('translateY(', '')
          .replace('vh)', '') || `${getTranslateY(stepRef.current)}`
      );
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;

    if ('touches' in e) e.preventDefault();

    const dy = getPageY(e) - startY.current;
    let newY = currentY.current + (dy / window.innerHeight) * 100;

    // ✅ Apply soft resistive boundaries for smooth mobile drag
    if (newY > positions[0]) {
      newY = positions[0] + (newY - positions[0]) * 0.2; // top resistive pull
    } else if (newY < positions[2]) {
      newY = positions[2] + (newY - positions[2]) * 0.2; // bottom resistive pull
    }

    scheduleUpdate(newY);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const current = parseFloat(
      panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') || '0'
    );

    if (current >= positions[1]) {
      const snapPositions = positions.slice(0, 2);
      let nearestStep: 1 | 2 = 1;
      let minDiff = Math.abs(current - snapPositions[0]);
      snapPositions.forEach((pos, idx) => {
        const diff = Math.abs(current - pos);
        if (diff < minDiff) {
          minDiff = diff;
          nearestStep = (idx + 1) as 1 | 2;
        }
      });
      stepRef.current = nearestStep;
      animateToStep(nearestStep);
    } else {
      stepRef.current = 3;
      onTranslateYChange?.(current);
    }
  };

  const animateToStep = (s: 1 | 2) => {
    if (!panelRef.current) return;
    const target = getTranslateY(s);

    const animate = () => {
      if (!panelRef.current) return;
      const current = parseFloat(
        panelRef.current.style.transform.replace('translateY(', '').replace('vh)', '') || '0'
      );
      const diff = target - current;

      if (Math.abs(diff) < 0.5) {
        updatePosition(target, true);
        return;
      }

      updatePosition(current + diff * 0.2, false);
      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    const initY = getTranslateY(stepRef.current);
    updatePosition(initY, true);
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed top-0 left-0 w-full h-screen z-[100] touch-pan-y"
      style={{ touchAction: 'none', willChange: 'transform' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {children}
    </div>
  );
}
