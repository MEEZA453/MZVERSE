"use client"
import { useState, useRef, useEffect, ReactNode } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

type SwipeToDeleteProps = {
  onDelete: () => void
  children: ReactNode
  isOpen: boolean
  onOpen: () => void
  onClose: () => void   // 👈 new prop to close from parent
}

export default function SwipeToDelete({ onDelete, children, isOpen, onOpen, onClose }: SwipeToDeleteProps) {
  const [offsetX, setOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // --- DRAG START ---
  const startDrag = (clientX: number) => {
    setIsDragging(true)
    startX.current = clientX
  }

  // --- DRAG MOVE ---
  const moveDrag = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX.current
    if (diff < 0) {
      setOffsetX(Math.max(diff, -50)) // drag left
    } else if (offsetX < 0) {
      setOffsetX(Math.min(diff - 50, 0)) // drag right to reset
    }
  }

  // --- DRAG END ---
  const endDrag = () => {
    setIsDragging(false)
    if (offsetX < -20) {
      setOffsetX(-50)
      onOpen() // tell parent this is the open one
    } else {
      setOffsetX(0)
    }
  }

  // --- CLOSE IF NOT ACTIVE ---
  useEffect(() => {
    if (!isOpen) {
      // smooth close after 0.3s
      const timeout = setTimeout(() => setOffsetX(0), 100)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  // --- CLICK OUTSIDE CLOSE ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose() // notify parent to close
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div className="relative w-full" ref={cardRef}>
      {/* Delete button */}
      <div
        className="absolute right-0 top-[1px] h-9 mt-1.5 flex items-center justify-center bg-white w-9 rounded-full transition-opacity duration-200"
        style={{ opacity: Math.min(Math.abs(offsetX) / 40, 1) }}
      >
        <button onClick={onDelete} className="text-black">
          <RiDeleteBin6Line size={15} />
        </button>
      </div>

      {/* Content (draggable) */}
      <div
        className="h-12 w-full mb-0.5 transition-transform duration-200 active:duration-0"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => isDragging && moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={() => isDragging && endDrag()}
      >
        {children}
      </div>
    </div>
  )
}
