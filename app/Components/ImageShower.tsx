'use client'
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

export default function ImageShower({ images = [], isMobile }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  // ---- Desktop Drag (Mouse only) ----
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

  // ---- Thumbnail Click ----
  const scrollToImage = (index: number) => {
    if (!carouselRef.current) return
    const child = carouselRef.current.children[index + (!isMobile ? 1 : 0)] as HTMLElement
    if (child) {
      carouselRef.current.scrollTo({
        left: child.offsetLeft,
        behavior: "smooth",
      })
    }
  }

  // ---- Track Active Image ----
  useEffect(() => {
    if (!carouselRef.current) return

    const options = {
      root: carouselRef.current,
      threshold: 0.6, // 60% in view
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"))
          setActiveIndex(index)
        }
      })
    }, options)

    const children = carouselRef.current.querySelectorAll("[data-index]")
    children.forEach((child) => observer.observe(child))

    return () => {
      children.forEach((child) => observer.unobserve(child))
    }
  }, [images])

  return (
    <div className="relative lg:w-[70vw] w-screen mb-4">
      <div
        ref={carouselRef}
        className="
          flex hide-scrollbar snap-mandatory cursor-grab
          overflow-x-scroll snap-x
          lg:w-[70vw] lg:pt-22 lg:h-screen border-r border-l border-[#4d4d4d] lg:overflow-x-scroll lg:snap-y
        "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* gradient only for desktop */}
        {!isMobile && (
          <div className="gradient absolute pointer-events-none w-120 h-screen bg-gradient-to-l from-[#000000] to-[#00000000] z-[900] right-[1px] top-0"></div>
        )}

        {images.map((img: string, i: number) => (
          <div
            key={i}
            data-index={i}
            className="
              flex-shrink-0 w-screen lg:translate-x-[25vw] mt-10 h-[50vh] snap-center flex items-center justify-center
              lg:w-[28vw] lg:h-fit
            "
          >
            <Image
              src={img}
              alt={`image-${i}`}
              width={1200}
              height={1200}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Top gradient overlay */}
      <div className="pointer-events-none fixed w-screen h-80 bg-gradient-to-b from-[#00000070] to-transparent top-0 z-30" />

      {/* Thumbnail Controller */}
      <div className="absolute image-controller flex lg:left-6 left-2 bottom-2 gap-1">
        {images.map((el, i) => (
          <Image
            key={i}
            src={el}
            alt={`preview-${i}`}
            width={300}
            height={300}
            onClick={() => scrollToImage(i)}
            className={`
  lg:h-16 w-12 lg:w-16 h-12 object-cover cursor-pointer duration-300
  border ${activeIndex === i ? "border-[#4d4d4d]" : "border-transparent hover:border-[#4d4d4d]"}
`}
          />
        ))}
      </div>
    </div>
  )
}
