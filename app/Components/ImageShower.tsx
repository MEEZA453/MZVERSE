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
    const isLarge = window.innerWidth >= 1024
    setStartPos(isLarge ? e.pageY - (carouselRef.current?.offsetTop || 0) : e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollStart(isLarge ? (carouselRef.current?.scrollTop || 0) : (carouselRef.current?.scrollLeft || 0))
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const isLarge = window.innerWidth >= 1024

    if (isLarge) {
      const y = e.pageY - carouselRef.current.offsetTop
      const walk = (y - startPos) * 2
      carouselRef.current.scrollTop = scrollStart - walk
    } else {
      const x = e.pageX - carouselRef.current.offsetLeft
      const walk = (x - startPos) * 2
      carouselRef.current.scrollLeft = scrollStart - walk
    }
  }

  return (
    <div className="relative mb-4">
      <div
        ref={carouselRef}
        className="
          flex hide-scrollbar snap-mandatory cursor-grab
          overflow-x-scroll snap-x
          lg:flex-col  lg:pt-22  lg:overflow-y-scroll  lg:h-screen border-r border-[#4d4d4d] lg:overflow-x-hidden lg:snap-y
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
              flex-shrink-0 w-screen  h-[50vh] snap-center flex items-center justify-center
              lg:w-[70vw] lg:h-fit
            "
          >
            <Image
              src={img}
              alt={`image-${i}`}
              width={1200}
              height={1200}
              className="w-full lg:w-[40%] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Top gradient overlay */}
      <div className="pointer-events-none fixed w-screen h-80 bg-gradient-to-b from-[#00000070] to-transparent top-0 z-30" />
    </div>
  )
}
