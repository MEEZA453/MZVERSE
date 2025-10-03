import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getPostsByHandleAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
import Image from "next/image";
import DraggableCarousel from "./DraggableCarousel";
import Link from "next/link";
import SkeletonRelatedPosts from "./Skeleton/SkeletonReletedPosts";

export default function RelatedPosts({ handle, postId, token, setPost, setVotes, setIsNavigating}) {
  const router = useRouter();
  const searchParams = useSearchParams();
console.log(token)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token && handle) {
      dispatch(getPostsByHandleAction(handle));
    }
  }, [dispatch, handle, token]);

  const { postsOfUser, postsOfUserLoading } = useSelector((state: any) => state.posts);

  // filter out current post
  const filteredPosts = postsOfUser?.filter((post: any) => post._id !== postId) || [];
const handleNavigate = (id: string) => {
  console.log('clicked')
  setIsNavigating(true); 
  router.push(`/posts/${id}`);
};
  return (
    <div className="mb-4 mt-6">
      <h5 className="mx-2 my-3">More form {handle}</h5>
      <div className="flex w-full hide-scrollbar gap-2">
        {postsOfUserLoading ? (
          <SkeletonRelatedPosts />
        ) : filteredPosts.length === 0 ? (
          <p className="mx-2 text-sm opacity-70">No posts found</p>
        ) : (
          <DraggableCarousel className="px-4">
            {filteredPosts.map((post: any) => (
              <div  key={post._id} className="shrink-0 w-[80px] h-[80px]">
                
                  <Image
                    src={post?.images[0]}
                    onClick={()=>handleNavigate(post?._id)}
                    alt="related"
                    width={100}
                    height={100}
                    className="w-full h-full rounded-[2px] object-cover"
                  />
          
              </div>
            ))}
          </DraggableCarousel>
        )}
      </div>
    </div>
  );
}
