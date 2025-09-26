import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsOfAsset } from "../store/actions/attach";
import PostCard from "./PostCard";
import Loading from "./loading";
import { SkeletonMyPostCard } from "./Skeleton/SkeletomMyPostCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function Useages({assetId , token, setPost, setVotes}){
    const dispatch  = useDispatch<AppDispatch>();
      const searchParams = useSearchParams()
      const uid = searchParams.get('uid')
      const router = useRouter()
    const {postsOfAsset , loading} = useSelector((state:any)=>state.attach)
    console.log(postsOfAsset)
    useEffect(()=>{
        dispatch(getPostsOfAsset(assetId , token))
    } , [dispatch , token , assetId])
      const openPost = (post: any) => {
    setPost(post)
    setVotes(post.votes || [])
router.push(`/?pid=${assetId}&uid=${post._id}`, { scroll: false });


  }



    // Handle URL pid change (e.g., back button)
    useEffect(() => {
      if (uid) {
        
        const found = postsOfAsset.find((p: any) => p._id === uid)
console.log('called data is ' , found)
        if (found) {
          setPost(found)
          setVotes(found.votes || [])
        }
      } else {
        setPost(null)
        setVotes([])
      }
    }, [uid , postsOfAsset])


    return <div>
         {   !loading ? <div>{postsOfAsset?.length > 0 ?<div className='lg:grid-cols-2 px-4 lg:gap-5 gap-2  mt-10 grid-cols-2 grid'>
        {postsOfAsset.map((post , index)=>{
            return <div key={index}>{<PostCard openPost={openPost} post={post}/>}</div>
        })}
        </div>:<p className="mt-10">No usages</p>}</div>: <div className="w-full h-[100vh]"> < div className=" grid-cols-2   px-3 w-screen  my-10 grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div className=''  key={i}>
                      <SkeletonMyPostCard/>
                     </div>
                    ))}
                  </div></div>}
    </div>
}