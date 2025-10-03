import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getPostsByHandleAction, searchPostsAction } from "../store/actions/post";
import { useAuth } from "../Context/AuthContext";
import Image from "next/image";
import DraggableCarousel from "./DraggableCarousel";
import Link from "next/link";
import SkeletonRelatedPosts from "./Skeleton/SkeletonReletedPosts";

export default function RelatedToCatagoty({ catagory, postId, setIsNavigating }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (catagory) {
      dispatch(searchPostsAction(catagory));
    }
  }, [dispatch, catagory]);

  const { postResult, loading } = useSelector((state: any) => state.search);

  // filter out current post
  const filteredPosts = postResult?.filter((post: any) => post._id !== postId) || [];
const handleNavigate = (id: string) => {
  setIsNavigating(true); 
  router.push(`/posts/${id}`);
};
  return (
    <div className="mb-4 mt-6">
      <h5 className="mx-2 my-3">More {catagory}</h5>
      <div className="flex w-full hide-scrollbar gap-2">
        {loading ? (
          <SkeletonRelatedPosts />
        ) : filteredPosts.length === 0 ? (
          <p className="mx-2 text-sm opacity-70">No posts found</p>
        ) : (
          <DraggableCarousel className="px-4">
            {filteredPosts.map((post: any) => (
              <div key={post._id} className="shrink-0 w-[80px] h-[80px]">
            
                  <Image        onClick={()=>handleNavigate(post?._id)}
                                      src={post?.images[0]}
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
