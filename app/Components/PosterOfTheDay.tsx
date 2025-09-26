'use client'
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { AppDispatch } from "../store/store";
import { getHighlight } from "../store/actions/Highlight";
import { SkeletonCard } from "./Skeleton/SkeletonCard";
import { useRouter, useSearchParams } from "next/navigation";
import Post from "./Post";

export default function PosterOfTheDay() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hid = searchParams.get("hid");

  const { highlight, loading } = useSelector((state: any) => state.highlight);

  const [post, setPost] = useState<any>(null);
  const [votes, setVotes] = useState<any[]>([]);

 useEffect(() => {
    if (token && highlight.length === 0) {
      dispatch(getHighlight(token)); // Fetch once when feed mounts
    }
  }, [token, dispatch, highlight.length]);
  const reoderedHighlight = [...highlight].reverse();
    const openPost = (post: any) => {
      console.log('openPot data is:', post)
       setPost(post)            // ✅ immediate state update
  setVotes(post.votes || [])
      router.push(`/?hid=${post._id}`)
    }

    // Handle URL pid change (e.g., back button)
    useEffect(() => {
      if (hid) {
        
        const found = highlight.find((p: any) => p._id === hid)
console.log('called data is ' , found)
        if (found) {
          setPost(found)
          setVotes(found.votes || [])
        }
      } else {
        setPost(null)
        setVotes([])
      }
    }, [hid , highlight])


  return (
    <div className="flex py-2 hide-scrollbar w-screen overflow-y-scroll">
      {!loading ? (
        <div className="flex gap-2 lg:gap-4">
          {reoderedHighlight?.map((item: any, index: number) => (
            <div key={index} onClick={() => openPost(item)}>
              <PostCard openPost={openPost} post={item} />
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

      {/* Overlay */}
        {/* Overlay component */}
            {(post || hid) && (
              <div>
      
               <Post catchedPost={post} catchedVotes={votes}/>
              </div>
            )}
    </div>
  );
}
