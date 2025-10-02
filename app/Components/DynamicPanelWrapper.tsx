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

  // 3 snap positions
  const positions = [102, 40, -25]; // step1, step2, step3
  const getTranslateY = (s: number) => positions[s - 1];

  const DRAG_THRESHOLD = 15; // drag threshold in vh

  const getPageY = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!e) return startY.current;
    if ('touches' in e && e.touches.length) return e.touches[0].clientY;
    if ('clientY' in e) return e.clientY;
    return startY.current;
  };

  const updatePosition = (y: number, report = false) => {
    if (panelRef.current) panelRef.current.style.transform = `translateY(${y}vh)`;
    if (report && onTranslateYChange) onTranslateYChange(y);
  };

  const scheduleUpdate = (y: number) => {
    pendingY.current = y;
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      if (pendingY.current !== null) {
        updatePosition(pendingY.current);
        pendingY.current = null;
      }
      frameRef.current = null;
    });
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const scrollable = target.closest('.scrollable') as HTMLElement | null;
    if (scrollable && scrollable.scrollTop > 0) return; // allow scroll if not at top

    isDragging.current = true;
    startY.current = getPageY(e);
    currentY.current =
      parseFloat(panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') || `${getTranslateY(stepRef.current)}`);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    if ('touches' in e) e.preventDefault();

    const dy = getPageY(e) - startY.current;
    let newY = currentY.current + (dy / window.innerHeight) * 100;
    newY = Math.min(positions[0], Math.max(positions[2], newY));
    scheduleUpdate(newY);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const current = parseFloat(panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') || '0');
    const stepIndex = stepRef.current - 1;
    const distanceMoved = current - positions[stepIndex];

    if (distanceMoved > DRAG_THRESHOLD && stepRef.current > 1) {
      stepRef.current = (stepRef.current - 1) as 1 | 2 | 3; // move up
    } else if (distanceMoved < -DRAG_THRESHOLD && stepRef.current < 3) {
      stepRef.current = (stepRef.current + 1) as 1 | 2 | 3; // move down
    }
    animateToStep(stepRef.current);
  };

  const animateToStep = (s: 1 | 2 | 3) => {
    if (!panelRef.current) return;
    const target = getTranslateY(s);

    const animate = () => {
      if (!panelRef.current) return;
      const current = parseFloat(panelRef.current.style.transform.replace('translateY(', '').replace('vh)', '') || '0');
      const diff = target - current;
      if (Math.abs(diff) < 0.5) return updatePosition(target, true);
      updatePosition(current + diff * 0.2);
      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    updatePosition(getTranslateY(stepRef.current), true);
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