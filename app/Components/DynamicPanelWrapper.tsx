'use client'
import React, { useRef, useLayoutEffect } from 'react';

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
  const startX = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const isHorizontalDrag = useRef(false);
  const stepRef = useRef<1 | 2 | 3>(initialStep);
  const frameRef = useRef<number | null>(null);
  const pendingY = useRef<number | null>(null);

  const positions = [102, 40, -25]; // step1, step2, step3
  const DRAG_THRESHOLD = 15; // drag threshold in vh

  const getTranslateY = (s: number) => positions[s - 1];

  const getPageY = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!e) return startY.current;
    if ('touches' in e && e.touches.length) return e.touches[0].clientY;
    if ('clientY' in e) return e.clientY;
    return startY.current;
  };

  const getPageX = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!e) return startX.current;
    if ('touches' in e && e.touches.length) return e.touches[0].clientX;
    if ('clientX' in e) return e.clientX;
    return startX.current;
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

  // 🚫 If user is inside X-drag (carousel), don't start Y-dragging
  if (target.closest(".x-drag")) return;

  const scrollable = target.closest('.scrollable') as HTMLElement | null;
  if (scrollable && scrollable.scrollTop > 0) return;

  isDragging.current = true;
  isHorizontalDrag.current = false;
  startY.current = getPageY(e);
  startX.current = getPageX(e);
  currentY.current =
    parseFloat(
      panelRef.current?.style.transform.replace("translateY(", "").replace("vh)", "") ||
        `${getTranslateY(stepRef.current)}`
    );
  if (frameRef.current) cancelAnimationFrame(frameRef.current);
};
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    if ('touches' in e) e.preventDefault();

    const dy = getPageY(e) - startY.current;
    const dx = getPageX(e) - startX.current;

    // detect horizontal drag to prevent vertical panel drag
    if (!isHorizontalDrag.current && Math.abs(dx) > Math.abs(dy)) {
      isHorizontalDrag.current = true;
      return; // skip vertical drag while horizontal
    }

    if (isHorizontalDrag.current) return;

    let newY = currentY.current + (dy / window.innerHeight) * 100;
    newY = Math.min(positions[0], Math.max(positions[2], newY));
    scheduleUpdate(newY);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (isHorizontalDrag.current) return; // do nothing if horizontal drag

    const current = parseFloat(panelRef.current?.style.transform.replace('translateY(', '').replace('vh)', '') || '0');
    const stepIndex = stepRef.current - 1;
    const distanceMoved = current - positions[stepIndex];

    if (distanceMoved > DRAG_THRESHOLD && stepRef.current > 1) {
      stepRef.current = (stepRef.current - 1) as 1 | 2 | 3;
    } else if (distanceMoved < -DRAG_THRESHOLD && stepRef.current < 3) {
      stepRef.current = (stepRef.current + 1) as 1 | 2 | 3;
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

  useLayoutEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${getTranslateY(stepRef.current)}vh)`;
      if (onTranslateYChange) onTranslateYChange(getTranslateY(stepRef.current));
    }
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed top-0 left-0 w-full h-screen z-[100] touch-pan-y"
      style={{
        touchAction: 'none',
        willChange: 'transform',
        transform: `translateY(${getTranslateY(stepRef.current)}vh)`,
      }}
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
