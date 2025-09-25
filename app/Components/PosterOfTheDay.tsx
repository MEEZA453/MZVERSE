'use client'
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
  const pid = searchParams.get("pid");

  const { highlight, loading } = useSelector((state: any) => state.highlight);

  const [post, setPost] = useState<any>(null);
  const [votes, setVotes] = useState<any[]>([]);

  // ✅ Only fetch once if highlight is empty
  useEffect(() => {
    if (token && highlight.length === 0) {
      dispatch(getHighlight(token));
    }
  }, [dispatch, token, highlight.length]);

  const reoderedHighlight = [...highlight].reverse();
console.log(reoderedHighlight)
  // ✅ Open overlay and update URL
  const openPost = (post: any) => {
    setPost(post);
    setVotes(post.votes || []);
    router.push(`/?pid=${post._id}`);
  };

  // ✅ Handle URL change (back/forward)
  useEffect(() => {
    if (pid) {
      const found = highlight.find((p: any) => p._id === pid);
      if (found) {
        setPost(found);
        setVotes(found.votes || []);
      }
    } else {
      setPost(null);
      setVotes([]);
    }
  }, [pid, highlight]);

  return (
    <div className="flex py-2 hide-scrollbar w-screen overflow-y-scroll">
      {!loading ? (
        <div className="flex gap-2 lg:gap-4">
          {reoderedHighlight?.map((post: any, index: number) => (
            <div key={index} onClick={() => openPost(post)}>
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

      {/* Overlay */}
      {(post || pid) && (
        <div>
          <Post catchedPost={post} catchedVotes={votes} />
        </div>
      )}
    </div>
  );
}
