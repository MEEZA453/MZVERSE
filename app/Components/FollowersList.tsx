'use  client'
import User from "./User"
import { useRouter } from "next/navigation"
import {useDispatch , useSelector} from 'react-redux'
import { AppDispatch } from "../store/store"
import {useEffect} from  'react'
import { getFollowersByHandle, getFollowingByHandle } from "../store/actions/follow"
import SkeletonNotification from "./Skeleton/SkeletonNotification"
import { IoIosArrowBack } from "react-icons/io"
import {motion} from 'framer-motion'
export default function FollowersList ({handle , setFollowerWindow}){

    const {followers ,following , loading} = useSelector((state:any)=>state.follow)

const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getFollowersByHandle(handle))
            dispatch(getFollowingByHandle(handle))
},[dispatch ,  handle])
 
return <motion.div    className="w-screen fixed top-0 right-0 bg-black h-screen z-[999] lg:w-[23vw]">
 <div className='w-full flex justify-between lg:w-[23vw] items-center px-3 z-[100] my-4 '>
              <div className='flex gap-1 items-center justify-center'>
              <button onClick={()=> setFollowerWindow(false)}>
                <IoIosArrowBack size={20} />
                
                </button>
              <h4 >Followers</h4></div>
    
            </div>

             { loading ?  (
  Array.from({ length: 4 }).map((_, i) => <SkeletonNotification key={i} />)
): <div className=" bg-black  z-[999]">
        
      {followers?.map((follower: any, index: number) => {
            const isFollowing = following.some((f: any) => f._id === follower._id);
       return <div key={index} className="w-full">
          <User isFollowing = {isFollowing} user={follower}/>
        </div>
      })}
    </div>}
           
    </motion.div> 
}