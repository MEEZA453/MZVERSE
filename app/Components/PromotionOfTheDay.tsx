'use client'
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getPromotion } from "../store/actions/Promotion"
import { SkeletonPromoCard } from "./Skeleton/SkeletonPromo"
import Post from "./Post"

export default function PromotionOfTheDay() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useAuth()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const { promotion, loading } = useSelector((state: any) => state.promotion)

  const searchParams = useSearchParams()
  const promo = searchParams.get('promo')

  // Overlay state
  const [post, setPost] = useState<any>(null)
  const [votes, setVotes] = useState<any[]>([])

  // Fetch promotions if empty
  useEffect(() => {
    if (token && promotion.length === 0) {
      dispatch(getPromotion(token))
    }
  }, [dispatch, token, promotion.length])

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

  const scrollToPromotion = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const width = window.innerWidth * 0.8
    const scrollAmount = direction === 'left' ? -width : width
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Open post instantly and update URL
  const openPost = (promo: any) => {
    setPost(promo)
    console.log('calleddata' , post)
    setVotes(promo.votes || [])
    router.push(`/?promo=${promo._id}`)
  }

  // Handle URL pid change (e.g., back button)
  useEffect(() => {
    if (promo) {
      const found = promotion.find((p: any) => p._id === promo)
      console.log('render data : ', found)
      if (found) {
        setPost(found)
        setVotes(found.votes || [])
      }
    } else {
      setPost(null)
      setVotes([])
    }
  }, [promo, promotion])

  return (
    <div className="relative lg:m-6 my-4">
      <div
        ref={carouselRef}
        className="flex gap-3 overflow-x-scroll hide-scrollbar cursor-grab snap-x snap-mandatory px-4"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {!loading ? (
          reoderedPromotion.map((promo: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] lg:w-[33.33vw] h-[85vw] lg:h-[37vw] snap-center relative"
            >
              <div
                onClick={() => openPost(promo)}
                className="cursor-pointer w-full h-full"
              >
                <Image
                  src={promo.images[0]}
                  width={300}
                  height={300}
                  alt="promo"
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="absolute pointer-events-none w-full h-80 bg-gradient-to-b from-[#00000080] to-[#00000000] z-[50] top-0"></div>

              <div className="flex justify-between items-center w-full z-[99] absolute top-2 left-2 pr-3">
                <div className="flex items-center gap-1">
                  <button onClick={() => router.push("/" + promo?.createdBy?.handle)}>
                    <Image
                      src={promo?.createdBy?.profile}
                      alt="profile"
                      width={100}
                      height={100}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </button>
                  <div>
                    <h3 style={{ color: 'white' }}>{promo?.name}</h3>
                    <p style={{ fontSize: '12px' }}>@{promo?.createdBy?.handle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          Array.from({ length: 3 }).map((_, i) => <SkeletonPromoCard key={i} />)
        )}
      </div>

      {/* Overlay component */}
      {(post || promo) && (
        <div>

         <Post catchedPost={post} catchedVotes={votes}/>
        </div>
      )}
    </div>
  )
}
