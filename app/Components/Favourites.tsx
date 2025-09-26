import {useEffect , useState} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {useDispatch , useSelector } from 'react-redux'
import { getFavoritesByHandle } from '../store/actions/fav';
import Image from 'next/image';
import Loading from '../Components/loading'
import { AppDispatch } from '../store/store';
import PostCard from './PostCard';
import { useAuth } from '../Context/AuthContext';
export default function Favourites({setPost, setVotes}){
  const {token}  = useAuth()
  const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams()
    const fid = searchParams.get('fid')
  const { favourites , loading} = useSelector((state: any) => state.favourites)
const  handle = usePathname().split('/')[1]
const router = useRouter()


  const openPost = (post: any) => {
    setPost(post)
    setVotes(post.votes || [])
    router.push(`?fid=${post._id}`, { scroll: false })

  }



    // Handle URL pid change (e.g., back button)
    useEffect(() => {
      if (fid) {
        
        const found = favourites.find((p: any) => p._id === fid)
console.log('called data is ' , found)
        if (found) {
          setPost(found)
          setVotes(found.votes || [])
        }
      } else {
        setPost(null)
        setVotes([])
      }
    }, [fid , favourites])






   useEffect(() => {
  
    if (token) {
      dispatch(getFavoritesByHandle(token , handle));
    }
  }, [dispatch, handle , token]);

  
const reoderedFav = [...favourites].reverse()

const handleClick = (path: string): void => {
  window.location.href = window.location.origin +'/AllAssets/' + path;
};
    return <div className='fav   w-screen  h-full'>
    { !loading?<div className='lg:grid-cols-5 grid-cols-2 px-3 lg:gap-5 lg:px-10  mb-10 grid'>
    {reoderedFav?.map((post:any, index : number) => (
      <div  className='flex items-center justify-center'  key={index}>
        <PostCard openPost={openPost} post={post}/>
      </div>
            
           ))}
      </div> :<div className='w-screen'> <Loading/></div> }
  </div>
}