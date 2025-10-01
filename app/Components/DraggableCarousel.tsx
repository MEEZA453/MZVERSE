'use client'
import React, { useRef, useEffect } from "react";

interface DraggableCarouselProps {
  children: React.ReactNode;
  onClickItem?: (index: number) => void;
  className?: string;
}

export default function DraggableCarousel({ children, onClickItem, className }: DraggableCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollStart = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const targetScroll = useRef(0);
  const dragDetected = useRef(false);
  const dragThreshold = 10;

  // Detect if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // ---- Drag handlers ----
const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
  const target = e.target as HTMLElement;
  const scrollable = target.closest('.scrollable') as HTMLElement | null;

  // ✅ If inside a scrollable area
  if (scrollable) {
    // If not at top → let scroll handle, disable drag
    if (scrollable.scrollTop > 0) return;
  }

  // ✅ Otherwise → enable drag
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
  if (!isDragging.current || !carouselRef.current) return;
  const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
  const dx = pageX - startPos.current;
  if (Math.abs(dx) > dragThreshold) dragDetected.current = true;

  // Free drag during movement
  targetScroll.current = scrollStart.current - dx;
  if (!animationFrame.current) animationFrame.current = requestAnimationFrame(animateScroll);
};

const handleMouseUp = () => {
  isDragging.current = false;

  if (!carouselRef.current) return;

  // Snap to nearest index only after drag ends
  const childrenArr = Array.from(carouselRef.current.children) as HTMLElement[];
  const scrollLeft = carouselRef.current.scrollLeft;

  let nearestIndex = 0;
  let minDiff = Math.abs(scrollLeft - childrenArr[0].offsetLeft);

  childrenArr.forEach((child, idx) => {
    const diff = Math.abs(scrollLeft - child.offsetLeft);
    if (diff < minDiff) {
      minDiff = diff;
      nearestIndex = idx;
    }
  });

  targetScroll.current = childrenArr[nearestIndex].offsetLeft;
  if (!animationFrame.current) animationFrame.current = requestAnimationFrame(animateScroll);
};

const animateScroll = () => {
  if (!carouselRef.current) return;
  const current = carouselRef.current.scrollLeft;
  const diff = targetScroll.current - current;

  if (Math.abs(diff) < 0.5) {
    carouselRef.current.scrollLeft = targetScroll.current;
    animationFrame.current = null;
    carouselRef.current.style.scrollSnapType = "x mandatory";
    return;
  }

  // smoother multiplier for mobile
  const speed = isMobile ? null : 0.2;
  carouselRef.current.scrollLeft += diff * speed;
  animationFrame.current = requestAnimationFrame(animateScroll);
};
    const handleMouseLeave = handleMouseUp;

  // ---- Helpers ----
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const childrenArr = Array.from(carouselRef.current.children) as HTMLElement[];
    const target = childrenArr[Math.max(0, Math.min(index, childrenArr.length - 1))];
    if (target) {
      targetScroll.current = target.offsetLeft;
      if (!animationFrame.current) animationFrame.current = requestAnimationFrame(animateScroll);
    }
  };

  const getActiveIndex = () => {
    if (!carouselRef.current) return 0;
    const childrenArr = Array.from(carouselRef.current.children) as HTMLElement[];
    const scrollLeft = carouselRef.current.scrollLeft;
    let nearestIndex = 0;
    let minDiff = Math.abs(scrollLeft - childrenArr[0].offsetLeft);

    childrenArr.forEach((child, idx) => {
      const diff = Math.abs(scrollLeft - child.offsetLeft);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = idx;
      }
    });

    return nearestIndex;
  };

  // ---- Render children with click ----
  return (
    <div
      ref={carouselRef}
      className={`flex gap-3 overflow-x-scroll hide-scrollbar cursor-grab snap-x snap-mandatory ${className}`}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => handleMouseDown(e)}
      onTouchMove={(e) => handleMouseMove(e)}
      onTouchEnd={handleMouseUp}
    >
{React.Children.map(children, (child, index) =>
  React.isValidElement(child)
    ? React.cloneElement(child as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          // Ignore clicks on buttons or other interactive elements
          if ((e.target as HTMLElement).closest("button, a, input, textarea, select")) return;

          if (dragDetected.current) return;

          if (onClickItem) onClickItem(index);
        },
        "data-index": index,
      })
    : child
)}
    </div>
  );
}
