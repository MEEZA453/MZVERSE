import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsOfAsset } from "../store/actions/attach";
import PostCard from "./PostCard";
import Loading from "./loading";
import { SkeletonMyPostCard } from "./Skeleton/SkeletomMyPostCard";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonRelatedPosts from "./Skeleton/SkeletonReletedPosts";
import DraggableCarousel from "./DraggableCarousel";
import Link from "next/link";
import Image from "next/image";

export default function Useages({assetId , token, setPost, setVotes}){
    const dispatch  = useDispatch<AppDispatch>();
      const searchParams = useSearchParams()
      const uid = searchParams.get('uid')
      const router = useRouter()
    const {postsOfAsset , loading} = useSelector((state:any)=>state.attach)
 
    useEffect(()=>{
        dispatch(getPostsOfAsset(assetId , token))
    } , [dispatch , token , assetId])
      const openPost = (post: any) => {
    setPost(post)
    setVotes(post.votes || [])
router.push(`/supply?pid=${assetId}&uid=${post?._id}`, { scroll: false });


  }



    // Handle URL pid change (e.g., back button)
    useEffect(() => {
      if (uid) {
        const found = postsOfAsset.find((p: any) => p._id === uid)
        console.log(found)

        if (found) {
          setPost(found)
          setVotes(found.votes || [])
        }
      } else {
        setPost(null)
        setVotes([])
      }
    }, [uid , postsOfAsset])


    return <div className="mb-4 mt-6">
      <h5 className="mx-2 my-3">Usages</h5>
      <div className="flex w-screen overflow-hidden hide-scrollbar gap-2">
        {loading ? (
          <SkeletonRelatedPosts />
        ) : postsOfAsset.length === 0 ? (
          <p className="mx-2 text-sm opacity-70">No posts found</p>
        ) : (
          <DraggableCarousel className="px-4">
            {postsOfAsset.map((post: any) => (
              <div key={post._id} className="shrink-0 w-[80px] h-[80px]">
              
                  <Image
                  onClick={()=>openPost(post)}
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
}