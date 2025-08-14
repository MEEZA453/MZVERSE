'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext';
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
export default function AllPosts() {


const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [red , setRed ] = useState(false)
    const [data , setData] = useState([])
  const { posts , loading} = useSelector((state: any) => state.posts);

  useEffect(()=>{
   dispatch(getPostsAction())
  },[dispatch])
  
  const {token } = useAuth()

  return (
    <div className='w-screen px-4 '>
      {/* <Notification/> */}
      {/* <MasterNavber /> */}
     

   {   !loading ? <div className='lg:grid-cols-5 gap-2  grid-cols-2 grid'>
        {posts?.map((post:any, index:number) => (
          <div key={index}>
  <PostCard post = {post}/>
  </div>
        ))}
      </div> : <Loading/>}
<div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[900] top-0">  </div>
 
    </div>
  );
}
