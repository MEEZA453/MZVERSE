'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { useAuth } from "../Context/AuthContext"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getPromotion } from "../store/actions/Promotion"

export default function PromotionOfTheDay() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      dispatch(getPromotion(token))
    }
  }, [dispatch, token])

  const [inViewIndex, setInViewIndex] = useState(0)
  const [progress, setProgress] = useState(0) // progress for bar

  const { promotion, loading } = useSelector((state: any) => state.promotion)

  // Memoize reversed array so useEffect doesn't reset unnecessarily
  const reoderedPromotion = useMemo(() => [...promotion].reverse(), [promotion])

  // Story cycle (2s each)
  useEffect(() => {
    if (!reoderedPromotion || reoderedPromotion.length === 0) return

    setProgress(0) // reset progress bar

    const duration = 2000 // 2s per story
    const step = 20 // update every 20ms
    const increment = (step / duration) * 100

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + increment, 100))
    }, step)

    const storyInterval = setInterval(() => {
      setInViewIndex(prevIndex =>
        prevIndex === reoderedPromotion.length - 1 ? 0 : prevIndex + 1
      )
      setProgress(0)
    }, duration)

    return () => {
      clearInterval(storyInterval)
      clearInterval(progressInterval)
    }
  }, [reoderedPromotion])

  if (!reoderedPromotion || reoderedPromotion.length === 0) return null

  return (
    <div className="px-4 mt-2 relative">
      {/* Progress bar */}
<div className="absolute top-0 left-0 w-full flex gap-1 px-4">
  {reoderedPromotion.map((_, i) => (
    <div
      key={i}
      className="h-[2px] bg-gray-500/40 flex-1 rounded overflow-hidden"
    >
      {i === inViewIndex ? (
        <div
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      ) : i < inViewIndex ? (
        <div className="h-full bg-white w-full" />
      ) : null}
    </div>
  ))}
</div>

      <div>
        <Image
          src={reoderedPromotion[inViewIndex]?.images[0]}
          height={300}
          width={300}
          alt="photo"
          className="w-full mb-2 h-90 rounded object-cover"
        />

        <div className="flex justify-between items-center w-full pr-3 z-100 duration-200">
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                router.push("/" + reoderedPromotion[inViewIndex]?.createdBy?.handle)
              }
            >
              <Image
                height={300}
                width={300}
                alt="profile"
                className="h-6 lg:h-6 w-6 lg:w-6 rounded-full items-center object-cover"
                src={reoderedPromotion[inViewIndex]?.createdBy?.profile}
              />
            </button>
            <div>
              <h3 className="mt-2">{reoderedPromotion[inViewIndex]?.createdBy?.name}</h3>
              <p style={{ fontSize: "12px" }}>
                @{reoderedPromotion[inViewIndex]?.createdBy?.handle}
              </p>
            </div>
          </div>
          <label className="text-[11px] absolute bottom-7 right-4 bg-white/50 px-1.5  text-black backdrop-blur-xl rounded-[4px]">
            Promoted
          </label>
        </div>
      </div>
    </div>
  )
}
