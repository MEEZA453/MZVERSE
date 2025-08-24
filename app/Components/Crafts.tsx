import {useEffect , useState} from 'react'
import { usePathname } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import { getPostsByHandleAction } from '../store/actions/post';
import PostCard from './PostCard';
import { SkeletonCard } from './Skeleton/SkeletonCard';
export default function Crafts(){
    const [token , setToken] = useState('')
    const dispatch = useDispatch<AppDispatch>();
const  handle = usePathname().split('/')[1]
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('profile')
      if (profile) {
        const parsedUser = JSON.parse(profile)
        setToken(parsedUser.token)
      }
    }
  }, [])
  

   useEffect(() => {

    if (token) {
      dispatch(getPostsByHandleAction( handle));
    }
  }, [dispatch, handle , token]);

  const { postsOfUser , loading} = useSelector((state: any) => state.posts)
console.log(postsOfUser)
const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div>{loading ?< div className="lg:grid-cols-5 grid-cols-2 lg:px-10  px-3 w-screen  lg:gap-5 mb-10 grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className='flex items-center justify-center'  key={i}>
              <SkeletonCard/>
             </div>
            ))}
          </div>: <div className='  w-[100vw] h-full'>{postsOfUser?.length > 0 ?<div>

    <div className='lg:grid-cols-5 grid-cols-2 lg:px-10  px-3  lg:gap-5 mb-10 grid'>
    {postsOfUser?.map((post:any, index : number) => (
      <div className='flex items-center justify-center'  key={index}>
              <PostCard post={post}/>
             </div>

))}
      </div> 
</div>:<p className='w-screen mt-10 text-center'>{` You have'nt craft anything yet.`}</p>}
  </div>}</div>
}