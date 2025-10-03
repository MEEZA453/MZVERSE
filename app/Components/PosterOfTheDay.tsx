'use client'
import PostCard from "./PostCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState, Suspense } from "react";
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

  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Fetch highlight posts if empty
  useEffect(() => {
    if (token && highlight.length === 0) {
      dispatch(getHighlight(token));
    }
  }, [token, dispatch, highlight.length]);

  const reorderedHighlight = useMemo(() => [...highlight].reverse(), [highlight]);

  // Handle URL changes (back/forward)
  useEffect(() => {
    if (hid && highlight.length > 0) {
      const found = highlight.find((p: any) => p._id === hid);
      if (found) setSelectedPost(found);
    } else {
      setSelectedPost(null);
    }
  }, [hid, highlight]);

  const openPost = (post: any) => {
    setSelectedPost(post);
    router.push(`/?hid=${post._id}`);
  };

  return (
    <div className="flex py-2 hide-scrollbar w-screen overflow-y-scroll">
      {!loading ? (
        <div className="flex gap-2 lg:gap-4">
          {reorderedHighlight?.map((item: any, index: number) => (
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

      {/* Overlay Post */}
      {selectedPost && (
        <Suspense>
          <Post catchedPost={selectedPost} catchedVotes={selectedPost.votes || []} />
        </Suspense>
      )}
    </div>
  );
}
