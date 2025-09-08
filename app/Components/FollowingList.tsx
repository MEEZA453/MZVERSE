'use  client'
import User from "./User"
import { useRouter } from "next/navigation"
import {useDispatch , useSelector} from 'react-redux'
import { AppDispatch } from "../store/store"
import {useEffect, useState} from  'react'
import { getFollowersByHandle, getFollowingByHandle } from "../store/actions/follow"
import SkeletonNotification from "./Skeleton/SkeletonNotification"
import { IoIosArrowBack } from "react-icons/io"
import {motion} from 'framer-motion'
export default function FollowersList ({handle , setFollowingWindow}){
    console.log(handle)
    const {following , loading} = useSelector((state:any)=>state.follow)
    const [isDesktop, setIsDesktop] = useState(false)
    
const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getFollowingByHandle(handle))
        
},[dispatch ,  handle])

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

 
return <motion.div   {...(isDesktop
        ? { 
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 }
          }
        : {})}    className="w-screen fixed top-0 right-0 bg-black h-screen z-[9999] lg:w-[23vw]">
 <div className='w-full flex justify-between lg:w-[23vw] items-center px-3 z-[100] my-4 '>
              <div className='flex gap-1 items-center justify-center'>
              <button onClick={()=> setFollowingWindow(false)}>
                <IoIosArrowBack size={20} />
                
                </button>
              <h4 >Following</h4></div>
    
            </div>

             { loading ?  (
  Array.from({ length: 4 }).map((_, i) => <SkeletonNotification key={i} />)
): <div className=" bg-black  z-[999]">
        
      {following?.map((follower: any, index: number) => (
        <div key={index} className="w-full">
          <User  user={follower} isFollowingList ={true}/>
        </div>
      ))}
    </div>}
           
    </motion.div> 
}