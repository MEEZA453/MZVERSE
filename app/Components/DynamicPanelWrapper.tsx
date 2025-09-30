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
  const activeScrollable = useRef<HTMLElement | null>(null);

  const DRAG_THRESHOLD = 5;
  const positions = [82, 40, -30]; // vh positions
  const getTranslateY = (s: number) => positions[s - 1];

  const getPageY = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!e) return startY.current;
    if ('touches' in e && e.touches.length > 0) return e.touches[0].clientY;
    if ('clientY' in e) return e.clientY;
    return startY.current;
  };

  const updatePosition = (y: number, reportState = false) => {
    if (panelRef.current) panelRef.current.style.transform = `translateY(${y}vh)`;
    if (onTranslateYChange && reportState) onTranslateYChange(y);
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
    const target = e.target as HTMLElement;
    activeScrollable.current = target.closest('.scrollable') as HTMLElement | null;

    startY.current = getPageY(e);
    currentY.current =
      parseFloat(
        panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') ||
          `${getTranslateY(stepRef.current)}`
      ) || 0;

    isDragging.current = false;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const dy = getPageY(e) - startY.current;

    // start dragging only after threshold
    if (!isDragging.current && Math.abs(dy) < DRAG_THRESHOLD) return;
    isDragging.current = true;

    // If we are inside a scrollable element
    const scrollable = activeScrollable.current;
    if (scrollable) {
      // allow panel drag only if at top (scrollTop === 0) and dragging down
      if (!(dy > 0 && scrollable.scrollTop === 0)) {
        return; // allow normal scroll
      }
    }

    if ('touches' in e) e.preventDefault();
    let newY = currentY.current + (dy / window.innerHeight) * 100;
    newY = Math.min(positions[0], Math.max(positions[2], newY));
    scheduleUpdate(newY);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) {
      activeScrollable.current = null;
      return; // just a click
    }

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

    activeScrollable.current = null;
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
      style={{ touchAction: 'pan-y', willChange: 'transform' }}
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
