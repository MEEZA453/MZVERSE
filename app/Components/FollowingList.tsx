'use client'
import User from "./User"
import { IoIosArrowBack } from "react-icons/io"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { useEffect, useState } from "react"
import { getFollowingByHandle, unfollowUser } from "../store/actions/follow"
import { useAuth } from "../Context/AuthContext"
import { useThemeContext } from "../Context/ThemeContext"

export default function FollowersList({ handle, setFollowingWindow }: { handle: string, setFollowingWindow: (val: boolean) => void }) {
  const { following, loading } = useSelector((state: any) => state.follow)
  const [localFollowing, setLocalFollowing] = useState<any[]>([])
  const [isDesktop, setIsDesktop] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useAuth()
const {isLightMode} = useThemeContext()
  // fetch following
  useEffect(() => {
    dispatch(getFollowingByHandle(handle))
  }, [dispatch, handle])

  // sync redux to local
  useEffect(() => {
    setLocalFollowing(following || [])
  }, [following])

  // screen size check
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  // handle instant unfollow
  const handleLocalUnfollow = (userId: string) => {
    setLocalFollowing(prev => prev.filter((u: any) => u._id !== userId)) // remove instantly
    dispatch(unfollowUser(userId, token)) // still call API
  }

  return (
    <motion.div
      {...(isDesktop
        ? {
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
          }
        : {})}
      className={`w-screen fixed top-0 right-0 ${isLightMode ? 'bg-white' :'bg-black'} h-screen z-[9999] lg:w-[23vw]`}
    >
      <div className="w-full flex justify-between lg:w-[23vw] items-center px-3 z-[100] my-4 ">
        <div className="flex gap-1 items-center justify-center">
          <button onClick={() => setFollowingWindow(false)}>
            <IoIosArrowBack size={20} />
          </button>
          <h4>Following</h4>
        </div>
      </div>

      <div className=" z-[999]">
        {localFollowing?.map((follower: any, index: number) => (
          <div key={index} className="w-full">
            <User
            isLightMode = {isLightMode}
              user={follower}
              isFollowingList={true}
              onUnfollow={handleLocalUnfollow} // pass handler
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
