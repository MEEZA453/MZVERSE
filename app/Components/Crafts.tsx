import {useEffect , useState} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import { getPostsByHandleAction } from '../store/actions/post';
import PostCard from './PostCard';
import { SkeletonCard } from './Skeleton/SkeletonCard';
import MyPostCard from './MyPostCard';
import { SkeletonMyPostCard } from './Skeleton/SkeletomMyPostCard';
import Post from './Post';
export default function Crafts({handle , token, setPost, setVotes}){
  const router = useRouter()
  const searchParams = useSearchParams()
  const pid = searchParams.get('pid')


    const dispatch = useDispatch<AppDispatch>();



   useEffect(() => {

    if (token) {
      dispatch(getPostsByHandleAction( handle));
    }
  }, [dispatch, handle , token]);

  const { postsOfUser , postsOfUserLoading} = useSelector((state: any) => state.posts)

  const openPost = (post: any) => {
    setPost(post)
    setVotes(post.votes || [])
    router.push(`?pid=${post._id}`, { scroll: false })

  }



    // Handle URL pid change (e.g., back button)
    useEffect(() => {
      if (pid) {
        
        const found = postsOfUser.find((p: any) => p._id === pid)
console.log('called data is ' , found)
        if (found) {
          setPost(found)
          setVotes(found.votes || [])
        }
      } else {
        setPost(null)
        setVotes([])
      }
    }, [pid , postsOfUser])



    return <div>{(!handle || postsOfUserLoading) ?< div className="lg:grid-cols-5 grid-cols-2 lg:px-10  px-3 w-screen  lg:gap-5 mb-10 grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className=''  key={i}>
              <SkeletonMyPostCard/>
             </div>
            ))}
          </div>: <div className='  w-[100vw] h-full'>{postsOfUser?.length > 0 ?<div>

    <div className='lg:grid-cols-5 grid-cols-2 lg:px-10  px-3  lg:gap-5 mb-10 grid'>
    {postsOfUser?.map((post:any, index : number) => (
      <div className='flex items-center justify-center'  key={index}>
              <MyPostCard openPost={openPost} post={post}/>
             </div>

))}
      </div> 
</div>:<p className='w-screen mt-10 text-center'>{` You have'nt craft anything yet.`}</p>}
  </div>}

  </div>
}