'use client'
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getHighlight } from "../store/actions/Highlight";
import { SkeletonCard } from "./Skeleton/SkeletonCard";

export default function PosterOfTheDay() {
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useAuth()

  const { highlight, loading } = useSelector((state: any) => state.highlight)

  // ✅ Only fetch once if highlight is empty
  useEffect(() => {
    if (token && highlight.length === 0) {
      dispatch(getHighlight(token))
    }
  }, [dispatch, token, highlight.length])

  const reoderedHighlight = [...highlight].reverse()

  return (
    <div className="flex my-2 py-2 hide-scrollbar w-screen overflow-y-scroll">
      {!loading ? (
        <div className="flex gap-2 lg:gap-4">
          {reoderedHighlight?.map((post: any, index: number) => (
            <div key={index}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-2 lg:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
