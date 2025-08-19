'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getPromotion } from "../store/actions/Promotion"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function PromotionOfTheDay() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useAuth()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    if (token) {
      dispatch(getPromotion(token))
    }
  }, [dispatch, token])

  const { promotion, loading } = useSelector((state: any) => state.promotion)
  const reoderedPromotion = useMemo(() => [...promotion].reverse(), [promotion])

  // Drag-to-scroll handlers
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
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  // Arrow navigation
  const scrollToPromotion = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const width = window.innerWidth * 0.8 // approximate card width
    const scrollAmount = direction === 'left' ? -width : width
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  if (!reoderedPromotion || reoderedPromotion.length === 0) return null

  return (
    <div className="relative my-2 py-2">
      
      <div
        ref={carouselRef}
        className="flex gap-3 overflow-x-scroll hide-scrollbar cursor-grab snap-x snap-mandatory px-4"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {!loading &&
          reoderedPromotion.map((promo: any, index: number) => (
            <div key={index} className="flex-shrink-0 w-[80vw] mb-4 snap-center relative">
              <Image
                src={promo.images[0]}
                height={300}
                width={300}
                alt="promo"
                className="w-full h-[22rem] object-cover rounded"
              />
        <div className="absolute pointer-events-none w-full h-80 bg-gradient-to-b from-[#00000080] to-[#00000000] z-[50] top-0"></div>

              <div className="flex justify-between items-center w-full z-[99] absolute top-2 left-2 pr-3">

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      router.push("/" + promo.createdBy?.handle)
                    }
                  >
                    <Image
                      src={promo.createdBy?.profile}
                      alt="profile"
                      width={100}
                      height={100}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </button>
                  <div>
                    <h3 className="">{promo?.name}</h3>
                    <p style={{fontSize : '12px'}} className="">@{promo.createdBy?.handle}</p>
                  </div>
                </div>
              
              </div>
            </div>
          ))}
      </div>

      {/* Left arrow */}
     
    </div>
  )
}
