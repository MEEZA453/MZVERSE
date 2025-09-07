"use client"
import { useState, useRef, useEffect, ReactNode } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

type SwipeToDeleteProps = {
  onDelete: () => void
  children: ReactNode
}

export default function SwipeToDelete({ onDelete, children }: SwipeToDeleteProps) {
  const [offsetX, setOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    startX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const diff = currentX - startX.current
    if (diff < 0) {
      setOffsetX(Math.max(diff, -50)) // limit left swipe
    } else if (offsetX < 0) {
      setOffsetX(Math.min(diff - 50, 0)) // drag right to reset
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (offsetX < -20) {
      setOffsetX(-40) // keep delete visible
    } else {
      setOffsetX(0) // snap back
    }
  }

  // Reset if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOffsetX(0)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={cardRef}>
      {/* Delete Button */}
      <div className="absolute right-0 top-[1px] h-[46px] flex items-center justify-center bg-red-600 w-14 rounded-r">
        <button onClick={onDelete} className="text-white">
          <RiDeleteBin6Line className="ml-2" size={16} />
        </button>
      </div>

      {/* Content (draggable) */}
      <div
        className="h-12 w-full mb-0.5 transition-transform duration-200"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}
