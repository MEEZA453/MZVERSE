'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { AppDispatch } from '../store/store';
import { useAuth } from '../Context/AuthContext';
import { getPostsAction } from '../store/actions/post';
import PostCard from '../Components/PostCard';
import { SkeletonCard } from '../Components/Skeleton/SkeletonCard';
import Post from '../Components/Post';

export default function AllPosts() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid'); // Check if URL has post id

  const { posts, loading } = useSelector((state: any) => state.posts);
  const { token } = useAuth();

  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  // Handle URL changes (back/forward navigation)
  useEffect(() => {
    if (pid && posts.length > 0) {
      const found = posts.find((p: any) => p._id === pid);
      if (found) setSelectedPost(found);
    } else {
      setSelectedPost(null);
    }
  }, [pid, posts]);

  const openPost = (post: any) => {
    setSelectedPost(post);
    router.push(`/posts?pid=${post._id}`);
  };

  return (
    <div className='w-screen px-4 lg:px-22'>
      <div className={`grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5`}>
        {!loading ? posts.map((post: any, index: number) => (
          <PostCard key={index} post={post} onOpenPost={openPost} />
        )) : Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {/* Overlay Post */}
      {selectedPost && <Post catchedPost={selectedPost} catchedVotes={selectedPost.votes || []} />}
    </div>
  );
}
