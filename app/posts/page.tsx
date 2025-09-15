'use client'
import MasterNavber from '../Components/MasterNavber';
import {useRouter , usePathname} from 'next/navigation';
import Image from 'next/image';
import {Product} from '../types/Product';
import {useState , useEffect} from 'react'
import Notification from '../Components/Notification';
import Loading from '../Components/loading'
import { useDispatch  ,useSelector } from 'react-redux'
import { MdOutlineAttachFile } from "react-icons/md";
import { AppDispatch } from '../store/store'
import { useAuth } from '../Context/AuthContext';
import { getPostsAction } from '../store/actions/post';
import BlurEffect from 'react-progressive-blur';
import PostCard from '../Components/PostCard';
import { SkeletonCard } from '../Components/Skeleton/SkeletonCard';
export default function AllPosts() {


const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [red , setRed ] = useState(false)
    const [data , setData] = useState([])
  const { posts , loading} = useSelector((state: any) => state.posts);

  useEffect(()=>{
   dispatch(getPostsAction())
  },[dispatch ])
  
  const {token } = useAuth()

  return (
    <div className='w-screen px-4 lg:px-22 '>
      {/* <Notification/> */}
      {/* <MasterNavber /> */}
     

   {   !loading ? <div className='lg:grid-cols-5 lg:gap-5 gap-2   grid-cols-2 grid'>
        {posts?.map((post:any, index:number) => (
          <div key={index}>
  <PostCard   post = {post}/>
  </div>
        ))}
      </div> : <div className="lg:grid-cols-5 lg:gap-5 gap-1   grid-cols-2 grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>}

    </div>
  );
}
