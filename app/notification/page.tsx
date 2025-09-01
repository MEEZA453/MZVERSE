'use client'
import { UseDispatch , useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getNotifications, markAllNotificationsRead } from "../store/actions/notification"
import { useAuth } from "../Context/AuthContext"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { HiOutlineDotsVertical } from "react-icons/hi"
import FollowNotification from "../Components/FollowNotification"
import VoteNotification from "../Components/VoteNotification"
import SkeletonNotification from "../Components/Skeleton/SkeletonNotification"
export default function Notification () {
    const {token} = useAuth()
    console.log(token)
    const router  = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const {items , loading} = useSelector((state: any)=>state.notification)

useEffect(() => {
  if (!token) return; 
    dispatch(getNotifications(token));
    dispatch(markAllNotificationsRead(token))
  
}, [dispatch, token]);

    return <div className="w-screen">
 <div className='w-full flex justify-between lg:w-[70vw] items-center px-3 z-[100] my-4 '>
              <div className='flex gap-1 items-center justify-center'>
              <button onClick={()=> router.back()}>
                <IoIosArrowBack size={20} />
                
                </button>
              <h4 >Notifications</h4></div>
    
              <button className=' text-white' ><HiOutlineDotsVertical/></button></div>

             { loading ?  (
  Array.from({ length: 4 }).map((_, i) => <SkeletonNotification key={i} />)
): <div className=" w-screen ">{
             items?.map((noti:any  , index:number)=>{
                    return <div key={index}>
                        <div>{
                        noti?.type === 'follow' && <FollowNotification noti={noti}/>
                    }</div>

                     <div>{
                        noti?.type === 'vote' && <VoteNotification noti={noti}/>
                    }</div>
                       </div>
                })
                }</div>}
    </div>
}