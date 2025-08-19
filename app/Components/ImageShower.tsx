'use client'
import Image from "next/image"
import { useRef, useState } from "react"

export default function ImageShower({ images = [] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2 // scroll-fast
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="relative mb-4">
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll hide-scrollbar snap-x snap-mandatory cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {images.map((img: string, i: number) => (
          <div
            key={i}
            className="flex-shrink-0 w-screen h-[50vh] snap-center flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`image-${i}`}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Top gradient overlay */}
      <div className="pointer-events-none fixed w-screen h-80 bg-gradient-to-b from-[#00000070] to-transparent top-0 z-30" />
    </div>
  )
}
