'use client'
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState, Suspense } from "react"
import { useAuth } from "../Context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getPromotion } from "../store/actions/Promotion"
import { SkeletonPromoCard } from "./Skeleton/SkeletonPromo"
import Post from "./Post"
import DraggableCarousel from "./DraggableCarousel"

export default function PromotionOfTheDay() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useAuth()
  const { promotion, loading } = useSelector((state: any) => state.promotion)
  const searchParams = useSearchParams()
  const promoId = searchParams.get('promo')

  const [selectedPost, setSelectedPost] = useState<any>(null)

  // Fetch promotions if empty
  useEffect(() => {
    if (token && promotion.length === 0) {
      dispatch(getPromotion(token))
    }
  }, [dispatch, token, promotion.length])

  const reorderedPromotion = useMemo(() => [...promotion].reverse(), [promotion])

  // Handle URL changes (back/forward)
  useEffect(() => {
    if (promoId && promotion.length > 0) {
      const found = promotion.find((p: any) => p._id === promoId)
      if (found) setSelectedPost(found)
    } else {
      setSelectedPost(null)
    }
  }, [promoId, promotion])

  const openPost = (promo: any) => {
    setSelectedPost(promo)
    router.push(`/?promo=${promo._id}`)
  }

  return (
    <div className="relative lg:m-6 my-4">
      <DraggableCarousel
        className="px-4"
        onClickItem={(index) => openPost(reorderedPromotion[index])}
      >
        {!loading ? (
          reorderedPromotion.map((promo: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] user-select-none lg:w-[33.33vw] h-[85vw] lg:h-[37vw] relative"
            >
              <div className="cursor-pointer w-full h-full">
                <Image
                  src={promo.images[0]}
                  width={300}
                  height={300}
                  alt="promo"
                  className="w-full h-full pointer-events-none object-cover rounded"
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
                    <p style={{ fontSize: '12px', color: 'white' }}>@{promo?.createdBy?.handle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          Array.from({ length: 3 }).map((_, i) => <SkeletonPromoCard key={i} />)
        )}
      </DraggableCarousel>

      {/* Overlay Post */}
      {selectedPost && (
        <Suspense>
          <Post catchedPost={selectedPost} catchedVotes={selectedPost.votes || []} />
        </Suspense>
      )}
    </div>
  )
}
