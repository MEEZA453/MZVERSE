'use client'
import Image from "next/image"
import { useRef, useState } from "react"

export default function ImageShower({ images = [] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPos(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollStart(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startPos) * 2
    carouselRef.current.scrollLeft = scrollStart - walk
  }

  return (
    <div className="relative mb-4">
      <div
        ref={carouselRef}
        className="
          flex hide-scrollbar snap-mandatory cursor-grab
          overflow-x-scroll snap-x
          lg:flex-col lg:pt-22 lg:h-screen border-r border-[#4d4d4d] lg:overflow-x-scroll lg:snap-y
        "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {images.map((img: string, i: number) => (
          <div
            key={i}
            className="
              flex-shrink-0 w-screen h-[50vh] snap-center flex items-center justify-center
              lg:w-[70vw] lg:h-fit
            "
          >
            <Image
              src={img}
              alt={`image-${i}`}
              width={1200}
              height={1200}
              className="w-full lg:w-[70%] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Top gradient overlay */}
      <div className="pointer-events-none fixed w-screen h-80 bg-gradient-to-b from-[#00000070] to-transparent top-0 z-30" />
    </div>
  )
}
